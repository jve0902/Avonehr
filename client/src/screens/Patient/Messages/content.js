import React, { useState } from "react";
import moment from "moment";
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
          <Grid key={item.id}>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <Typography component="span" variant="body1" className={`${classes.text12} ${classes.label}`} color="textPrimary">Date: &nbsp;</Typography>
                <Typography component="span" variant="body1" className={classes.text12} color="textPrimary">{moment(item.created).format("MMM DD YYYY")}</Typography>
              </Grid>
              <Grid item md={3}>
                <Typography component="span" variant="body1" className={`${classes.text12} ${classes.label}`} color="textPrimary">From: &nbsp;</Typography>
                <Typography component="span" variant="body1" className={classes.text12} color="textPrimary">{item.user_to_from || "-"}</Typography>
              </Grid>
              <Grid item md={3}>
                <Typography component="span" variant="body1" className={`${classes.text12} ${classes.label}`} color="textPrimary">To: &nbsp;</Typography>
                <Typography component="span" variant="body1" className={classes.text12} color="textPrimary">{item.user_to_name || "-"}</Typography>
              </Grid>
              <Grid item md={3}>
                <Typography component="span" variant="body1" className={`${classes.text12} ${classes.label}`} color="textPrimary">Subject: &nbsp;</Typography>
                <Typography component="span" variant="body1" className={classes.text12} color="textPrimary">{item.subject}</Typography>
              </Grid>
            </Grid>
            <Grid key={item.id} onContextMenu={(e) => menuHandler(e, item)}>
              <Typography variant="body1" className={classes.text12} color="textPrimary">{item.message}</Typography>
            </Grid>
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
  },
  label: {
    fontWeight: 500
  }
}));
