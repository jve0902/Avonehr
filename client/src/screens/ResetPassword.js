import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";

import { setError, setSuccess } from "./../store/common/actions";
import AuthService from "./../services/auth.service";
import Success from "./../screens/ForgetPassword/Success";
import Error from "./../components/common/Error";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pageTitle: {
    marginBottom: theme.spacing(3),
  },
  resetPasswordFormSentWrapper: {},
  resetPasswordFormWrapper: {},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);
  const success = useSelector((state) => state.common.success, shallowEqual);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    AuthService.resetPassword(userId, token, password).then(
      (response) => {
        console.log("change password response", response);
        dispatch(setSuccess(`${response.data.message}`));
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        let severity = "error";
        if (error.response.status === 403) {
          severity = "warning";
        }
        dispatch(
          setError({
            severity: severity,
            message: resMessage,
          })
        );
      }
    );
    setPassword("");
    setConfirmPassword("");
  };

  const validatePasswod = (event) => {
    if (event.target.value.length < 8) {
      setFieldErrors([
        {
          value: event.target.value,
          msg: "Too Weak. Must be atleast 8 Characters",
          param: "user.password",
        },
      ]);
    } else {
      setFieldErrors([]);
    }
  };
  const validatePasswodConfirm = () => {
    if (confirmPassword !== password) {
      setFieldErrors([
        {
          value: `password: ${password} confirmPassword ${confirmPassword}`,
          msg: "Password and ConfirmPassword must be same!",
        },
      ]);
    }
    if (confirmPassword === password) {
      setFieldErrors([]);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.lockIcon} />
        </Avatar>
        <Typography component="h1" variant="h2" className={classes.pageTitle}>
          Update your password
        </Typography>
        <Error errors={fieldErrors} />
        {success && (
          <Success
            header="Your password has been saved."
            loginText="Sign back in"
          />
        )}
        {!success && (
          <div className={classes.resetPasswordFormWrapper}>
            <form className={classes.form} noValidate>
              <TextField
                value={password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                onBlur={(event) => validatePasswod(event)}
              />
              <TextField
                value={confirmPassword}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                onBlur={(event) => validatePasswodConfirm(event)}
              />
              <Button
                fullWidth
                disabled={
                  !password || !confirmPassword || password !== confirmPassword
                }
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(event) => handlePasswordReset(event)}
              >
                Submit
              </Button>
            </form>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ResetPassword;
