import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PatientService from "../../../services/patient.service";
import { setError, setSuccess } from "../../../store/common/actions";
import { setEditorText, resetEditorText } from "../../../store/patient/actions";
import { useDispatch } from "react-redux";

const MedicalNotes = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onClose, reloadData, patientId } = props;
  const [oldMedicalNote, setOldMedicalNote] = useState("");
  const [medicalNote, setMedicalNote] = useState("");

  useEffect(() => {
    setOldMedicalNote(props.oldMedicalNote);
    setMedicalNote(props.oldMedicalNote);
  }, [props.oldMedicalNote]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    // TODO:: static for the time being - discussion required
    let noteId = 1;
    const reqBody = {
      data: {
        old_medical_note: oldMedicalNote,
        medical_note: medicalNote,
      },
    };
    PatientService.updateMedicalNotes(patientId, reqBody, noteId)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        reloadData();
        onClose();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        let severity = "error";
        dispatch(
          setError({
            severity: severity,
            message: resMessage,
          })
        );
      });
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
          <Grid className={classes.formInput} item md={12}>
            <TextField
              required
              value={medicalNote}
              variant="outlined"
              name="medicalNote"
              id="medicalNote"
              type="text"
              fullWidth
              onChange={(e) => {
                dispatch(setEditorText(e.target.value));
                setMedicalNote(e.target.value)
              }}
              multiline={true}
              rows={8}
              autoFocus={true}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                   !!onClose && onClose();
                   dispatch(resetEditorText());
                }
             }}
            />
          </Grid>
      </form>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  formInput: {
    marginBottom: theme.spacing(1),
    
    "& .MuiOutlinedInput-multiline": {
      padding: 5,
      fontSize: 12
    }
  },
  actionContainer: {
    marginTop: theme.spacing(1),
  },
}));

export default MedicalNotes;
