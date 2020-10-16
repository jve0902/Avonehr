import React, { useState } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import RotateLeftTwoToneIcon from "@material-ui/icons/RotateLeftTwoTone";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import SignatureCanvas from "react-signature-canvas";

import CountrySelect from "../../../../components/common/CountrySelect";
import RegionSelect from "../../../../components/common/RegionSelect";
import { FormFields } from "../../../../static/expandForm";
import Error from "./../../../../components/common/Error";
import PatientAuthService from "./../../../../services/patient_portal/auth.service";

const SignupForm = (props) => {
  const classes = useStyles();
  const { onFormSubmit } = props;

  const BasicInfo = FormFields.basicInfo;
  const AddressDetails = FormFields.addressDetails;
  const ContactInfo = FormFields.contactInfo;
  const EmergencyInfo = FormFields.emergencyInfo;
  const InsuranceInfo = FormFields.insuranceInfo;
  const MedicalInfo = FormFields.medicalInfo;
  const UserNamePasswordInfo = FormFields.userNamePasswordDetails;

  const [termsChecked, setTermsChecked] = useState(true);
  const [signatureRef, setSignatureRef] = useState(null);
  const [formFields, setFormFields] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    postal: "",
    contactPreference: ""
  });
  const [fieldErrors, setFieldErrors] = useState([]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  const handleCountryRegion = (identifier, value) => {
    if (identifier === "country") {
      setFormFields({
        ...formFields,
        [identifier]: value
      });
    } else if (identifier === "region") {
      let identifier = "state";
      setFormFields({
        ...formFields,
        [identifier]: value
      });
    }
  };

  const handleCheckboxChange = (event) => {
    setTermsChecked(event.target.checked);
  };

  const clearSignaturePad = () => {
    signatureRef.clear();
  };

  const patientErrors =
    props.errors && props.errors.filter((err) => err.param.includes("patient"));

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
      target = "patient";
    }

    PatientAuthService.validate({
      fieldName: event.target.name,
      value: event.target.value,
      target
    })
      .then(
        (response) => {
          //Remove errors record with param
          const updatedErrors = fieldErrors.filter(
            (error) => error.param !== response.data.message.param
          );
          setFieldErrors(updatedErrors);
        },
        (error) => {
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

  const handleFormSubmission = () => {
    const formData = {
      patient: {
        status: "A",
        firstname: formFields.firstname,
        middlename: formFields.middlename,
        lastname: formFields.lastname,
        //preferred_name: formFields.preferred_name.trim(),
        address: formFields.address,
        address2: formFields.address2,
        city: formFields.city,
        state: formFields.state,
        postal: formFields.postal,
        country: formFields.country[0],
        phone_home: formFields.phone_home,
        phone_cell: formFields.phone_cell,
        phone_work: formFields.phone_work,
        phone_other: formFields.phone_other,
        phone_note: formFields.phone_note,
        email: formFields.email,
        password: formFields.password,
        dob: formFields.dob,
        ssn: formFields.ssn,
        gender: formFields.gender,
        emergency_firstname: formFields.emergency_firstname,
        emergency_middlename: formFields.emergency_middlename,
        emergency_lastname: formFields.lastname,
        emergency_relationship: formFields.emergency_relationship,
        emergency_email: formFields.emergency_email,
        emergency_phone: formFields.emergency_phone,
        insurance_name: formFields.insurance_name,
        insurance_group: formFields.insurance_group,
        insurance_member: formFields.insurance_member,
        insurance_phone: formFields.insurance_phone,
        insurance_desc: formFields.insurance_desc,
        primary_reason: formFields.primary_reason,
        admin_note: formFields.admin_note,
        medical_note: formFields.medical_note,
        referred_by: formFields.referred_by,
        height: formFields.height,
        waist: formFields.waist,
        weight: formFields.weigh
      }
    };
    onFormSubmit(formData);
  };

  return (
    <>
      <form>
        <Grid className={classes.inputRow}>
          {patientErrors &&
            patientErrors.map((error, index) => (
              <Alert severity="error" variant="filled" key={index}>
                {error.msg}
              </Alert>
            ))}
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={1}>
            {BasicInfo.map((item, index) => (
              <Grid key={index} item md={4}>
                {item.baseType === "input" ? (
                  <TextField
                    size="small"
                    variant="outlined"
                    label={item.label}
                    name={item.name}
                    id={item.id}
                    type={item.type}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                ) : (
                  <TextField
                    // className={classes.select}
                    size="small"
                    variant="outlined"
                    select
                    placeholder={item.label}
                    label={item.label}
                    id={item.id}
                    name={item.name}
                    value={formFields[item.name]}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  >
                    {item.options.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Address Information
          </Typography>
          <Grid container spacing={1}>
            {AddressDetails.map((item, index) => (
              <Grid key={index} item md={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            ))}
            <Grid item lg={4}>
              <CountrySelect
                size="small"
                id={"country-select"}
                error={null}
                name={"country-select"}
                helperText={""}
                label={"Country"}
                outlined={true}
                handleChange={(identifier, value) =>
                  handleCountryRegion(identifier, value)
                }
                country={formFields.country}
              />
            </Grid>
            <Grid item lg={4}>
              <RegionSelect
                size="small"
                id={"state-select"}
                error={null}
                name={"state-select"}
                helperText={""}
                label={"State"}
                outlined={true}
                handleChange={(identifier, value) =>
                  handleCountryRegion(identifier, value)
                }
                country={formFields["country"]}
                region={formFields.state}
              />
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Contact Information
          </Typography>
          <Grid container spacing={1} alignItems="flex-end">
            {ContactInfo.map((item, index) => (
              <Grid key={index} item md={4}>
                {item.baseType === "input" ? (
                  <>
                    <TextField
                      size="small"
                      variant="outlined"
                      label={item.label}
                      name={item.name}
                      id={item.id}
                      type={item.type}
                      fullWidth
                      onChange={(e) => handleInputChange(e)}
                      onBlur={(event) =>
                        (item.name === "email" || item.name === "ssn") &&
                        handleAjaxValidation(event)
                      }
                    />
                    <Error errors={getFieldError("patient", item.name)} />
                  </>
                ) : (
                  <TextField
                    size="small"
                    variant="outlined"
                    // className={classes.select}
                    select
                    placeholder={item.label}
                    label={item.label}
                    id={item.id}
                    name={item.name}
                    value={formFields[item.name]}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  >
                    {item.options.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Emergency Information
          </Typography>
          <Grid container spacing={1}>
            {EmergencyInfo.map((item, index) => (
              <Grid key={index} item md={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                  onBlur={(event) =>
                    item.name === "emergency_email" &&
                    handleAjaxValidation(event)
                  }
                />
                <Error errors={getFieldError("patient", item.name)} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Insurance Information
          </Typography>
          <Grid container spacing={1}>
            {InsuranceInfo.map((item, index) => (
              <Grid key={index} item md={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Medical Information
          </Typography>
          <Grid container spacing={1}>
            {MedicalInfo.slice(0, 2).map((item, index) => (
              <Grid key={index} item md={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            ))}
            {MedicalInfo.slice(2, 3).map((item, index) => (
              <Grid key={index} item md={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                  multiline={true}
                  rows={5}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Divider />
        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Set Username and Password for Patient Portal
          </Typography>
          <Grid container spacing={1}>
            {UserNamePasswordInfo.map((item, index) => (
              <Grid key={index} item md={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <FormControlLabel
          value="end"
          control={
            <Checkbox
              checked={termsChecked}
              onChange={(e) => handleCheckboxChange(e)}
              color="primary"
            />
          }
          label="I have read and accept the terms of the privacy policy below."
          labelPlacement="end"
        />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Signature
          </Typography>
          <Grid container justify="center" style={{ position: "relative" }}>
            <Grid item>
              <SignatureCanvas
                ref={(ref) => setSignatureRef(ref)}
                on={true}
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: classes.sigCanvas
                }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => clearSignaturePad()}
                className={classes.sigCanvasClear}
              >
                <RotateLeftTwoToneIcon />
              </IconButton>
            </Grid>
            <Grid item className={classes.sigCanvasActions}>
              <Button variant="outlined" onClick={() => clearSignaturePad()}>
                Clear
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className={classes.signupActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleFormSubmission()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0)
  },
  sigCanvas: {
    border: "1px solid grey"
  },
  sigCanvasClear: {
    position: "absolute",
    background: "#f3f3f3",
    top: "-20px"
  },
  sigCanvasActions: {
    padding: "0 15px",
    display: "none"
  },
  signupActions: {
    marginTop: theme.spacing(1),
    maxWidth: "506px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "right",
    display: "block"
  }
}));

export default SignupForm;
