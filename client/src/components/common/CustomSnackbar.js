import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { closeSnackbar } from "../../store/auth/actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar = ({ isOpen, onClose, severity, message }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity || "success"}>
        {message || "Operation completed!"}
      </Alert>
    </Snackbar>
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
