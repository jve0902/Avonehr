import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
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
  const handleDeleteAppointment = () => {};
  console.log("props.event", props.event);

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
            <div className={classes.buttonContainer}>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button variant="outlined" color="primary">
                Change time
              </Button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button onClick={() => onClose("no")} color="primary">
            Close
          </Button>
          {/*  <Button
            onClick={() => handleDeleteAppointment()}
            color="primary"
            autoFocus
          >
            Yes
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditOrCancel;
