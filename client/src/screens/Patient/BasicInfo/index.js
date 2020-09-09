import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardContent, TextField, Button, Select, MenuItem } from '@material-ui/core';
import { BasicInfoForm } from "../../../static/patientBasicInfoForm"

export default function BasicInfo() {
  const classes = useStyles();
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    status: 'active',
    provider: 'active',
  })

  const handleInputChnage = (e) => {
    const {value, name} = e.target;
    setBasicInfo({
      ...basicInfo,
      [name]: value
    })
  }

  console.log("basic", basicInfo)

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary" gutterBottom>Basic Information</Typography>
              <Grid container spacing={1}>
                {
                  BasicInfoForm.map((item, index) => {
                    return (
                      <Grid key={index} item md={2}>
                        {
                          item.baseType === "input"
                            ?
                            <TextField
                              label={item.label}
                              name={item.name}
                              id={item.id}
                              fullWidth
                              onChange={(e) => handleInputChnage(e)}
                            />
                            :
                            <Select
                              className={classes.select}
                              placeholder={item.label}
                              label={item.label}
                              id={item.id}
                              name={item.name}
                              value={basicInfo.status}
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
                            </Select>
                        }
                      </Grid>
                    )
                  })
                }
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary">Home Address</Typography>
              <Grid container spacing={1}>
                <Grid item lg={12}>
                  <TextField
                    label="Standard"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    label="Standard"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    label="Standard"
                  />
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    label="Standard"
                  />
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    label="Standard"
                  />
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    label="Standard"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary">Pharmacy</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary">Insurance</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary">Payment Methods</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary">Insurance</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary">Payment Methods</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Button variant="outlined">Save</Button>
        <Button variant="outlined">Cancel</Button>
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  sectionCard: {
    padding: theme.spacing(1),
  },
  root: {
    border: '1px solid',
    margin: theme.spacing(0, 0, 1, 0),
    borderRadius: 0
  },
  select: {
    lineHeight: '2.30em',
  }
}))
