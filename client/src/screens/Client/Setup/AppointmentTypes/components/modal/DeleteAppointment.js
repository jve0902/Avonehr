import React from "react";

import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { setSuccess } from "./../../../../../../store/common/actions";
import AppointmentService from "./../../../../../../services/appointmentType.service";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.error.light,
    "& h2": {
      color: "#fff"
    }
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px"
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`
  }
}));

const DeleteAppointment = ({ isOpen, onClose, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleDeleteAppointment = () => {
    AppointmentService.deleteById(id).then((response) => {
      dispatch(setSuccess(`${response.data.message}`));
      onClose();
    });
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          Are you sure about deleting this appointment type?
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            Your appointment type will be deleted forever from our system and
            you won't be able to access it anymore.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button onClick={() => onClose("no")} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDeleteAppointment()}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAppointment;
