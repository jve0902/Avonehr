import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const MedicalNotes = (props) => {
  const classes = useStyles();
  const { onClose } = props;

  const [formFields, setFormFields] = useState({
    subject: "",
    message: "",
  });

  const handleInputChnage = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <>
      <Typography variant="h3" color="textSecondary">
        Medical Notes
      </Typography>
      <form>
        <Grid
          className={classes.actionContainer}
          container
          justify="space-between"
        >
          <Button variant="outlined" onClick={() => onClose()}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => onClose()}>
            Cancel
          </Button>
        </Grid>
      </form>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  formInput: {
    marginBottom: theme.spacing(4),
  },
  actionContainer: {
    marginTop: theme.spacing(4),
  },
}));

export default MedicalNotes;

