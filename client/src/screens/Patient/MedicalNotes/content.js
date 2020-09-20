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
          <Grid key={`${item.medical_note}_${index}`}>
            <Typography variant="body1" color="textPrimary" gutterBottom>{item.medical_note}</Typography>
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
