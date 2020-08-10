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
      lineHeight: "24px",
    },
  },
}));

const Success = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <p>Thank you for signing up. </p>
        <p>
          Please confirm your email address by clicking one of the email just
          emailed you.
        </p>
        <p>
          <Link href="/login">Resend confirmation email</Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default Success;
