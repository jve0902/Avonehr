import React from "react";
import moment from "moment";
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
          <Grid key={item.tran_type} container className={classes.inputRow}>
            <Grid item className={classes.block}>
              {moment(item.dt).format("MMM DD YYYY")}
            </Grid>
            <Grid item className={classes.block}>
              {item.tran_type}
            </Grid>
            <Grid item className={classes.block}>
              {item.encounter_title}
            </Grid>
            <Grid item className={classes.block}>
              {item.cpt_procedure}
            </Grid>
          </Grid>
        ))
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    // marginBottom: theme.spacing(1),
    // fontSize: 14
  },
  block: {
    width: 110,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: theme.spacing(1, 1, 1, 0),
  }
}));
