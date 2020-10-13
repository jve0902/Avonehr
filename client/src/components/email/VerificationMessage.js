import React from "react";

import Alert from "@material-ui/lab/Alert";

const VerificationMessage = ({ severity, message }) => {
  return <Alert severity={severity || "error"}>{message}</Alert>;
};

export default VerificationMessage;
