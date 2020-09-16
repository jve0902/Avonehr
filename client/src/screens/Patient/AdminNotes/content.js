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
        data.map((item, index) => (
          <Grid key={index} className={classes.inputRow}>
            <Grid component="span">
              {item.admin_note}
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
