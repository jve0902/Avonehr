import React, { useEffect, useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert, AlertTitle } from "@material-ui/lab";
import clsx from "clsx";
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Error from "./../../../components/common/Error";
import { AuthConsumer } from "./../../../providers/AuthProvider";
import HomeService from "./../../../services/patient_portal/home.service";
import { loginComplete } from "./../../../store/auth/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "left"
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
  const [header, setHeader] = useState({});
  useEffect(() => {
    HomeService.getClientHeader().then(
      (response) => {
        console.log("response", response);
        setHeader(response.data[0]);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, []);

  console.log("header:", header);
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Alert severity="info">
          {header && ReactHtmlParser(header.header)}
        </Alert>
        <Typography component="h1" variant="h2" className={classes.pageTitle}>
          Portal Home
        </Typography>
        <Typography component="p" variant="body2">
          Welcome to patient portal
        </Typography>
      </div>
    </Container>
  );
};

export default Home;
