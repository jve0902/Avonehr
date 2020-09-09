import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '40px 0px',
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  submit: {
    maxWidth: '100px',
  },
}));

export default function PatientSearch() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Patient Search
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is to search for patients
      </Typography>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={firstName}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="firstName"
                  label="First Name"
                  type="firstName"
                  id="firstName"
                  autoComplete="firstName"
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={lastName}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  type="lastName"
                  id="lastName"
                  autoComplete="lastName"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={phone}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="phone"
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={email}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={patientId}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="patientId"
                  label="Patient Id"
                  type="patientId"
                  id="patientId"
                  autoComplete="patientId"
                  onChange={(event) => setPatientId(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={status}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="status"
                  label="Status"
                  type="status"
                  id="status"
                  autoComplete="status"
                  onChange={(event) => setStatus(event.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Button
        // disabled={!email || !password}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        // onClick={(event) => onFormSubmit(event, login)}
      >
        Search
      </Button>
    </div>
  );
}
