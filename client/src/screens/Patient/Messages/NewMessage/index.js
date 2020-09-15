import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const NewMessage = (props) => {
  const classes = useStyles();
  const { onClose } = props;

  const [formFields, setFormFields] = useState({
    subject: '',
    message: '',
  })

  const handleInputChnage = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  return (
    <>
      <Typography variant="h3" color="textSecondary">Send a Secure Message</Typography>
      <form>
        <Grid className={classes.inputRow}>
          <Grid className={classes.formInput} item md={4}>
            <TextField
              variant="standard"
              name="subject"
              id="subject"
              label="Subject"
              type={"text"}
              fullWidth
              onChange={(e) => handleInputChnage(e)}
            />
          </Grid>
          <Grid item lg={2}>
            <Typography gutterBottom variant="body1" color="textPrimary">Message</Typography>
          </Grid>
          <Grid className={classes.formInput} item md={12}>
            <TextField
              variant="outlined"
              name="message"
              id="message"
              type="text"
              fullWidth
              onChange={(e) => handleInputChnage(e)}
              multiline={true}
              rows={5}
            />
          </Grid>
        </Grid>

        <Typography variant="h5" color="textSecondary" gutterBottom>Notify me if not read by Jan 1, 2020.</Typography>

        <Grid className={classes.actionContainer} container justify="space-between">
          <Button variant="outlined" onClick={() => onClose()}>Save</Button>
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

