import React from "react";

import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const Error = ({ errors, children }) => {
  return (
    <React.Fragment>
      {errors &&
        errors.map((error, index) => (
          <Alert severity="error" key={index}>
            {error.msg}
            {children}
          </Alert>
        ))}
    </React.Fragment>
  );
};

Error.propTypes = {
  error: PropTypes.shape({
    msg: PropTypes.string.isRequired
  })
};
export default Error;
