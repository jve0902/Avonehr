import React from "react";
import moment from "moment";
import { calculateAge } from "../../../utils/helpers"
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  FormLabel
} from "@material-ui/core";

export default function Content(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      <Grid className={classes.inputRow}>
        <Grid component="span">
          <label>Name: </label>
          {data.firstname}&nbsp;
          {data.lastname}
        </Grid>
      </Grid>

      <Grid className={classes.inputRow}>
        <Grid component="span">
          <label>Gender: </label>
          {data.gender === "M" ? "Male" : "Female"}&nbsp;
        </Grid>
      </Grid>

      <Grid className={classes.inputRow}>
        <Grid component="span">
          <label>DOB: </label>
          {moment(data.dob).format("MMM DD YYYY")} (Age: {calculateAge(data.dob)})&nbsp;
        </Grid>
      </Grid>

      <Grid className={classes.inputRow}>
        <Grid component="span">
          <label>Home: </label>
          {data.phone_home}&nbsp;
        </Grid>
      </Grid>

      <Grid className={classes.inputRow}>
        <Grid component="span">
          <label>Mobile: </label>
          {data.phone_cell}&nbsp;
        </Grid>
      </Grid>

      <Grid className={classes.inputRow}>
        <Grid component="span">
          <label>Provider: </label>
          {data.provider}&nbsp;
        </Grid>
      </Grid>

      <Grid>
        <Grid component="span">
          <label>Next Appointment: </label>
          {data.firstname}&nbsp;
        {data.lastname}
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(1),
  },
}));
