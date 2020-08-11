/*** Documentation:

 * To make this token a one-time-use token, I encourage you to
 * use the patient’s current password hash in conjunction with
 * the patient’s created date (in ticks) as the secret key to
 * generate the JWT. This helps to ensure that if the patient’s
 * password was the target of a previous attack (on an unrelated website),
 * then the patient’s created date will make the secret key unique
 * from the potentially leaked password.

 * With the combination of the patient’s password hash and created date,
 * the JWT will become a one-time-use token, because once the patient
 * has changed their password, it will generate a new password hash
 * invalidating the secret key that references the old password
 * Reference: https://www.smashingmagazine.com/2017/11/safe-password-resets-with-json-web-tokens/
 **/

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { errorMessage, successMessage, status } = require("./../helpers/status");
const {
  transporter,
  getPasswordResetURL,
  getEmailVerificationURL,
  resetPasswordTemplate,
  signUpConfirmationTemplate,
} = require("./../helpers/email");

exports.validate = (method) => {
  switch (method) {
    case "sendConfirmationEmail": {
      return [
        body("email", "Email can not be empty").exists(),
        body("email", "Invalid email").exists().isEmail(),
      ];
    }
  }
};

// `secret` is passwordHash concatenated with patient's createdAt,
// so if someones gets a patient token they still need a timestamp to intercept.
const usePasswordHashToMakeToken = (patient) => {
  const passwordHash = patient.password;
  const patientId = patient._id;
  const secret = passwordHash + "-" + patient.createdAt;
  const token = jwt.sign({ patientId }, secret, {
    expiresIn: 3600, // 1 hour
  });
  return token;
};

/**
 * Check confirmation token and validate user
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signupConfirmation = async (req, res) => {};

/**
 * Send signup confirmation email
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.sendSignupConfirmationEmail = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.error = errors.array();
    return res.status(status.error).send(errorMessage);
  }
  const user = req.body;
  const accesstToken = usePasswordHashToMakeToken(user);
  const url = getEmailVerificationURL(user, accesstToken);
  const emailTemplate = signUpConfirmationTemplate(user, url);
  // send mail with defined transport object
  let info = await transporter.sendMail(emailTemplate);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  (successMessage.message = "Message sent: %s"), info.messageId;
  return res.status(status.success).send(successMessage);
};

exports.resendSignupConfirmationEmail = async (req, res) => {
  const accesstToken = usePasswordHashToMakeToken(user);
  const url = getPasswordResetURL(user, accesstToken);
  const emailTemplate = signUpConfirmationTemplate(user, url);
  // send mail with defined transport object
  let info = await transporter.sendMail(emailTemplate);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

/*** Calling this function with a registered patient's email sends an email IRL ***/
/*** I think Nodemail has a free service specifically designed for mocking   ***/
exports.sendPasswordResetEmail = async (req, res) => {
  if (!req.params.email) {
    return res.status(400).json({
      status: "error",
      message: "email must be provided!",
    });
  }
  const { email } = req.params;
  let patient;
  try {
    patient = await Patient.findOne({ email }).exec();
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
  if (patient) {
    const token = usePasswordHashToMakeToken(patient);
    patient.resetPasswordToken = token;
    patient.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    patient.save(function (err) {
      sendRecoveryEmail(err, patient, res);
    });
  } else {
    return res.status(404).json({
      status: "error",
      message: "No patient with that email",
    });
  }
};

const sendRecoveryEmail = (err, patient, res) => {
  const accesstToken = usePasswordHashToMakeToken(patient);
  const url = getPasswordResetURL(patient, accesstToken);
  const emailTemplate = resetPasswordTemplate(patient, url);

  console.log("process.env.SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);
  sgMail.send(emailTemplate).then(
    (info) => {
      console.log(`** Email sent **`, info);
      return res.status(200).json({
        status: "success",
        message:
          "We have sent an email with instructions to reset your credentionals.",
      });
    },
    (error) => {
      console.error(error);
      if (error.response) {
        console.error("error.response.body:", error.response.body);
      }
      return res.status(500).json({
        status: "error",
        message: "Something went wrong while sending an reset email.",
      });
    }
  );
};

exports.receiveNewPassword = async (req, res) => {
  const { patientId, token } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      status: "error",
      message: "Body content can not be empty!",
    });
  }

  let patient;
  try {
    patient = await Patient.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    }).exec();
    if (!patient) {
      return res.status(400).json({
        status: "error",
        message: "Password reset token is invalid or has expired!",
      });
    }
    const secret = patient.password + "-" + patient.createdAt;
    const payload = jwt.decode(token, secret);

    if (payload.patientId == patient._id) {
      // patient._id is Object and payload.patientId is String so === won't work
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return;
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return;
          Patient.findOneAndUpdate(
            { _id: patientId },
            {
              password: hash,
              resetPasswordToken: undefined,
              resetPasswordExpires: undefined,
            }
          )
            .then(() =>
              res.status(202).json({
                message: "Password changed accepted",
              })
            )
            .catch((err) => res.status(500).json(err));
        });
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Wrong patient!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Invalid patient",
    });
  }
};
