import React from "react";
import moment from "moment";
import { calculateAge, formatPhoneNumber } from "../../../utils/helpers"
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

export default function Content(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      <Grid className={classes.inputRow}>
        <Typography component="span" variant="body1" color="textPrimary">Name: </Typography>
        <Typography component="span" variant="body1" color="textPrimary">{data.firstname} {data.lastname}</Typography>
      </Grid>

      <Grid className={classes.inputRow}>
        <Typography component="span" variant="body1" color="textPrimary">Gender: </Typography>
        <Typography component="span" variant="body1" color="textPrimary">{data.gender === "M" ? "Male" : "Female"}</Typography>
      </Grid>

      <Grid className={classes.inputRow}>
        <Typography component="span" variant="body1" color="textPrimary">DOB: </Typography>
        <Typography component="span" variant="body1" color="textPrimary">{moment(data.dob).format("MMM DD YYYY")} (Age: {calculateAge(data.dob)})</Typography>
      </Grid>

      <Grid className={classes.inputRow}>
        <Typography component="span" variant="body1" color="textPrimary">Home: </Typography>
        <Typography component="span" variant="body1" color="textPrimary">{formatPhoneNumber(data.phone_home)}</Typography>
      </Grid>

      <Grid className={classes.inputRow}>
        <Typography component="span" variant="body1" color="textPrimary">Mobile: </Typography>
        <Typography component="span" variant="body1" color="textPrimary">{formatPhoneNumber(data.phone_cell)}</Typography>
      </Grid>

      <Grid className={classes.inputRow}>
        <Typography component="span" variant="body1" color="textPrimary">Provider: </Typography>
        <Typography component="span" variant="body1" color="textPrimary">{data.provider}</Typography>
      </Grid>

      <Grid>
        <Typography component="span" variant="body1" color="textPrimary">Next Appointment: </Typography>
        <Typography component="span" variant="body1" color="textPrimary">
          {data.firstname}&nbsp;
          {data.lastname}
        </Typography>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: 4,
  },
}));
