import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  mergeItems: {
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    maxWidth: "100px",
  },
}));

export default function MergePatient() {
  const classes = useStyles();
  const [patientIdKeep, setPatientIdKeep] = useState("");
  const [patientIdDelete, setPatientIdDelete] = useState("");
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Merge Patient
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is used to merge patient account together
      </Typography>
      <div className={classes.mergeItems}>
        <TextField
          value={patientIdKeep}
          variant="outlined"
          margin="normal"
          id="patientId"
          label="Patient Id to keep"
          name="patientId"
          autoComplete="patientId"
          autoFocus
          onChange={(event) => setPatientIdKeep(event.target.value)}
          size="small"
        />
        <TextField
          value={patientIdDelete}
          variant="outlined"
          margin="normal"
          id="patientIdDelete"
          label="Patient Id to Delete"
          name="patientIdDelete"
          autoComplete="patientIdDelete"
          onChange={(event) => setPatientIdDelete(event.target.value)}
          size="small"
        />

        <Button
          disabled={!patientIdKeep || !patientIdDelete}
          variant="contained"
          color="primary"
          className={classes.submit}
          // onClick={(event) => onFormSubmit(event, login)}
          size="small"
        >
          Merge
        </Button>
      </div>
    </div>
  );
}
