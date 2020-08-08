import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { closeSnackbar } from "../../store/auth/actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbar = ({ isOpen, onClose, severity, message }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity={severity || "success"}>
          {message || "Operation completed!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isOpen: state.common.snackbar.isOpen,
    message: state.common.snackbar.message,
    severity: state.common.snackbar.severity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(closeSnackbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);
