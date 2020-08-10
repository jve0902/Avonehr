import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Form from "./../../components/signup/Form";
import Success from "./../../components/signup/Success";
import { useHistory } from "react-router-dom";
import { signupPatient } from "./../../store/auth/actions";

import { AuthConsumer } from "./../../providers/AuthProvider";
import PracticeForm from "../../components/signup/PracticeForm";

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

const SignUp = ({ success, dispatch, ...props }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleFormSubmit = (email, password, gender) => {
    //dispatch(signupPatient(email, password, gender));
  };

  return (
    <AuthConsumer>
      {({ isAuth }) => {
        if (isAuth) {
          history.push("/profile");
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
                Physician Sign Up
              </Typography>
              <PracticeForm />
              {/*   {success ? <Success /> : <Form onFormSubmit={handleFormSubmit} />} */}
            </div>
          </Container>
        );
      }}
    </AuthConsumer>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.auth.success,
  };
};

export default connect(mapStateToProps)(SignUp);
