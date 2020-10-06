import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

export default function AllergiesContent(props) {
  const classes = useStyles();
  const { data, /* reloadData */ } = props;

  return (
    <>
      {data.map((item) => (
        <Grid
          key={item.drug_id}
          className={classes.inputRow}
        >
          <Typography className={classes.text12}>{item.name}</Typography>
        </Grid>
      ))}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(1),
  },
  text12: {
    fontSize: 12,
  },
}));
