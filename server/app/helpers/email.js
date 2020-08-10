const signUpConfirmationTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Signup Confirmation";
  const html = `
  <p>Hi ${user.displayName || user.email},</p>
  <p>Thank you for signing up</p>
  <p>To confirm your email address click or copy the following link:</p>
  <a href=${url}>${url}</a>

  <p>–-Clinios</p>
  `;

  return { from, to, subject, html };
};

const getPasswordResetURL = (patient, token) =>
  `http://localhost:3000/password/reset/${patient._id}/${token}`;

const resetPasswordTemplate = (patient, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = patient.email;
  const subject = "AvonHealth Password Reset";
  const html = `
  <p>Hey ${patient.displayName || patient.email},</p>
  <p>We heard that you lost your AvonHealth password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–-AvonHealth</p>
  `;

  return { from, to, subject, html };
};

const email = {
  getPasswordResetURL,
  resetPasswordTemplate,
  signUpConfirmationTemplate,
};
module.exports = email;
