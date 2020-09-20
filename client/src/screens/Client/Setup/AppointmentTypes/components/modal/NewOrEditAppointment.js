import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import Alert from "@material-ui/lab/Alert";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSuccess } from "./../../../../../../store/common/actions";
import { removeEmpty } from "./../../../../../../utils/helpers";
import AppointmentService from "./../../../../../../services/appointmentType.service";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 120,
    },
  },
  formLabel: {
    fontSize: "14px",
    fontWeight: "600",
    width: "220px",
  },
  formHelperText: {
    width: "220px",
    fontSize: "12px",
    paddingLeft: "16px",
  },
  formField: {
    flex: 1,
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const NewOrEditAppointment = ({
  isOpen,
  onClose,
  user,
  isNewAppointment,
  ...props
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [appointment, setAppointment] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const appt = {
      ...props.appointment,
      length: 20,
      sort_order: 1,
      allow_patients_schedule: true,
      active: true,
    };

    setAppointment(appt);
  }, [props.appointment]);

  const handleFormSubmission = () => {
    const formedData = {
      data: removeEmpty({
        appointment_type: appointment.appointment_type,
        appointment_name_portal: appointment.appointment_name_portal,
        length: appointment.length,
        allow_patients_schedule: appointment.allow_patients_schedule ? 1 : 0,
        sort_order: appointment.sort_order,
        note: appointment.note,
        active: appointment.active ? 1 : 0,
        created_user_id: user.id,
        client_id: user.client_id,
      }),
    };
    if (isNewAppointment) {
      createNewAppointment(formedData);
      console.log("new");
    } else {
      delete formedData.data.created_user_id;
      console.log("Update");

      AppointmentService.update(formedData, user.id, props.appointment.id).then(
        (response) => {
          dispatch(setSuccess(`${response.data.message}`));
          onClose();
        }
      );
    }
  };

  const createNewAppointment = (data) => {
    AppointmentService.create(data).then(
      (response) => {
        dispatch(setSuccess(`${response.data.message}`));
        onClose();
      },
      (error) => {
        setErrors(error.response.data.error);
      }
    );
  };

  const handleOnChange = (event) => {
    setAppointment({
      ...appointment,
      [event.target.name]: event.target.value.trim(),
    });
  };
  console.log("appointment", appointment);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {isNewAppointment ? "New Appointment Type" : "Edit Appointment Type"}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            {isNewAppointment
              ? "This page is used to create a new appointment type"
              : "This page is used to update an appointment type"}
          </DialogContentText>
          {errors &&
            errors.map((error, index) => (
              <Alert severity="error" key={index}>
                {error.msg}
              </Alert>
            ))}
          <div className={classes.root}>
            <FormControl component="div" className={classes.formControl}>
              <FormLabel component="p" className={classes.formLabel}>
                Appointment Type
              </FormLabel>
              <TextField
                autoFocus
                className={classes.formField}
                variant="outlined"
                margin="dense"
                fullWidth
                name="appointment_type"
                id="appointment_type"
                autoComplete="appointment_type"
                onChange={(event) => handleOnChange(event)}
                value={appointment.appointment_type}
              />
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <FormLabel component="p" className={classes.formLabel}>
                Appointment Name Portal
              </FormLabel>
              <TextField
                className={classes.formField}
                variant="outlined"
                margin="dense"
                fullWidth
                name="appointment_name_portal"
                id="appointment_name_portal"
                autoComplete="appointment_name_portal"
                onChange={(event) => handleOnChange(event)}
                value={appointment.appointment_name_portal}
              />
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <FormLabel component="p" className={classes.formLabel}>
                Minutes
              </FormLabel>
              <TextField
                className={classes.formField}
                variant="outlined"
                margin="dense"
                name="length"
                id="length"
                autoComplete="length"
                onChange={(event) => handleOnChange(event)}
                value={appointment.length}
              />
              <p className={classes.formHelperText}>
                Number of minutes for the appointment
              </p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <FormLabel component="p" className={classes.formLabel}>
                Allow Patient Schedule
              </FormLabel>
              <Switch
                checked={appointment.allow_patients_schedule}
                onChange={(event) =>
                  setAppointment({
                    ...appointment,
                    [event.target.name]: !appointment.allow_patients_schedule,
                  })
                }
                name="allow_patients_schedule"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <p className={classes.formHelperText}>
                Allow patient to select this in the patient portal
              </p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <FormLabel component="p" className={classes.formLabel}>
                Sort Order
              </FormLabel>
              <TextField
                className={classes.formField}
                variant="outlined"
                margin="dense"
                name="sort_order"
                id="sort_order"
                autoComplete="sort_order"
                onChange={(event) => handleOnChange(event)}
                value={appointment.sort_order}
              />
              <p className={classes.formHelperText}></p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <FormLabel component="p" className={classes.formLabel}>
                Status
              </FormLabel>
              <Switch
                checked={appointment.active}
                onChange={(event) =>
                  setAppointment({
                    ...appointment,
                    [event.target.name]: !appointment.active,
                  })
                }
                name="active"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <p className={classes.formHelperText}></p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <FormLabel component="p" className={classes.formLabel}>
                Note
              </FormLabel>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                name="note"
                InputProps={{
                  classes: classes.normalOutline,
                  inputComponent: TextareaAutosize,
                  rows: 8,
                }}
                value={appointment.note}
                onChange={(event) => handleOnChange(event)}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onClose()}
            style={{
              borderColor: colors.orange[600],
              color: colors.orange[600],
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleFormSubmission()}
          >
            {isNewAppointment ? "Save" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewOrEditAppointment;
