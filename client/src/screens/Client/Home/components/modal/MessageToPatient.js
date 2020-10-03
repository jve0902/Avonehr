import React, { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { KeyboardDatePicker } from "@material-ui/pickers";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Messages from "./../../../../../services/message-to-patient.service";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1 / 2),
    top: theme.spacing(1 / 2),
    color: "#ffffff",
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
    minWidth: "600px",
  },
  subject: {
    width: "280px",
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
  modalConentBelow: { opacity: "1" },
  contentWithLoading: {
    opacity: "0.5",
  },
  patientListContent: {
    padding: 0,
    "&:last-child": {
      padding: 0,
    },
  },
  NotifyInfo: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
  datePicker: {
    lineHeight: "21px",
    border: "none !important",
    "& > div": {
      "&:before": {
        display: "none",
      },
    },

    "& input": {
      display: "none",
    },
    "& button": {
      paddingBottom: 0,
    },
  },
  ListOfButtons: {
    display: "flex",
    alignItems: "baseline",
    marginTop: "-4px",
    "& button": {
      padding: "5px",
      fontSize: "11px",
      minWidth: "48px",
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

const MessageToPatient = ({
  isOpen,
  onClose,
  isLoading,
  isNewMessage,
  onSubmit,
  ...props
}) => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isNewMessage) {
      setMessage("");
    } else {
      setMessage(props.msg);
    }
  }, [isNewMessage, props.msg]);

  const handleOnChange = (event) => {
    setMessage({
      ...message,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      onEnter={props.onModalEnter}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        {isNewMessage ? `New Message` : "Edit Message"}
        {onClose ? (
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className={classes.content}>
        {isLoading && (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
        <div
          className={clsx({
            [classes.modalConentBelow]: true, //always apply
            [classes.contentWithLoading]: isLoading, //only when isLoading === true
          })}
        >
          <DialogContentText id="alert-dialog-description">
            Send a secure message
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
                value={message.subject}
                className={classes.subject}
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                id="subject"
                label="Subject"
                name="subject"
                autoComplete="subject"
                autoFocus
                onChange={(event) => handleOnChange(event)}
              />
            </FormControl>
            <Typography component="p" variant="body2" color="textPrimary">
              Message
            </Typography>
            <TextareaAutosize
              className={classes.textArea}
              aria-label="minimum height"
              placeholder="Message..."
              name="message"
              value={message.message}
              onChange={(event) => handleOnChange(event)}
            />
          </div>
          <div className={classes.NotifyInfo}>
            <Typography component="p" variant="body2" color="textPrimary">
              Notify me if not read by:{" "}
              <b>
                {(message.unread_notify_dt &&
                  moment(message.unread_notify_dt).format("ll")) ||
                  null}
              </b>
            </Typography>
            <KeyboardDatePicker
              className={classes.datePicker}
              clearable
              variant="outlined"
              id="start-date-picker-inline"
              value={message.unread_notify_dt || null}
              placeholder="2020/10/10"
              name="unread_notify_dt"
              onError={console.log}
              format="MM/dd/yyyy"
              onChange={(date) =>
                setMessage({
                  ...message,
                  unread_notify_dt: date,
                })
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <div className={classes.ListOfButtons}>
              <Button
                onClick={() =>
                  setMessage({
                    ...message,
                    ["unread_notify_dt"]: null,
                  })
                }
              >
                clear
              </Button>
              <Button
                onClick={() =>
                  setMessage({
                    ...message,
                    ["unread_notify_dt"]: moment().add(7, "days"),
                  })
                }
              >
                1 week
              </Button>
              <Button
                onClick={() =>
                  setMessage({
                    ...message,
                    ["unread_notify_dt"]: moment().add(14, "days"),
                  })
                }
              >
                2 weeks
              </Button>
              <Button
                onClick={() =>
                  setMessage({
                    ...message,
                    ["unread_notify_dt"]: moment().add(21, "days"),
                  })
                }
              >
                3 weeks
              </Button>
              <Button
                onClick={() =>
                  setMessage({
                    ...message,
                    ["unread_notify_dt"]: moment().add(28, "days"),
                  })
                }
              >
                4 weeks
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className={classes.modalAction}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={(_) => onSubmit(_, message, isNewMessage)}
        >
          {isNewMessage ? "Save" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageToPatient;
