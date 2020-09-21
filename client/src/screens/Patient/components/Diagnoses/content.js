import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

export default function Content(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      {data.map((item) => (
        <Grid key={item.icd_id} className={classes.inputRow}>
          <Typography variant="body1" color="textPrimary">
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
}));
