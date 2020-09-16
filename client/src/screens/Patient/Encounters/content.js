import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Divider,
  Typography
} from "@material-ui/core";

export default function Content(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      {
        data.map((item, index) => (
          <>
            <Grid key={item.title} container>
              <Grid item className={classes.block}>
                {moment(item.dt).format("MMM DD YYYY")}
              </Grid>
              <Grid item className={classes.block}>
                {item.encounter_type}
              </Grid>
              <Grid item className={classes.block}>
                {item.title}
              </Grid>
              <Grid item className={classes.block}>
                {item.name}
              </Grid>
            </Grid>

            <Grid className={classes.inputRow}>
              <Typography gutterBottom>Notes:</Typography>
              <Typography>{item.notes ? item.notes : "No notes found..."}</Typography>
            </Grid>

            <Grid className={classes.inputRow}>
              <Typography gutterBottom>Payment Plan:</Typography>
              <Typography>{item.payment_plan ? item.payment_plan : "No payment plan found..."}</Typography>
            </Grid>

            {
              index + 1 !== data.length && (
                <Divider />
              )
            }
          </>
        ))
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(1),
  },
  block: {
    width: 120,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: theme.spacing(1, 1, 1, 0),
  }
}));
