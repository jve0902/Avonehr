import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { AuthConsumer } from "./../../../providers/AuthProvider";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(3),
  },
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
}));

const PatientSignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  return (
    <AuthConsumer>
      {({ isAuth }) => {
        if (isAuth) {
          history.push("/");
        }
        return (
          <Container component="main" maxWidth="sm">
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
                Register with {"client.name"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                To register as a new patient, please enter your infromation in
                the fields below. Please do not use this form if you are already
                patient.
              </Typography>
              <Typography variant="body2" gutterBottom>
                If you would like to amend your information, please send a
                Secure Message or call our office.
              </Typography>
              <Typography variant="body2" gutterBottom>
                If you are already a registered patient with online access, you
                can log in <Link to="#">here</Link>
              </Typography>
            </div>
          </Container>
        );
      }}
    </AuthConsumer>
  );
};

export default PatientSignUp;
