import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PatientService from "../../../services/patient.service";
import { setError, setSuccess } from "../../../store/common/actions";
import { useDispatch } from "react-redux";

const AdminNotes = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { onClose } = props;

  const [formFields, setFormFields] = useState({
    notes: '',
  })

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      "data": {
        "admin_note": formFields.notes,
        "old_admin_note": "Always late update"
      }
    }
    PatientService.updateAdminNotes(reqBody, 1)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        onClose();
      })
      .catch((error) => {
        const resMessage = (error.response && error.response.data &&
            error.response.data.message[0].msg) || error.message || error.toString();
        let severity = "error";
        dispatch(
          setError({
            severity: severity,
            message: resMessage,
          })
        );
      })
  }

  return (
    <>
      <Typography variant="h3" color="textSecondary">Edit Notes</Typography>
      <form onSubmit={onFormSubmit}>
        <Grid className={classes.inputRow}>
          <Grid item lg={2}>
            <Typography gutterBottom variant="body1" color="textPrimary">Notes</Typography>
          </Grid>
          <Grid className={classes.formInput} item md={12}>
            <TextField
              variant="outlined"
              name="notes"
              id="notes"
              type="text"
              fullWidth
              onChange={(e) => handleInputChange(e)}
              multiline={true}
              rows={5}
            />
          </Grid>
        </Grid>

        <Grid className={classes.actionContainer} container justify="space-between">
          <Button variant="outlined" type="submit">Save</Button>
          <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
        </Grid>
      </form>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  formInput: {
    marginBottom: theme.spacing(4)
  },
  actionContainer: {
    marginTop: theme.spacing(4)
  }
})
)


export default AdminNotes;

