import React from 'react';
import PropTypes from "prop-types";
import { IconButton, Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import DownloadIcon from '@material-ui/icons/GetApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const DialogForm = ({
  title,
  open,
  message,
  applyForm,
  cancelForm,
  hideActions,
  backAction,
  continueNext,
  applyButtonText,
  cancelButtonText
}) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={cancelForm} fullWidth={true} maxWidth={'md'} disableBackdropClick>
        <>
          <DialogActions className={continueNext ? classes.buttonSkip : classes.buttonClose}>
            {
              continueNext && (
                <IconButton onClick={continueNext} aria-label="delete">
                  <DownloadIcon />
                </IconButton>
              )
            }
            {
              cancelForm && (
                <IconButton onClick={cancelForm} aria-label="close">
                  <CloseIcon />
                </IconButton>
              )
            }
            {
              backAction && (
                <IconButton onClick={applyForm} aria-label="back">
                  <ArrowBackIcon />
                </IconButton>
              )
            }
          </DialogActions>
        </>
        <DialogTitle className={classes.title} id='form-dialog-title'>{title}</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        {hideActions ? null : (
          <>
            <DialogActions align="center">
              {
                applyForm && (
                  <Button className={classes.save} onClick={applyForm} color='primary' type='submit' variant="contained">
                    {applyButtonText}
                  </Button>
                )
              }
              {
                cancelForm && (
                  <Button className={classes.cancel} onClick={cancelForm} color='secondary' type='submit' variant="contained">
                    {cancelButtonText}
                  </Button>
                )
              }
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      borderBottom: '1px solid #ddd',
      fontWeight: 600,
      fontSize: "1.5em"
    },
    content: {
      padding: '1rem 2rem',
    },
    buttonClose: {
      position: 'absolute',
      right: 0,
      top: '-6px'
    },
    buttonSkip: {
      display: "flex",
      justifyContent: "space-between",
      position: 'absolute',
      width: '100%',
      right: 0,
    },
    skipText: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    save: {
      background: theme.palette.success,
      minWidth: 100,
    },
    cancel: {
      background: theme.palette.error,
      minWidth: 100,
    }
  })
);

DialogForm.defaultProps = {
  title: 'Title',
  open: true,
  message: null,
  applyForm: () => {},
  cancelForm: () => {},
  hideActions: true,
  backAction: null,
  continueNext: null,
  applyButtonText: 'Continue',
  cancelButtonText: 'Cancel'
};

DialogForm.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.node.isRequired,
  applyForm: PropTypes.func,
  cancelForm: PropTypes.func,
  hideActions: PropTypes.bool.isRequired,
  backAction: PropTypes.func,
  continueNext: PropTypes.func,
  applyButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string
};

export default DialogForm;
