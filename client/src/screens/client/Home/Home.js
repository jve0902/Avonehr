import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Calendar } from "./components";
import Appointments from "./../../../services/appointments.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [events, setEvents] = useState([
    { title: "event 1", date: "2020-08-01" },
    { title: "event 2", date: "2020-08-02" },
  ]);

  const getMapFromArray = (data) =>
    data.reduce((acc, item) => {
      acc = { ...item, start: item.start_dt, end: item.end_dt };
      return acc;
    }, []);

  const fetchAppointments = () => {
    Appointments.getAll().then((res) => {
      const eventsFromAPI = res.data && getMapFromArray(res.data);
      setEvents([...events, eventsFromAPI]);
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h2" color="textPrimary">
        Home
      </Typography>
      <Grid container spacing={8}>
        <Grid item md={8} xs={12}>
          <Calendar events={events} />
        </Grid>
        <Grid item md={4} xs={12}></Grid>
      </Grid>
    </div>
  );
}
