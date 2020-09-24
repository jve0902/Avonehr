import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography
} from "@material-ui/core";

export default function FormContent(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      {
        data.map(item => (
          <Grid key={item.title} className={classes.inputRow}>
            <Typography component="span" className={classes.text12} color="textPrimary">
              {item.title}
            </Typography>
          </Grid>
        ))
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(1),
  },
  text12: {
    fontSize: 12
  }
}));
