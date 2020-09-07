import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from "../../../components/common/Card";
import { FirstColumnPatientCards, ThirdColumnPatientCards, FourthColumnPatientCards } from "../../../static/patient"

export default function Home() {
  const classes = useStyles();
  return (
    <Grid className={classes.main} container spacing={1}>
      <Grid item md={3} sm={6} xs={12}>
        {FirstColumnPatientCards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              items={item.data}
              showActions={item.showActions}
              icon={item.icon}
              primaryButtonText={item.primaryButtonText}
              secondaryButtonText={item.secondaryButtonText}
            />
          )
        })}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Card
          title="Encounters"
          items={[]}
          showActions={true}
          primaryButtonText={"New"}
          secondaryButtonText={"Expand"}
          showSearch={false}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        {ThirdColumnPatientCards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              items={item.data}
              showActions={item.showActions}
              icon={item.icon}
              primaryButtonText={item.primaryButtonText}
              secondaryButtonText={item.secondaryButtonText}
            />
          )
        })}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        {FourthColumnPatientCards.map((item, index) => {
          return (
            <Card
              key={index}
              title={item.title}
              items={item.data}
              showActions={item.showActions}
              icon={item.icon}
              primaryButtonText={item.primaryButtonText}
              secondaryButtonText={item.secondaryButtonText}
            />
          )
        })}
      </Grid>
    </Grid>
    
  )
}

const useStyles = makeStyles((theme) => ({
  main: {
      margin: theme.spacing(1, 0, 1, 0),
  },
}))
