import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid
} from "@material-ui/core";

export default function Content(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
    {
      data.map(item => (
        <Grid key={item.id} className={classes.inputRow}>
          <Grid component="span">
            {item.name}&nbsp;
          </Grid>
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
}));
