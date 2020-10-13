import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  calculateAge,
  formatPhoneNumber,
  DateDiff
} from "./../../../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

//service
import PatientService from "../../../../services/patient.service";

export default function BasicInfoContent(props) {
  const classes = useStyles();
  const { data, patientId } = props;
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const fetchNextAppointment = () => {
      PatientService.getNextAppointment(patientId).then((res) => {
        setNextAppointment(
          res.data && res.data.length ? res.data[0].start_dt : ""
        );
      });
    };
    fetchNextAppointment();
  }, [patientId]);

  const calculateDateDifference = () => {
    var d1 = new Date();
    var d2 = new Date(nextAppointment);

    let daysDiff = DateDiff.inDays(d1, d2);
    let monthsDiff = DateDiff.inMonths(d1, d2);
    let yearsDiff = DateDiff.inYears(d1, d2);

    if (yearsDiff > 0) {
      return yearsDiff > 1 ? `${yearsDiff} years` : `${yearsDiff} year`;
    } else if (monthsDiff > 0) {
      return monthsDiff > 1 ? `${monthsDiff} months` : `${monthsDiff} month`;
    } else {
      return daysDiff > 1 ? `${daysDiff} days` : `${daysDiff} day`;
    }
  };

  const mapGender = (value) => {
    let genderString = "";
    if (value === "M") {
      genderString = "Male";
    } else if (value === "F") {
      genderString = "Female";
    } else {
      genderString = "Not Specified";
    }
    return genderString;
  };

  return (
    <>
      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Name:&nbsp;
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
        >
          {data.firstname} {data.lastname}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Gender:&nbsp;
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
        >
          {mapGender(data.gender)}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          DOB:&nbsp;
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
        >
          {moment(data.dob).format("MMM D YYYY")} (Age:&nbsp;
          {calculateAge(data.dob)})
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Home:&nbsp;
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
        >
          {formatPhoneNumber(data.phone_home)}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Mobile:&nbsp;
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
        >
          {formatPhoneNumber(data.phone_cell)}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Provider:&nbsp;
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
        >
          {data.provider}
        </Typography>
      </Grid>

      <Grid container className={classes.inputRow}>
        <Typography
          variant="body1"
          className={classes.text12}
          color="textPrimary"
        >
          Next Appointment:&nbsp;
        </Typography>
        <Typography
          variant="body1"
          className={`${classes.text12} ${classes.value}`}
          color="textPrimary"
        >
          {!!nextAppointment
            ? moment(nextAppointment).format("MMM D YYYY")
            : ""}{" "}
          {!!nextAppointment && `(In ${calculateDateDifference()})`}
        </Typography>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
    flexWrap: "nowrap"
  },
  text12: {
    fontSize: 12
  },
  value: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));
