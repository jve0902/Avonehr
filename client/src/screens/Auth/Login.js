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

import { AuthConsumer } from "./../../providers/AuthProvider";
import { loginAction } from "./../../store/auth/actions";

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

  const onFormSubmit = (event, login) => {
    if (isChecked && email !== "") {
      localStorage.username = email;
      localStorage.password = password;
      localStorage.rememberme = isChecked;
    }
    dispatch(loginAction(email, password, login));
    event.preventDefault();
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
          history.push("/");
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
