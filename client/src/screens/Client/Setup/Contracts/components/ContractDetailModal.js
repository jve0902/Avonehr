import React from "react";

import {
  makeStyles,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

import SampleDocViewer from "../../../../Patient/Encounters/components/SampleDocViewer";

const useStyles = makeStyles((theme) => ({
  gridMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  noteMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
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
  root: {
    paddingLeft: "5px",
    "& .MuiTypography-root": {
      marginLeft: "5px",
    },
  },
}));


const ContractDetailModal = ({
  isOpen,
  hendleOnClose,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={isOpen}
        onClose={hendleOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          Contract Detail
        </DialogTitle>
        <DialogContent className={classes.content}>
          <SampleDocViewer />
          <div className={classes.root} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

ContractDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hendleOnClose: PropTypes.func.isRequired,
};
export default ContractDetailModal;
