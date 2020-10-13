import React from "react";

import { Grid, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

export default function EncountersContent(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      {data.map((item, index) => (
        <Grid key={index}>
          <Grid key={index} container>
            <Grid item className={classes.block}>
              <Typography
                component="span"
                className={classes.text12}
                color="textPrimary"
              >
                {moment(item.dt).format("MMM D YYYY")}
              </Typography>
            </Grid>

            <Grid item className={classes.block}>
              <Typography
                component="span"
                className={classes.text12}
                color="textPrimary"
              >
                {item.encounter_type}
              </Typography>
            </Grid>

            <Grid item className={classes.block}>
              <Typography
                component="span"
                className={classes.text12}
                color="textPrimary"
              >
                {item.title}
              </Typography>
            </Grid>

            <Grid item className={classes.block}>
              <Typography
                component="span"
                className={classes.text12}
                color="textPrimary"
              >
                {item.name}
              </Typography>
            </Grid>
          </Grid>

          <Grid className={classes.inputRow}>
            <Typography className={classes.text12} color="textPrimary">
              Notes:
            </Typography>
            <Typography className={classes.text12} color="textPrimary">
              {item.notes ? item.notes : "No notes found..."}
            </Typography>
          </Grid>

          <Grid className={classes.inputRow}>
            <Typography className={classes.text12} color="textPrimary">
              Payment Plan:
            </Typography>
            <Typography className={classes.text12} color="textPrimary">
              {item.payment_plan
                ? item.payment_plan
                : "No payment plan found..."}
            </Typography>
          </Grid>

          {index + 1 !== data.length && <Divider className={classes.divider} />}
        </Grid>
      ))}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0)
  },
  block: {
    width: 90,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0, 1, 0)
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  text12: {
    fontSize: 12
  }
}));
