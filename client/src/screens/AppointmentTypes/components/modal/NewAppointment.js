import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSuccess } from "./../../../../store/common/actions";
import { removeEmpty } from "../../../../utils/helpers";
import AppointmentService from "./../../../../services/appointmentType.service";

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

const NewAppointmentModal = ({ user, isOpen, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentNamePortal, setAppointmentNamePortal] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [allow_patients_schedule, setAllow_patients_schedule] = useState(true);
  const [sort_order, setSort_order] = useState("");
  const [active, setActive] = useState(true);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState([]);

  const handleFormSubmission = () => {
    const formedData = {
      data: removeEmpty({
        appointment_type: appointmentType,
        appointment_name_portal: appointmentNamePortal,
        length: minutes,
        allow_patients_schedule: allow_patients_schedule ? 1 : null,
        sort_order: sort_order,
        note: note,
        active: active ? 1 : null,
        created_user_id: user.id,
        client_id: user.client_id,
      }),
    };
    AppointmentService.create(formedData).then(
      (response) => {
        dispatch(setSuccess(`${response.data.message}`));
        onClose();
      },
      (error) => {
        setErrors(error.response.data.error);
      }
    );
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
          New Appointment Type
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            This page is used to create a new Appointment type for schedulling
            Appointment
          </DialogContentText>
          {errors &&
            errors.map((error, index) => (
              <Alert severity="error" key={index}>
                {error.msg}
              </Alert>
            ))}
          <FormControl component="div" className={classes.formControl}>
            <FormLabel component="p" className={classes.formLabel}>
              Appointment Type
            </FormLabel>
            <TextField
              className={classes.formField}
              variant="outlined"
              margin="dense"
              fullWidth
              name="appointment_type"
              id="appointment_type"
              autoComplete="appointment_type"
              onChange={(event) => setAppointmentType(event.target.value)}
              value={appointmentType}
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
              onChange={(event) => setAppointmentNamePortal(event.target.value)}
              value={appointmentNamePortal}
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
              name="minutes"
              id="minutes"
              autoComplete="minutes"
              onChange={(event) => setMinutes(event.target.value)}
              value={minutes}
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
              checked={!!allow_patients_schedule}
              onChange={() =>
                setAllow_patients_schedule(!allow_patients_schedule)
              }
              name="allow_patients_schedule"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <p className={classes.formHelperText}>
              Make this an option in the patient portal
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
              onChange={(event) => setSort_order(event.target.value)}
              value={sort_order}
            />
            <p className={classes.formHelperText}></p>
          </FormControl>
          <FormControl component="div" className={classes.formControl}>
            <FormLabel component="p" className={classes.formLabel}>
              Status
            </FormLabel>
            <Switch
              checked={active}
              onChange={() => setActive(!active)}
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
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onClose()}
            style={{
              borderColor: colors.red[600],
              color: colors.red[600],
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleFormSubmission()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewAppointmentModal;
