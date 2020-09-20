import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EncountersFormFields, EncountersCards } from "../../../static/encountersForm";
import Card from "../../../components/common/Card";

const Form = (props) => {
  const classes = useStyles();
  const { onClose } = props;

  const [formFields, setFormFields] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    type: '',
    paymentType: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    zipPostal: '',
  })

  const handleInputChnage = (e) => {
    const { value, name } = e.target;
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  return (
    <>
      <Typography variant="h3" color="textSecondary">Encounters Form</Typography>
      <Grid container>
        <Grid item md={8}>
          <Grid className={classes.inputRow}>
            {
              EncountersFormFields.map((item, index) => (
                <Grid key={index} container alignItems="center" className={classes.formInput}>
                  <Grid item lg={2}>
                    <label variant="h4" color="textSecondary">{item.label}</label>
                  </Grid>
                  <Grid item md={4}>
                    {
                      item.baseType === "input"
                        ?
                        <TextField
                          variant={"standard"}
                          name={item.name}
                          id={item.id}
                          type={item.type}
                          fullWidth
                          onChange={(e) => handleInputChnage(e)}
                        />
                        :
                        <TextField
                          select
                          placeholder={item.label}
                          id={item.id}
                          name={item.name}
                          value={formFields[item.name]}
                          fullWidth
                          onChange={(e) => handleInputChnage(e)}
                        >
                          {
                            item.options.map((option, index) => {
                              return (
                                <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                              )
                            })
                          }
                        </TextField>
                    }
                  </Grid>
                </Grid>
              ))
            }
            <Grid className={classes.formInput}>
              <Grid item lg={6}>
                <Typography gutterBottom variant="h5" color="textPrimary">Internal Notes (Not Visible to Patients)</Typography>
              </Grid>
              <Grid item md={12}>
                <TextField
                  variant="outlined"
                  name={"notes"}
                  id={"notes"}
                  type={"text"}
                  fullWidth
                  onChange={(e) => handleInputChnage(e)}
                  multiline={true}
                  rows={5}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.formInput}>
            <Grid item lg={6}>
              <Typography gutterBottom variant="h5" color="textPrimary">Treatment Plan (Not Visible to Patients)</Typography>
            </Grid>
            <Grid item md={12}>
              <TextField
                variant="outlined"
                name={"notes"}
                id={"notes"}
                type={"text"}
                fullWidth
                onChange={(e) => handleInputChnage(e)}
                multiline={true}
                rows={5}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} className={classes.cardsContainer}>
          {
            EncountersCards.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                // data={mapCardContentDataHandlers(item.title)}
                showActions={item.showActions}
                showSearch={item.showSearch}
                icon={item.icon}
                primaryButtonText={item.primaryButtonText}
                secondaryButtonText={item.secondaryButtonText}
                // primaryButtonHandler={mapPrimaryButtonHandlers(item.title)}
                // secondaryButtonHandler={mapSecondaryButtonHandlers(item.title)}
                iconHandler={() => console.log(item.title)}
                // searchHandler={value => debouncedSearchPatients(value)}
              />
            ))
          }
        
        <Grid container justify="space-between">
          <Button variant="outlined" onClick={() => onClose()}>Save</Button>
          <Button variant="outlined" onClick={() => onClose()}>Exit</Button>
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
  formInput: {
    margin: theme.spacing(2, 0)
  },
  cardsContainer: {
    padding: theme.spacing(0, 2)
  }
})
)


export default Form;
