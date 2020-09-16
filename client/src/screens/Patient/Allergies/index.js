import React, { useState, useEffect } from 'react';
import _ from "lodash";
import {
  TextField,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PatientService from "../../../services/patient.service";


const Allergies = (props) => {
  const classes = useStyles();
  const { onClose } = props;
  const [allergies, setAllergies] = useState([])

  useEffect(() => {
    fetchAllergies('');
  }, [])

  const handleInputChange = (e) => {
    const { value } = e.target;
    debouncedSearchAllergies(value);
  }

  const debouncedSearchAllergies = _.debounce(query => {
    fetchAllergies(query);
  }, 1000);

  const fetchAllergies = (searchText) => {
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
          onChange={(e) => handleInputChange(e)}
          size="small"
        />

        <List component="ul">
          {
            allergies.map(allergy => (
              <ListItem key={allergy.id} button>
                <ListItemText primary={allergy.name} />
              </ListItem>
            ))
          }
        </List>
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
  }
})
)


export default Allergies;
