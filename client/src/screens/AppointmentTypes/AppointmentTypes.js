import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Appointments } from "./components";
import NewAppointmentModal from "./components/modal/NewAppointment";
import * as API from "./../../utils/API";

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
  const [isOpen, setIsOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    API.fetchAppointmentTypes().then((res) => {
      setAppointments(res.data);
    });
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

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
            onClick={() => setIsOpen(true)}
          >
            New
          </Button>
        </div>
        <Typography component="p" variant="body2" color="textPrimary">
          This page is used to manage appoinment types
        </Typography>
        <Appointments appointments={appointments} />
        <NewAppointmentModal isOpen={isOpen} onClose={handleClose} />
      </Container>
    </React.Fragment>
  );
}
