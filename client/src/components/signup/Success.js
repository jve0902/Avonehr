import React from "react";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
}));

const Success = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <p>
          You're successfully registered. <Link href="/login">Login here</Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default Success;
