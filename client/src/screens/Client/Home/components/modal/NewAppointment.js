import React, { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Switch from "@material-ui/core/Switch";
import Alert from "@material-ui/lab/Alert";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Select from "@material-ui/core/Select";
import { KeyboardDatePicker } from "@material-ui/pickers";
import useDebounce from "./../../../../../hooks/useDebounce";
import * as API from "./../../../../../utils/API";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
  },
  formControl: {
    width: "100%",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 220,
    },
  },
  datePickers: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  startdatePicker: {
    marginRight: theme.spacing(4),
  },
  statuses: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  statusList: {
    flexDirection: "row",
  },
  textArea: {
    height: "100px !important",
    width: "100%",
    padding: "5px",
  },
  patientListCard: {
    position: "absolute",
    width: "100%",
    top: "54px",
  },
  patientListContent: {
    padding: 0,
    "&:last-child": {
      padding: 0,
    },
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
const NewAppointment = ({
  isOpen,
  onClose,
  selectedDate,
  user,
  isNewAppointment,
  ...props
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { providers } = props;
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [startDate, handleStartDateChange] = useState(selectedDate);
  const [endDate, handleEndDateChange] = useState(new Date(selectedDate));
  const [status, setStatus] = React.useState("female");
  const [provider, setProvider] = React.useState("");
  const [patients, setPatients] = React.useState([]);
  const [selectedPatient, setSelectedPatient] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [patientSearchTerm, setPatientSearchTerm] = useState("");

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const debouncedSearchTerm = useDebounce(patientSearchTerm, 500);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        // Fire off our API call
        API.search(debouncedSearchTerm).then(
          (response) => {
            const { data } = response;
            setPatients(data);
          },
          (error) => {
            console.log("search error", error);
          }
        );
      } else {
        setPatients([]);
        setSelectedPatient("");
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );

  const handlePatientChange = (_, patient) => {
    const sp = patients.filter((p) => p.id === patient.id);
    setSelectedPatient(sp[0]);
    setPatientSearchTerm(`${patient.firstname} ${patient.lastname}`);
  };
  const handleProviderChange = (event) => {
    const p = providers.filter((p) => p.id === event.target.value);
    setProvider(p[0]);
  };
  console.log("title:", title);
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);
  console.log("status:", status);
  console.log("provider:", provider);
  console.log("patients:", patients);
  console.log("selected patient:", selectedPatient);
  console.log("notes:", notes);
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        New Appointment - {moment(selectedDate).format("YYYY.MM.DD")}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText id="alert-dialog-description">
          This page is used to create a new appointment
        </DialogContentText>
        {errors &&
          errors.map((error, index) => (
            <Alert severity="error" key={index}>
              {error.msg}
            </Alert>
          ))}
        <div className={classes.root}>
          <FormControl component="div" className={classes.formControl}>
            <TextField
              value={title}
              variant="outlined"
              margin="normal"
              size="small"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormControl>
          <div className={classes.datePickers}>
            <KeyboardDatePicker
              className={classes.startdatePicker}
              clearable
              id="date-picker-inline"
              label="Start"
              value={startDate}
              placeholder="10/10/2018"
              onChange={(date) => handleStartDateChange(date)}
              minDate={new Date()}
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              clearable
              variant="outlined"
              id="date-picker-inline"
              label="Start"
              value={endDate}
              placeholder="10/10/2018"
              onChange={(date) => handleEndDateChange(date)}
              minDate={new Date()}
              format="MM/dd/yyyy"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </div>
          <FormControl className={classes.statuses}>
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup
              aria-label="status"
              name="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className={classes.statusList}
            >
              <FormControlLabel
                value="R"
                control={<Radio />}
                label="Requested"
              />
              <FormControlLabel
                value="A"
                control={<Radio />}
                label="Approved"
              />
              <FormControlLabel
                value="D"
                control={<Radio />}
                label="Declined"
              />
            </RadioGroup>
          </FormControl>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}
          >
            <InputLabel id="provider-select-outlined-label">
              Provider
            </InputLabel>
            <Select
              labelId="provider-select-outlined-label"
              id="provider-select-outlined-label"
              value={!!provider && provider.id}
              onChange={handleProviderChange}
              label="Provider"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {providers.map((provider) => (
                <MenuItem value={provider.id}>{provider.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="div" className={classes.formControl}>
            <TextField
              value={patientSearchTerm}
              variant="outlined"
              margin="normal"
              size="small"
              required
              fullWidth
              id="patient"
              label="Patient"
              name="patient"
              autoComplete="patient"
              autoFocus
              onChange={(event) => setPatientSearchTerm(event.target.value)}
            />
            {patients.length > 0 && !selectedPatient && (
              <Card className={classes.patientListCard}>
                <CardContent className={classes.patientListContent}>
                  <List component="nav" aria-label="secondary mailbox folder">
                    {patients.map((patient) => (
                      <ListItem
                        button
                        onClick={(event) => handlePatientChange(event, patient)}
                      >
                        <ListItemText
                          primary={`${patient.firstname} ${patient.lastname}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </FormControl>
          <Typography component="p" variant="body2" color="textPrimary">
            Notes
          </Typography>
          <TextareaAutosize
            className={classes.textArea}
            aria-label="minimum height"
            placeholder="Notes..."
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions className={classes.modalAction}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => onClose()}
          style={{
            borderColor: colors.orange[600],
            color: colors.orange[600],
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => alert("save")}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAppointment;
