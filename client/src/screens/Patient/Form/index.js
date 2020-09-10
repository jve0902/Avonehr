import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormFields } from "../../../static/expandForm";

const Form = (props) => {
  const classes = useStyles();
  const { onClose } = props;

  const [formFields, setFormFields] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
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
      <Grid container justify="space-between">
        <Typography variant="h3" color="textSecondary" gutterBottom>Register with</Typography>
        <Button variant="outlined" onClick={() => onClose()}>Close</Button>
      </Grid>
      <Typography variant="h4" color="textPrimary" gutterBottom>Basic Information</Typography>
      <form>
        <Grid container spacing={1} className={classes.inputRow}>
          {FormFields.map((item, index) => {
            return (
              <Grid key={index} item md={4}>
                <TextField
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChnage(e)}
                />
              </Grid>
            )
          })
          }
        </Grid>
      </form>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(2, 0),
  },
})
)


export default Form;
