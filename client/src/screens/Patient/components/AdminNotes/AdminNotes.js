import React, { useEffect, useState } from "react";
import { TextField, IconButton, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PatientService from "./../../../../services/patient.service";
import { setError, setSuccess } from "./../../../../store/common/actions";
import { useDispatch } from "react-redux";

import SaveIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

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
  };

  useEffect(() => {
    setOldAdminNote(props.oldAdminNote);
    let fieldName = "notes";
    setFormFields({
      ...formFields,
      [fieldName]: props.oldAdminNote,
    });
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
      {/* <Typography variant="h3" color="textSecondary">
        Edit Notes
      </Typography> */}
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
              rows={3}
            />
        </Grid>

        <Grid
          className={classes.actionContainer}
          container
          justify="space-between"
        >
          <IconButton variant="outlined" type="submit" size="small">
            <SaveIcon />
          </IconButton>
          <IconButton variant="outlined" onClick={() => onClose()} size="small">
            <CancelIcon />
          </IconButton>
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
  },
  actionContainer: {
    marginTop: theme.spacing(1),
  },
}));

export default AdminNotes;
