import React, { useEffect, useState } from "react";

import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import PatientService from "./../../../../services/patient.service";
import { setError, setSuccess } from "./../../../../store/common/actions";
import { setEditorText, resetEditorText } from "./../../../../store/patient/actions";

const AdminNotes = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { onClose, reloadData, patientId } = props;
  const [oldAdminNote, setOldAdminNote] = useState("");
  const [formFields, setFormFields] = useState({
    notes: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
    dispatch(setEditorText(value));
  };

  useEffect(() => {
    setOldAdminNote(props.oldAdminNote);
    let fieldName = "notes";
    setFormFields({
      ...formFields,
      [fieldName]: props.oldAdminNote,
    });
    dispatch(setEditorText(props.oldAdminNote));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.oldAdminNote]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        admin_note: formFields.notes,
        old_admin_note: oldAdminNote,
      },
    };
    // TODO:: static for the time being - discussion required
    let noteId = 1;
    PatientService.updateAdminNotes(patientId, reqBody, noteId)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        reloadData();
        onClose();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message[0].msg) ||
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
            variant="outlined"
            value={formFields.notes}
            name="notes"
            id="notes"
            type="text"
            fullWidth
            onChange={(e) => handleInputChange(e)}
            multiline={true}
            rows={5}
            autoFocus={true}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                onClose();
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

export default AdminNotes;
