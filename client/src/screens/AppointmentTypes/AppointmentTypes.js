import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Appointments } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  uploadButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "450px",
    marginBottom: theme.spacing(2),
    "& h1": {
      [theme.breakpoints.up("md")]: {
        marginRight: theme.spacing(4),
      },
    },
  },
  appointmentLists: {},
}));

export default function AppointmentTypes() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        <div className={classes.uploadButtons}>
          <Typography component="h1" variant="h2" color="textPrimary">
            Appointment Types
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            onClick={() => alert("TODO:: Need to implement this feature.")}
          >
            New
          </Button>
        </div>
        <Typography component="p" variant="p" color="textPrimary">
          This page is used to manage appoinment types
        </Typography>
        <Appointments />
      </Container>
    </React.Fragment>
  );
}
