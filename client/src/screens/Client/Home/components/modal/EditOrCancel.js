import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.warning.main,
    "& h2": {
      color: "#fff",
    },
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
  },
  datePickers: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  startdatePicker: {
    marginRight: theme.spacing(4),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: theme.spacing(3),
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
  },
}));

const EditOrCancel = ({ isOpen, onClose, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [changeTime, handleChangeTime] = useState(false);
  const [startDate, handleStartDateChange] = useState(new Date());
  const [endDate, handleEndDateChange] = useState(new Date());
  const handleDeleteAppointment = () => {};
  console.log("props.event", props.event);

  useEffect(() => {
    handleChangeTime(false);
    handleStartDateChange(props.event.start_dt);
    handleEndDateChange(props.event.end_dt);
  }, [props.event]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {`${props.event.title} - ${moment(props.event.start_dt).format(
            "yyyy-DD-MM"
          )}(${moment(props.event.start_dt).format("HH:mm")} - ${moment(
            props.event.end_dt
          ).format("HH:mm")})`}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            This appointment with <b>{props.event.provider_name}</b> on
            <b>{` ${moment(props.event.start_dt).format(
              "YYYY-MM-DD HH:mm:ss"
            )}`}</b>
            . You can cancel or Edit this appointment.
            {changeTime && (
              <div className={classes.datePickers}>
                <KeyboardDateTimePicker
                  className={classes.startdatePicker}
                  ampm={false}
                  clearable
                  id="date-picker-inline"
                  label="Start"
                  value={startDate}
                  placeholder="2020/10/10 10:00"
                  onChange={(date) => handleStartDateChange(date)}
                  minDate={new Date()}
                  onError={console.log}
                  disablePast
                  format="yyyy/MM/dd HH:mm"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDateTimePicker
                  clearable
                  variant="outlined"
                  id="date-picker-inline"
                  label="End"
                  value={endDate}
                  placeholder="2020/10/10 11:00"
                  onChange={(date) => handleEndDateChange(date)}
                  minDate={new Date()}
                  onError={console.log}
                  disablePast
                  format="yyyy/MM/dd HH:mm"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </div>
            )}
            {!changeTime && (
              <div className={classes.buttonContainer}>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleChangeTime(true)}
                >
                  Change time
                </Button>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button onClick={() => onClose("no")} color="primary">
            Close
          </Button>
          {!!changeTime && (
            <Button
              onClick={() => handleDeleteAppointment()}
              color="primary"
              autoFocus
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditOrCancel;
