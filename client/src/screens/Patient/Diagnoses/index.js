import React, { useState } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PatientService from "../../../services/patient.service"
import { setError, setSuccess } from '../../../store/common/actions';
import { useDispatch } from "react-redux";

const Diagnoses = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onClose } = props;
  const [searchText, setSearchText] = useState('');

  const handleInputChnage = (e) => {
    const { value } = e.target;
    setSearchText(value);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      "data": {
        "patient_id": 1
      }
    }
    PatientService.createDiagnosis(reqBody)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        onClose();
      })
      .catch((error) => {
        const resMessage = (error.response && error.response.data &&
          error.response.data.message[0].msg) || error.message || error.toString();
        let severity = "error";
        dispatch(
          setError({
            severity: severity,
            message: resMessage,
          })
        );
      })
  }

  return (
    <>
      <Grid className={classes.heading} container justify="space-between">
        <Typography variant="h3" color="textSecondary">Diagnose</Typography>
      </Grid>

      <Grid container spacing={1}>
        <Grid item lg={4}>
          <Grid className={`${classes.border} ${classes.height100}`}>
            <TextField
              label=""
              placeholder="Search..."
              name="search"
              fullWidth
              variant="outlined"
              value={searchText}
              onChange={(e) => handleInputChnage(e)}
              size="small"
              className={classes.heading}
            />
            {
              [...Array(3)].map((item, index) => (
                <Grid key={index}>
                  <Typography gutterBottom variant="body1">Chronic Fatigue (Un-specified)</Typography>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid item lg={8}>
          <Grid className={classes.border}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h4" color="textPrimary" gutterBottom>Recent ICDs</Typography>
                {
                  [...Array(5)].map((item, index) => (
                    <Grid key={index}>
                      <Typography gutterBottom variant="body1">Chronic Fatigue (Un-specified)</Typography>
                    </Grid>
                  ))
                }
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4" color="textPrimary" gutterBottom>Recommended ICDs</Typography>
                {
                  [...Array(5)].map((item, index) => (
                    <Grid key={index}>
                      <Typography gutterBottom variant="body1">Chronic Fatigue (Un-specified)</Typography>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  heading: {
    marginBottom: theme.spacing(2)
  },
  border: {
    border: '1px solid grey',
    padding: 10,
  },
  height100: {
    height: '100%'
  },
})
)


export default Diagnoses;

