import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { closeSnackbar } from "../../store/auth/actions";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

//TODO:: Add local fetching indicator https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
const Dimmer = ({ isOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const success = useSelector(
    (state) => state.auth.success || false,
    shallowEqual
  );
  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Backdrop className={classes.backdrop} open={isOpen} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Dimmer;
