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
          <Grid key={index}>
            <Grid key={index} container>
              <Grid item className={classes.block}>
                <Typography component="span" variant="body1" color="textPrimary">{moment(item.dt).format("MMM DD YYYY")}</Typography>
              </Grid>

              <Grid item className={classes.block}>
                <Typography component="span" variant="body1" color="textPrimary">{item.encounter_type}</Typography>
              </Grid>

              <Grid item className={classes.block}>
                <Typography component="span" variant="body1" color="textPrimary">{item.title}</Typography>
              </Grid>

              <Grid item className={classes.block}>
                <Typography component="span" variant="body1" color="textPrimary">{item.name}</Typography>
              </Grid>
            </Grid>

            <Grid className={classes.inputRow}>
              <Typography variant="body1" color="textPrimary" gutterBottom>Notes:</Typography>
              <Typography variant="body1" color="textPrimary">{item.notes ? item.notes : "No notes found..."}</Typography>
            </Grid>

            <Grid className={classes.inputRow}>
              <Typography variant="body1" color="textPrimary" gutterBottom>Payment Plan:</Typography>
              <Typography variant="body1" color="textPrimary">{item.payment_plan ? item.payment_plan : "No payment plan found..."}</Typography>
            </Grid>

            {
              index + 1 !== data.length && (
                <Divider />
              )
            }
          </Grid>
        ))
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
  },
  block: {
    width: 120,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: theme.spacing(1, 1, 1, 0),
  }
}));
