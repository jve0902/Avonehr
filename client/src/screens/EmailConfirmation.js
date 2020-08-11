import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { verificationEmail } from "./../store/email/actions";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Dimmer from "./../components/common/Dimmer";
import VerificationSuccess from "../components/email/VerificationSuccess";
import VerificationMessage from "../components/email/VerificationMessage";

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

const EmailConfirmation = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    match: { params },
  } = props;

  const success = useSelector(
    (state) => state.email.success || false,
    shallowEqual
  );
  const loading = useSelector(
    (state) => state.email.loading || false,
    shallowEqual
  );
  const error = useSelector(
    (state) => state.email.error || false,
    shallowEqual
  );
  const isEmailVerified = useSelector(
    (state) => state.email.isEmailVerified || false,
    shallowEqual
  );
  const message = useSelector(
    (state) => state.email.message || false,
    shallowEqual
  );
  useEffect(() => {
    dispatch(verificationEmail(params.userId, params.token));
  }, []);
  let severity = "error";
  if (error) {
    severity = "error";
  }
  if (isEmailVerified) {
    severity = "info";
  }
  return (
    <React.Fragment>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          {(error || isEmailVerified) && (
            <VerificationMessage severity={severity} message={message} />
          )}
          {success && <VerificationSuccess isEmailVerified={isEmailVerified} />}
        </CardContent>
      </Card>

      <Dimmer isOpen={loading} />
    </React.Fragment>
  );
};

export default EmailConfirmation;
