import React from "react";
import {
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const MedicalNotes = (props) => {
  const classes = useStyles();
  const { onClose } = props;

  return (
    <>
      <Typography variant="h3" color="textSecondary">
        Medical Notes Form
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

