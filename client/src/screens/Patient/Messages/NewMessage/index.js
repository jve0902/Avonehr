import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PatientService from "../../../../services/patient.service";
import { setError, setSuccess } from "../../../../store/common/actions";
import { useDispatch } from "react-redux";

const NewMessage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onClose, reloadData } = props;

  const [formFields, setFormFields] = useState({
    subject: '',
    message: '',
  })

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  const onMessageSend = (e) => {
    e.preventDefault();
    const reqBody = {
      "data": {
        "message": formFields.message,
        "subject": formFields.subject,
        "unread_notify_dt": "2020-10-10"
      }
    }
    PatientService.createMessage(reqBody)
    .then((response) => {
      dispatch(setSuccess(`${response.data.message}`));
      reloadData();
      onClose();
    })
    .catch((error) => {
      const resMessage = (error.response && error.response.data &&
          error.response.data.message) || error.message || error.toString();
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
      <Typography variant="h3" color="textSecondary">Send a Secure Message</Typography>
      <form onSubmit={onMessageSend}>
        <Grid className={classes.inputRow}>
          <Grid className={classes.formInput} item md={4}>
            <TextField
              required
              variant="standard"
              name="subject"
              id="subject"
              label="Subject"
              type={"text"}
              fullWidth
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item lg={2}>
            <Typography gutterBottom variant="body1" color="textPrimary">Message</Typography>
          </Grid>
          <Grid className={classes.formInput} item md={12}>
            <TextField
              required
              variant="outlined"
              name="message"
              id="message"
              type="text"
              fullWidth
              onChange={(e) => handleInputChange(e)}
              multiline={true}
              rows={5}
            />
          </Grid>
        </Grid>

        <Typography variant="h5" color="textSecondary" gutterBottom>Notify me if not read by Jan 1, 2020.</Typography>

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


export default NewMessage;

