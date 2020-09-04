import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from "../../../components/common/Card";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DvrIcon from '@material-ui/icons/Dvr';

export default function Home() {
  const classes = useStyles();
  return (
    <Grid className={classes.main} container spacing={1}>
      <Grid item md={3} sm={6} xs={12}>
        {[...Array(5)].map((e, index) => {
          return (
            <Card
              title="Patient"
              items={[]}
              showActions={true}
              icon={<DvrIcon />}
            />
          )
        })}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        {[...Array(5)].map((e, index) => {
          return (
            <Card
              title="Patient"
              items={[]}
              showActions={true}
              primaryButtonText={"New"}
              secondaryButtonText={"Expand"}
              showSearch={true}
            />
          )
        })}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        {[...Array(5)].map((e, index) => {
          return (
            <Card
              title="Patient"
              items={[]}
              showActions={true}
              icon={<CreditCardIcon />}
            />
          )
        })}
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        {[...Array(5)].map((e, index) => {
          return (
            <Card
              title="Patient"
              items={[]}
              showActions={true}
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
