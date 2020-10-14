import React from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0"
  },
  controlLabel: {
    marginLeft: "0px",
    marginRight: "0px"
  },
  textField: {
    width: "250px"
  },
  submit: {
    marginTop: theme.spacing(1),
    padding: "4px 30px",
    fontSize: "1rem",
    maxWidth: "100px"
  }
}));

const ICDcodesform = ({
  fetchSearchIcdCodes,
  textChangeHandler,
  checkBoxChangeHandler
}) => {
  const classes = useStyles();
  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      fetchSearchIcdCodes();
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        size="small"
        variant="outlined"
        autoFocus
        onChange={textChangeHandler}
        className={classes.textField}
        name="searchTerm"
        label="Name"
        onKeyUp={(event) => handleKeyUp(event)}
      />
      <FormControlLabel
        control={
          <Checkbox
            onChange={checkBoxChangeHandler}
            color="primary"
            onKeyUp={(event) => handleKeyUp(event)}
            name="favorite"
            size="small"
          />
        }
        label="Favorite"
      />

      <Button
        size="small"
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={fetchSearchIcdCodes}
      >
        Search
      </Button>
    </div>
  );
};

export default ICDcodesform;
