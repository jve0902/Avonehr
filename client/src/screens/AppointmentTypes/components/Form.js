import React, { useEffect, useCallback, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 10px",
  },
  title: {
    marginBottom: theme.spacing(1),
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
  actions: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Form() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentNamePortal, setAppointmentNamePortal] = useState("");
  const [minutes, setMinutes] = useState("");
  const [allow_patients_schedule, setAllow_patients_schedule] = useState(false);
  const [sort_order, setSort_order] = useState("");
  const [active, setActive] = useState(false);
  const [note, setNote] = useState("");

  const initFetch = useCallback(() => {}, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className={classes.root}>
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
          checked={allow_patients_schedule}
          onChange={() => setAllow_patients_schedule(!allow_patients_schedule)}
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
          onBlur={"handleBlur"}
        />
      </FormControl>
    </div>
  );
}
