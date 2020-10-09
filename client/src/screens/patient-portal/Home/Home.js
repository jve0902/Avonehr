import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import AuthService from "./../../../services/patient_portal/auth.service";
import { AuthConsumer } from "./../../../providers/AuthProvider";
import { loginComplete } from "./../../../store/auth/actions";
import Error from "./../../../components/common/Error";

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
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.lockIcon} />
        </Avatar>
        <Typography component="h1" variant="h2" className={classes.pageTitle}>
          Patient Portal
        </Typography>
      </div>
    </Container>
  );
};

export default Home;
