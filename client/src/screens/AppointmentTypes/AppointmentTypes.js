import React, { useState, useEffect } from "react";
import _ from "lodash";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Appointments } from "./components";
import NewAppointmentModal from "./components/modal/NewAppointment";
import EditAppointmentModal from "./components/modal/EditAppointment";
import DeleteAppointmentModal from "./components/modal/DeleteAppointment";
import AppointmentService from "./../../services/appointmentType.service";
import { AuthConsumer } from "./../../providers/AuthProvider";

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
}));

export default function AppointmentTypes(props) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [selectedappointment, setSelectedAppointments] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointmentTypes = () => {
    AppointmentService.getAll().then((res) => {
      setAppointments(res.data);
    });
  };

  useEffect(() => {
    fetchAppointmentTypes();
  }, []);

  const handleEditButtonClick = (id) => {
    setIsEditModalOpen(true);
    const appointmentById = appointments.filter(
      (appointment) => appointment.id === id
    );
    appointmentById && setSelectedAppointments(_.head(appointmentById));
  };

  const handleDeleteButton = (id) => {
    setIsDeleteModalOpen(true);
    setSelectedAppointmentId(id);
  };

  const handleClose = () => {
    setIsOpen(false);
    fetchAppointmentTypes();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    fetchAppointmentTypes();
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    fetchAppointmentTypes();
  };

  return (
    <AuthConsumer>
      {({ user }) => (
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
            <Appointments
              appointments={appointments}
              onEdit={handleEditButtonClick}
              onDelete={handleDeleteButton}
            />
            <NewAppointmentModal
              isOpen={isOpen}
              onClose={handleClose}
              user={user}
            />
            <EditAppointmentModal
              appointment={selectedappointment}
              isOpen={isEditModalOpen}
              onClose={() => handleEditModalClose(false)}
              user={user}
            />
            <DeleteAppointmentModal
              id={selectedAppointmentId}
              isOpen={isDeleteModalOpen}
              onClose={() => handleDeleteModalClose(false)}
            />
          </Container>
        </React.Fragment>
      )}
    </AuthConsumer>
  );
}
