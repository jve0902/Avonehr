import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import TextFieldWithError from "./TextFieldWithError";
import AuthService from "./../../services/auth.service";
import { getAcronym } from "./../../utils/helpers";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formSectionTitle: {
    marginBottom: theme.spacing(1),
  },
  personalFormTitle: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  checkbox: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const PracticeForm = ({ onFormSubmit, ...props }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [url, setUrl] = useState("");
  const [practiceEmail, setPracticeEmail] = useState("");
  const [ein, setEin] = useState("");
  const [npi, setNpi] = useState("");
  const [clientCode, setClientCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [personalNPI, setPersonalNPI] = useState("");
  const [medicalLicenseNumber, setMedicalLicenseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const [fieldErrors, setFieldErrors] = useState([]);

  useEffect(() => {
    const clientCode = getAcronym(name);
    setClientCode(clientCode);
  }, [name]);

  const handleFormSubmission = () => {
    const formData = {
      client: {
        name: name,
        address: address,
        address2: address2,
        city: city,
        state: state,
        postal: zipCode,
        phone: phone,
        fax: fax,
        email: practiceEmail,
        website: url,
        ein: ein,
        npi: npi,
        code: clientCode,
      },
      user: {
        firstname: firstName,
        lastname: lastName,
        email: email,
        npi: personalNPI,
        medical_license: medicalLicenseNumber,
        password: password,
      },
    };

    onFormSubmit(formData);
  };

  const validatePasswod = (event) => {
    if (event.target.value.length < 8) {
      setFieldErrors([
        ...fieldErrors,
        {
          value: event.target.value,
          msg: "Too Weak. Must be atleast 8 Characters",
          param: "user.password",
        },
      ]);
    } else {
      const updatedErrors = fieldErrors.filter(
        (error) => error.param !== "user.password"
      );
      setFieldErrors(updatedErrors);
    }
  };
  const practiceErrors =
    props.errors && props.errors.filter((err) => err.param.includes("client"));
  const userErrors =
    props.errors && props.errors.filter((err) => err.param.includes("user"));

  const getFieldError = (target, fieldName) => {
    let value = "client." + fieldName;
    if (target) {
      value = target + "." + fieldName;
    }
    return fieldErrors && fieldErrors.filter((err) => err.param === value);
  };
  const handleAjaxValidation = (event, target) => {
    if (!event.target) {
      return;
    }
    if (!target) {
      target = "client";
    }

    AuthService.validate({
      fieldName: event.target.name,
      value: event.target.value,
      target,
    })
      .then(
        (response) => {
          //Remove errors record with param
          const updatedErrors = fieldErrors.filter(
            (error) => error.param !== response.data.message.param
          );
          console.log("updatedErrors:", updatedErrors);
          setFieldErrors(updatedErrors);
        },
        (error) => {
          console.log("error.status", error);

          if (!error.response) {
            // network error
            console.error(error);
          } else {
            const uniqueFieldErrors = _.uniqWith(
              [...fieldErrors, error.response.data.message],
              _.isEqual
            );
            setFieldErrors(uniqueFieldErrors);
          }
        }
      )
      .catch((err) => {
        console.log("catch err", err);
      });
  };

  console.log("fieldErrors", fieldErrors);
  console.log("fieldErrors.length > 0", fieldErrors.length > 0);
  return (
    <form className={classes.form} noValidate>
      <Typography
        component="h3"
        variant="h4"
        color="textPrimary"
        className={classes.formSectionTitle}
      >
        Practice Information
      </Typography>
      {practiceErrors &&
        practiceErrors.map((error, index) => (
          <Alert severity="error" key={index}>
            {error.msg}
          </Alert>
        ))}
      <TextFieldWithError
        fieldName="name"
        label="Practice name"
        value={name}
        handleOnChange={(event) => setName(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "name")}
      />
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        name="address"
        label="Practice Address"
        id="address"
        autoComplete="current-address"
        onChange={(event) => setAddress(event.target.value)}
        value={address}
      />
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        name="address2"
        label="Practice Address Line Two"
        id="address2"
        autoComplete="current-address2"
        onChange={(event) => setAddress2(event.target.value)}
        value={address2}
      />
      <TextField
        value={city}
        variant="outlined"
        margin="dense"
        fullWidth
        id="city"
        label="Practice city"
        name="city"
        autoComplete="city"
        autoFocus
        onChange={(event) => setCity(event.target.value)}
      />
      <TextField
        value={state}
        variant="outlined"
        margin="dense"
        fullWidth
        id="state"
        label="Practice state"
        name="state"
        autoComplete="state"
        autoFocus
        onChange={(event) => setState(event.target.value)}
      />
      <TextField
        value={zipCode}
        variant="outlined"
        margin="dense"
        fullWidth
        id="zipcode"
        label="Practice Zipcode"
        name="zipcode"
        autoComplete="zipcode"
        autoFocus
        onChange={(event) => setZipCode(event.target.value)}
      />
      <TextFieldWithError
        fieldName="phone"
        label="Practice phone"
        value={phone}
        handleOnChange={(event) => setPhone(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "phone")}
      />
      <TextFieldWithError
        fieldName="fax"
        label="Practice Fax"
        value={fax}
        handleOnChange={(event) => setFax(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "fax")}
      />
      <TextFieldWithError
        fieldName="website"
        label="Practice Website URL"
        value={url}
        handleOnChange={(event) => setUrl(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "website")}
      />
      <TextFieldWithError
        fieldName="email"
        label="Practice Email"
        value={practiceEmail}
        handleOnChange={(event) => setPracticeEmail(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "email")}
      />
      <TextFieldWithError
        fieldName="ein"
        label="Practice EIN Number"
        value={ein}
        handleOnChange={(event) => setEin(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "ein")}
      />
      <TextFieldWithError
        fieldName="npi"
        label="Practice NPI Number"
        value={npi}
        handleOnChange={(event) => setNpi(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "npi")}
      />
      <TextFieldWithError
        fieldName="code"
        label="Client Code"
        value={clientCode}
        handleOnChange={(event) => setClientCode(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "code")}
      />
      <Typography
        component="h3"
        variant="h4"
        color="textPrimary"
        className={classes.personalFormTitle}
      >
        Your Personal Information
      </Typography>
      {userErrors &&
        userErrors.map((error, index) => (
          <Alert severity="error" key={index}>
            {error.msg}
          </Alert>
        ))}
      <TextField
        value={firstName}
        variant="outlined"
        margin="dense"
        fullWidth
        id="firstName"
        label="Your Firstname"
        name="firstName"
        autoComplete="firstName"
        autoFocus
        onChange={(event) => setFirstName(event.target.value)}
      />
      <TextField
        value={lastName}
        variant="outlined"
        margin="dense"
        fullWidth
        id="lastName"
        label="Your Lastname"
        name="lastName"
        autoComplete="lastName"
        autoFocus
        onChange={(event) => setLastName(event.target.value)}
      />
      <TextFieldWithError
        fieldName="email"
        label="Your Email Address"
        value={email}
        handleOnChange={(event) => setEmail(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event, "user")}
        errors={getFieldError("user", "email")}
      />
      <TextFieldWithError
        fieldName="npi"
        label="Your NPI Number"
        value={personalNPI}
        handleOnChange={(event) => setPersonalNPI(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event, "user")}
        errors={getFieldError("user", "npi")}
      />
      <TextFieldWithError
        fieldName="medical_license"
        label="Your Medical License Number"
        value={medicalLicenseNumber}
        handleOnChange={(event) => setMedicalLicenseNumber(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event, "user")}
        errors={getFieldError("user", "medical_license")}
      />
      <TextFieldWithError
        fieldName="password"
        label="Your Password"
        type="password"
        value={password}
        handleOnChange={(event) => setPassword(event.target.value)}
        handleOnBlur={(event) => validatePasswod(event)}
        errors={getFieldError("user", "password")}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label={
          <div>
            <span>
              Check here to indicate that you have read and agree to the terms
              of the <Link href="/agreement">Clinios Customer Aggrements</Link>
            </span>
          </div>
        }
        className={classes.checkbox}
        onChange={() => setTermsAndConditions(!termsAndConditions)}
      />
      <Button
        disabled={fieldErrors.length > 0 || !termsAndConditions}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={(event) => handleFormSubmission(event)}
      >
        Sign up
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/login_client" variant="body2">
            Already a member? Login here
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default PracticeForm;
