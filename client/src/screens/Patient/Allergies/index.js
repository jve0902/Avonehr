import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PatientService from "../../../services/patient.service"

const Allergies = (props) => {
  const classes = useStyles();
  const { onClose } = props;
  const [searchText, setSearchText] = useState('')
  const [allergies, setAllergies] = useState([])

  useEffect(() => {
    fetchAllergies();
  }, [searchText])

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  }

  const fetchAllergies = () => {
    const reqBody = {
      "data": {
          "text": searchText
      } 
    }
    PatientService.searchAllergies(reqBody)
    .then((res) => {
      setAllergies(res.data);
    })
  };

  return (
    <>
      <Grid className={classes.heading} container justify="space-between">
        <Typography variant="h3" color="textSecondary">Select Allergy</Typography>
        <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
      </Grid>
      <Grid item lg={4}>
        <TextField
          label=""
          placeholder="Search..."
          name="search"
          fullWidth
          variant="outlined"
          value={searchText}
          onChange={(e) => handleInputChange(e)}
          size="small"
        />
      </Grid>
      {
        allergies.map(allergy => (
          <div key={allergy.id}>
            <Typography gutterBottom>{allergy.name}</Typography>
          </div>
        ))
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  heading: {
    marginBottom: theme.spacing(2)
  }
})
)


export default Allergies;
