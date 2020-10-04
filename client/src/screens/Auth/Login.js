import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthService from "./../../services/auth.service";
import EmailService from "../../services/email.service";
import { AuthConsumer } from "./../../providers/AuthProvider";
import {
  partialLoginComplete,
  loginComplete,
} from "./../../store/auth/actions";
import Error from "./../../components/common/Error";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
  },
  lockIcon: {
    fontSize: "40px",
  },
  pageTitle: {
    marginBottom: theme.spacing(3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [isRedirect, setIsRedirect] = React.useState(false);
  const [errors, setErrors] = React.useState([]);

  const onFormSubmit = (event, login) => {
    if (isChecked && email !== "") {
      localStorage.username = email;
      localStorage.password = password;
      localStorage.rememberme = isChecked;
    }

    AuthService.login({
      email: email.trim(),
      password: password.trim(),
    }).then(
      (res) => {
        setErrors([]);
        dispatch(loginComplete(res.data));
        login(); // Call AuthProvider login
      },
      (error) => {
        if (!error.response) {
          return;
        }
        const { data, status } = error.response;

        if (status === 400) {
          setErrors(data.message);
        } else {
          setErrors([]);
        }

        if (data && data.user && data.user.sign_dt === null) {
          setTimeout(function () {
            setIsRedirect(true);
          }, 3000);

          //set user info to Redux to re-use on user_registration.png
          dispatch(partialLoginComplete(error.response.data.user));
        }
        if (data && data.user && data.user.email_confirm_dt === null) {
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
    );
  };

  useEffect(() => {
    if (localStorage.rememberme && localStorage.username !== "") {
      setIsChecked(true);
      setEmail(localStorage.username);
      setPassword(localStorage.password);
    }
  }, []);

  return (
    <AuthConsumer>
      {({ isAuth, login }) => {
        if (isAuth) {
          history.push(`/dashboard`);
        }
        if (isRedirect) {
          history.push("/signup");
        }
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon className={classes.lockIcon} />
              </Avatar>
              <Typography
                component="h1"
                variant="h2"
                className={classes.pageTitle}
              >
                Physician Login
              </Typography>
              <Error errors={errors} />

              <form className={classes.form} noValidate>
                <TextField
                  value={email}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(event) => setEmail(event.target.value)}
                  inputProps={{ maxLength: 320 }}
                  helperText={`${
                    email.length >= 320
                      ? "Enter an email between 40 charecter"
                      : ""
                  }`}
                />
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
                  inputProps={{ maxLength: 128 }}
                  helperText={`${
                    email.length >= 128
                      ? "Enter an email between 40 charecter"
                      : ""
                  }`}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={isChecked}
                      onChange={(event) => setIsChecked(event.target.checked)}
                    />
                  }
                  label="Remember me"
                />
                <Button
                  disabled={!email || !password}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => onFormSubmit(event, login)}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot-password" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup_client" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
      }}
    </AuthConsumer>
  );
};

export default Login;
