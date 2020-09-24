import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

export default function DiagnosesContent(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      {data.map((item) => (
        <Grid key={item.icd_id} className={classes.inputRow}>
          <Typography className={classes.text12} color="textPrimary">
            {item.name}
          </Typography>
        </Grid>
      ))}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0),
  },
  text12: {
    fontSize: 12
  }
}));
