import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import EmailService from "../../services/email.service";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  startFetching,
  fetchingCompleted,
  setError,
  setSuccess,
} from "../../store/common/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    textAlign: "center",
    "& p": {
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
}));

const Success = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [resend, setResend] = useState(null);
  const [errors, setErrors] = useState(null);
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const sendResendEmailRequest = () => {
    EmailService.resendEmailVerification(user).then(
      (response) => {
        console.log("resend response", response.data);
        setErrors(response.data);
        dispatch(setSuccess(response.response));
      },
      (error) => {
        setErrors(error.response);
        console.log("error.response", error.response);
      }
    );
  };
  console.log("errros", errors);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {errors && (
          <Alert severity={errors.status || "error"}>{errors.message}</Alert>
        )}
        <p>Thank you for signing up. </p>
        <p>
          Please confirm your email address by clicking one of the email just
          emailed you.
        </p>
        <p>
          <Button onClick={() => sendResendEmailRequest()} color="primary">
            Resend confirmation email
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};

export default Success;
