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
import { setError, setSuccess } from "../../../store/common/actions";
import { useDispatch } from "react-redux";


const Allergies = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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

  const createAllergy = () => {
    const reqBody = {
      "data": {
        "patient_id": "1",
        "drug_id": "1"
      }
    }
    PatientService.createAllergy(reqBody)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        onClose();
      })
      .catch((error) => {
        const resMessage = (error.response && error.response.data &&
          error.response.data.message) || error.message || error.toString();
        let severity = "error";
        dispatch(
          setError({
            severity: severity,
            message: resMessage,
          })
        );
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

        <Button variant="outlined" onClick={() => createAllergy()}>Create</Button>

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
