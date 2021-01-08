import React, { useEffect, useState } from "react";

import { colors } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import useAuth from "../../../../../../hooks/useAuth";
import AppointmentService from "../../../../../../services/appointmentType.service";
import { removeEmpty } from "../../../../../../utils/helpers";


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
    // width: "230px",
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
  formFieldLarge: {
    maxWidth: "270px",
    flex: 1,
    width: "300px",
  },
  formFieldSmall: {
    maxWidth: "100px",
    flex: 1,
  },
  textArea: {
    marginTop: "12px",
  },
}));

const NewOrEditAppointment = ({
  isOpen,
  onClose,
  isNewAppointment,
  ...props
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { savedAppointments } = props;
  const [appointment, setAppointment] = useState([]);
  const [errors, setErrors] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  useEffect(() => {
    const appt = {
      ...props.appointment,
      length: 20,
      sort_order: 1,
      allow_patients_schedule: true,
      active: true,
      note: props.appointment.note || "",
    };
    setAppointment(appt);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.appointment]);

  const createNewAppointment = (data) => {
    AppointmentService.create(data).then(
      (response) => {
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        onClose();
      },
      (error) => {
        setErrors(error.response.data.error);
      },
    );
  };

  const handleFormSubmission = () => {
    // Duplicate Name
    const duplicateName = savedAppointments
      .map((x) => appointment.appointment_name_portal.includes(x.appointment_name_portal))
      .includes(true);
    // Duplicate Type
    const duplicateType = savedAppointments
      .map((x) => appointment.appointment_type.includes(x.appointment_type))
      .includes(true);
    // Validation Start Here
    if (duplicateName || duplicateType) {
      if (duplicateName && duplicateType) {
        setNameError(true);
        setTypeError(true);
      } else if (duplicateName) {
        setNameError(true);
        setTypeError(false);
      } else {
        setTypeError(true);
        setNameError(false);
      }
    } else {
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
      } else {
        delete formedData.data.created_user_id;

        AppointmentService.update(
          formedData,
          props.appointment.id,
        ).then((response) => {
          enqueueSnackbar(`${response.data.message}`, {
            variant: "success",
          });
          onClose();
        });
      }
    }
  };

  const handleOnChange = (event) => {
    setAppointment({
      ...appointment,
      [event.target.name]: event.target.value.trim(),
    });
  };

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
          {errors
            && errors.map((error, index) => (
               // eslint-disable-next-line react/no-array-index-key
              <Alert severity="error" key={index}>
                {error.msg}
              </Alert>
            ))}
          <div className={classes.root}>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                autoFocus
                className={classes.formFieldLarge}
                variant="outlined"
                label="Appointment Type"
                margin="normal"
                fullWidth
                name="appointment_type"
                id="appointment_type"
                autoComplete="appointment_type"
                onChange={(event) => handleOnChange(event)}
                value={appointment.appointment_type}
                size="small"
                error={typeError}
                helperText={typeError ? "You entered a duplicate type" : ""}
              />
              <p className={classes.formHelperText}>
                The name of the appointment type
              </p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.formFieldLarge}
                variant="outlined"
                label="Portal Name"
                margin="normal"
                fullWidth
                name="appointment_name_portal"
                id="appointment_name_portal"
                autoComplete="appointment_name_portal"
                onChange={(event) => handleOnChange(event)}
                value={appointment.appointment_name_portal}
                size="small"
                error={nameError}
                helperText={nameError ? "You entered a duplicate name" : ""}
              />
              <p className={classes.formHelperText}>
                The name shown in the patient portal
              </p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.formFieldSmall}
                variant="outlined"
                label="Minutes"
                margin="normal"
                name="length"
                id="length"
                type="number"
                autoComplete="length"
                onChange={(event) => handleOnChange(event)}
                value={appointment.length}
                size="small"
              />
              <p className={classes.formHelperText}>
                Number of minutes for the appointment
              </p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <Switch
                size="small"
                checked={appointment.allow_patients_schedule}
                onChange={(event) => setAppointment({
                  ...appointment,
                  [event.target.name]: !appointment.allow_patients_schedule,
                })}
                name="allow_patients_schedule"
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <p className={classes.formHelperText}>
                Allow patient to select this in the patient portal
              </p>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.formFieldSmall}
                variant="outlined"
                label="Sort Order"
                margin="normal"
                name="sort_order"
                id="sort_order"
                autoComplete="sort_order"
                onChange={(event) => handleOnChange(event)}
                value={appointment.sort_order}
                size="small"
                type="number"
              />
              <p className={classes.formHelperText}>
                The order in which this is shown
              </p>
            </FormControl>

            <FormControl component="div" className={classes.formControl}>
              <Switch
                size="small"
                checked={appointment.active}
                onChange={(event) => setAppointment({
                  ...appointment,
                  [event.target.name]: !appointment.active,
                })}
                name="active"
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <p className={classes.formHelperText}>
                Status can be active or inactive
              </p>
            </FormControl>
            <FormControl
              component="div"
              className={`${classes.formControl} ${classes.textArea}`}
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Note"
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

NewOrEditAppointment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isNewAppointment: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.number,
      appointment_type: PropTypes.string,
      appointment_name_portal: PropTypes.string,
      length: PropTypes.number,
      sort_order: PropTypes.number,
      allow_patients_schedule: PropTypes.number,
      note: PropTypes.string,
    }),
  ]).isRequired,
  savedAppointments: PropTypes.arrayOf(
    PropTypes.shape({
      appointment_name_portal: PropTypes.string,
      appointment_type: PropTypes.string,
    }),
  ).isRequired,
};

export default NewOrEditAppointment;
