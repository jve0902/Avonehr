import React, { useEffect, useCallback } from "react";

import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 30px",
  },
}));

export default function EditAppointmentTypes() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {}, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <Grid container justify="center" spacing={8}>
      <Grid item md={6} xs={12}>
        <Typography component="h1" variant="h2" color="textPrimary">
          New Appointment Type
        </Typography>
        <Typography component="p" variant="body2" color="textPrimary">
          This page is used to create a new Appointment type for schedulling
          Appointment
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}></Grid>
    </Grid>
  );
}
