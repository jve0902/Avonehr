import React from "react";

import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    textAlign: "center",
    "& p": {
      fontSize: "16px",
      lineHeight: "24px"
    }
  }
}));

const VerificationSuccess = ({ isEmailVerified }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {isEmailVerified ? (
          <p>
            Your can login here:{" "}
            <Link href={`${process.env.REACT_APP_SITE_URL}login_client`}>
              {`${process.env.REACT_APP_SITE_URL}login_client`}
            </Link>
          </p>
        ) : (
          <React.Fragment>
            <p>Thank you for confirming your email address. </p>
            <p>
              Your login page would be{" "}
              <Link href={`${process.env.REACT_APP_SITE_URL}login_client`}>
                {`${process.env.REACT_APP_SITE_URL}login_client`}
              </Link>
            </p>
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationSuccess;
