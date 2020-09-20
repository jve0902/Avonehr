import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography
} from "@material-ui/core";

export default function Content(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      {
        data.map((item, index) => (
          <Grid key={index} className={classes.inputRow}>
            <Typography component="span" variant="body1" color="textPrimary">{item.admin_note}</Typography>
          </Grid>
        ))
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: 0,
  },
}));
