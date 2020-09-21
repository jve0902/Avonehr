import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchPatient from "../../../../services/patientSearch.service";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PatientSearchResults from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  submit: {
    maxWidth: "200px",
    marginTop: "15px",
  },
  paper: {
    maxWidth: "900px",
  },
  textField: {
    width: "200px",
  },
  customSelect: {
    width: "200px",
    marginTop: "16px",
  },
}));

export default function PatientSearch() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [patientId, setPatientId] = useState("");
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdTo, setCreatedTo] = useState("");
  const [appointmentFrom, setAppointmentFrom] = useState("");
  const [appointmentTO, setAppointmentTO] = useState("");
  const [paymentFrom, setPaymentFrom] = useState("");
  const [paymnetTo, setPaymnetTo] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [selectStatus, setSelectedStatus] = useState("");

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const serchPatients = (e) => {
    e.preventDefault();

    const payload = {
      data: {
        text: "patient",
      },
    };
    SearchPatient.search(payload).then((res) => {
      setSearchResults(res.data.data);
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Grid container direction="column">
          <form onSubmit={(e) => serchPatients(e)}>
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
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={firstName}
                    variant="outlined"
                    margin="normal"
                    autoFocus
                    name="firstName"
                    label="First Name"
                    type="firstName"
                    id="firstName"
                    autoComplete="firstName"
                    size="small"
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={lastName}
                    variant="outlined"
                    margin="normal"
                    size="small"
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
                    className={classes.textField}
                    value={createdFrom}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    name="createdFrom"
                    label="Created From"
                    id="createdFrom"
                    autoComplete="createdFrom"
                    onChange={(event) => setCreatedFrom(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={createdTo}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    name="createdTo"
                    label="Created To"
                    id="createdTo"
                    autoComplete="createdTo"
                    onChange={(event) => setCreatedTo(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={phone}
                    variant="outlined"
                    margin="normal"
                    name="phone"
                    label="Phone"
                    size="small"
                    type="phone"
                    id="phone"
                    autoComplete="phone"
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={email}
                    variant="outlined"
                    margin="normal"
                    name="email"
                    size="small"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={appointmentFrom}
                    variant="outlined"
                    margin="normal"
                    name="appointmentFrom"
                    size="small"
                    label="Appointment From"
                    id="appointmentFrom"
                    autoComplete="appointmentFrom"
                    onChange={(event) => setAppointmentFrom(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={appointmentTO}
                    variant="outlined"
                    margin="normal"
                    name="appointmentTO"
                    size="small"
                    label="Appointment To"
                    id="appointmentTO"
                    autoComplete="appointmentTO"
                    onChange={(event) => setAppointmentTO(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={patientId}
                    variant="outlined"
                    margin="normal"
                    name="patientId"
                    size="small"
                    label="Patient Id"
                    type="patientId"
                    id="patientId"
                    autoComplete="patientId"
                    onChange={(event) => setPatientId(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Select
                    size="small"
                    variant="outlined"
                    className={classes.customSelect}
                    displayEmpty
                    value={selectStatus}
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Status
                    </MenuItem>

                    <MenuItem value={10}>Active</MenuItem>
                    <MenuItem value={20}>Inactive</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    size="small"
                    className={classes.textField}
                    value={paymentFrom}
                    variant="outlined"
                    margin="normal"
                    name="paymentFrom"
                    label="Payment From"
                    id="paymentFrom"
                    autoComplete="paymentFrom"
                    onChange={(event) => setPaymentFrom(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    size="small"
                    className={classes.textField}
                    value={paymnetTo}
                    variant="outlined"
                    margin="normal"
                    name="paymnetTo"
                    label="Paymnet To"
                    type="paymnetTo"
                    id="paymnetTo"
                    autoComplete="paymnetTo"
                    onChange={(event) => setPaymnetTo(event.target.value)}
                  />
                </Grid>
              </Grid>
            </div>
            <Grid item xs={12} sm={3}>
              <Button
                size="small"
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
              >
                Search
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
      <div className={classes.serachResults}>
        {searchResults.length > 0 && (
          <PatientSearchResults result={searchResults} />
        )}
      </div>
    </div>
  );
}
