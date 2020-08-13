import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Error from "./Error";

const TextFieldWithError = ({
  fieldName,
  label,
  value,
  handleOnChange,
  handleOnBlur,
  errors,
  type,
}) => {
  return (
    <React.Fragment>
      <TextField
        value={value}
        variant="outlined"
        margin="dense"
        required
        fullWidth
        id={fieldName}
        label={label}
        name={fieldName}
        type={type || "text"}
        autoComplete={fieldName}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      <Error errors={errors} />
    </React.Fragment>
  );
};

TextFieldWithError.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  type: PropTypes.string,
};

export default TextFieldWithError;
