import React, { useEffect } from "react";

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
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Error from "./../../../components/common/Error";
import { AuthConsumer } from "./../../../providers/AuthProvider";
import AuthService from "./../../../services/patient_portal/auth.service";
import { loginComplete } from "./../../../store/auth/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  Logo: {
    backgroundColor: "grey"
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  withErrors: {
    opacity: 0.9
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

const PatientLogin = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { clientCode } = useParams();
  const [email, setEmail] = React.useState("");
  const [clientId, setClientId] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState([]);

  useEffect(() => {
    AuthService.getClientCode(clientCode).then(
      (res) => {
        const { client_id } = res.data[0];
        setClientId(client_id);
      },
      (error) => {
        console.log("getClientCode error:", error);
        if (!error.response) {
          return;
        }
        const { data, status } = error.response;

        if (status === 400) {
          setErrors([
            {
              msg: data.message
            }
          ]);
        } else {
          setErrors([]);
        }
      }
    );
  }, [clientCode]);

  const onFormSubmit = (event, login) => {
    if (email !== "") {
      localStorage.username = email;
      localStorage.password = password;
    }

    AuthService.login({
      client_id: clientId,
      email: email.trim(),
      password: password.trim()
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
          setErrors([
            {
              msg: data.message
            }
          ]);
        } else {
          setErrors([]);
        }
      }
    );
  };

  useEffect(() => {
    if (localStorage.username !== "") {
      setEmail(localStorage.username);
      setPassword(localStorage.password);
    }
  }, []);

  return (
    <AuthConsumer>
      {({ isAuth, login }) => {
        if (isAuth) {
          history.push(`/patient`);
        }
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.Logo}>
              <img
                src={
                  //TODO:: Fix this LOGO url
                  process.env.REACT_APP_SITE_URL + "assets/client/c1_logo.png"
                }
                alt="Client logo"
              />
            </div>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon className={classes.lockIcon} />
              </Avatar>
              <Typography
                component="h1"
                variant="h2"
                className={classes.pageTitle}
              >
                Patient Sign in
              </Typography>

              <Error errors={errors} />

              <form
                className={clsx({
                  [classes.form]: true, //always apply
                  [classes.withErrors]: errors.length > 0 //only when isLoading === true
                })}
                noValidate
              >
                <TextField
                  disabled={errors.length > 0}
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
                  disabled={errors.length > 0}
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
                <Button
                  disabled={!email || !password || errors.length > 0}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => onFormSubmit(event, login)}
                >
                  Sign In
                </Button>
              </form>
              <Grid container className={classes.meta}>
                <Grid item xs>
                  <Link href={`/forgot/${clientCode}`} variant="body2">
                    Forgot your password? Reset here.
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        );
      }}
    </AuthConsumer>
  );
};

export default PatientLogin;
