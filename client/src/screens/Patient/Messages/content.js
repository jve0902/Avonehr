import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography
} from "@material-ui/core";
import PatientService from "../../../services/patient.service";
import { setError, setSuccess } from "../../../store/common/actions";
import { useDispatch } from "react-redux";

export default function MessagesContent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, reloadData } = props;
  const [element, setElement] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const menuHandler = (e, item) => {
    setElement(e.currentTarget);
    setSelectedItem(item);
  }

  return (
    <>
      {
        data.map(item => (
          <Grid key={item.id} onContextMenu={(e) => menuHandler(e, item)}>
            <Typography variant="body1" className={classes.text12} color="textPrimary">{item.message}</Typography>
          </Grid>
        ))
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
  },
  text12: {
    fontSize: 12,
  }
}));
