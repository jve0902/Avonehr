import React from "react";
import Alert from "@material-ui/lab/Alert";

const Error = ({ errors }) => {
  return (
    <React.Fragment>
      {errors &&
        errors.map((error, index) => (
          <Alert severity="error" key={index}>
            {error.msg}
          </Alert>
        ))}
    </React.Fragment>
  );
};

export default Error;
