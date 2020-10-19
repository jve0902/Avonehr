import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import EmailService from "../../../../services/email.service";
import Dimmer from "./../../../../components/common/Dimmer";
import Error from "./../../../../components/common/Error";
import AuthService from "./../../../../services/auth.service";
import { resetPasswordSuccess } from "./../../../../store/auth/actions";
import { setSuccess } from "./../../../../store/common/actions";
import Success from "./Success";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    color: theme.palette.text.secondary
  },
  lockIcon: {
    fontSize: "40px"
  },
  pageTitle: {
    marginBottom: theme.spacing(3)
  },
  dateOfBirth: {
    width: "100%"
  },
  Error: {
    marginTop: theme.spacing(2)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  meta: {
    textAlign: "right",
    "& a": {
      color: theme.palette.text.secondary
    }
  }
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = React.useState([]);
  const [registrationLink, setRegistrationLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dateOfBirth, handleDateChange] = useState(new Date());
  const success = useSelector((state) => state.common.success, shallowEqual);

  const sendPasswordResetEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    AuthService.passwordChangeRequest(email).then(
      (response) => {
        setIsLoading(false);
        dispatch(resetPasswordSuccess());
        dispatch(setSuccess(`${email} ${response.data.message}`));
        setErrors([]);
      },
      (error) => {
        setIsLoading(false);
        if (error.response) {
          const { data, status } = error.response;
          if (status === 400) {
            setErrors(data.message);
          } else {
            setErrors([]);
          }
          if (data && data.user && data.user.sign_dt === null) {
            setRegistrationLink(true);
          }

          if (data && data.user && data.user.email_confirm_dt === null) {
            setRegistrationLink(false);
            //Send email verification link
            EmailService.resendEmailVerification(error.response.data.user).then(
              (response) => {
                console.info(
                  "resendEmailVerification response",
                  response.response
                );
              },
              (error) => {
                console.error(
                  "resendEmailVerification error.response",
                  error.response
                );
              }
            );
          }
        }
      }
    );
    setEmail("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.lockIcon} />
        </Avatar>
        <Typography component="h1" variant="h2" className={classes.pageTitle}>
          Patient Forgot password
        </Typography>
        <Error errors={errors}>
          {registrationLink && (
            <Link href="/signup"> Go to user registration</Link>
          )}
        </Error>
        {success && (
          <Success
            header="If that account in our system then we have sent an email with instructions to reset your password!"
            loginText="Sign back in"
          />
        )}
        {!success && (
          <React.Fragment>
            <p>
              It happens to the best of us. Enter your email and we'll send you
              reset instructions.
            </p>
            <form
              className={classes.form}
              noValidate
              onSubmit={sendPasswordResetEmail}
            >
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              />
              <KeyboardDatePicker
                className={classes.dateOfBirth}
                margin="dense"
                clearable
                value={dateOfBirth}
                placeholder="10/10/2018"
                onChange={(date) => handleDateChange(date)}
                format="MM-dd-yyyy"
                inputVariant="outlined"
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="lastname"
                label="Last name"
                name="lastname"
                autoComplete="lastname"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="zipcode"
                label="Zipcode"
                name="zipcode"
                autoComplete="zipcode"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!email}
              >
                Reset
              </Button>
              <Grid container className={classes.meta}>
                <Grid item xs>
                  <Link href="/login_client" variant="body2">
                    Already have an account? Sign in.
                  </Link>
                </Grid>
              </Grid>
            </form>
          </React.Fragment>
        )}
      </div>
      <Dimmer isOpen={isLoading} />
    </Container>
  );
};

export default ForgotPassword;
