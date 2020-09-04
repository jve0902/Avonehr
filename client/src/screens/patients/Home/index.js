import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from "../../../components/common/Card";

export default function Home() {
  const classes = useStyles();
  return (
    <Grid className={classes.main} container spacing={1}>
      <Grid item xs={3}>
        {[...Array(3)].map((e, index) => {
          return (
            <Card
              title="Patient"
              items={[]}
              showActions={true}
            />
          )
        })}
      </Grid>
      <Grid item xs={3}>
        {[...Array(3)].map((e, index) => {
          return (
            <Card
              title="Patient"
              items={[]}
              showActions={true}
              primaryButtonText={"New"}
              secondaryButtonText={"Expand"}
            />
          )
        })}
      </Grid>
      <Grid item xs={3}>
        {[...Array(3)].map((e, index) => {
          return (
            <Card
              title="Patient"
              items={[]}
              showActions={true}
            />
          )
        })}
      </Grid>
      <Grid item xs={3}>
        {[...Array(3)].map((e, index) => {
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
      minHeight: "calc(100vh - 192px)"
  },
}))
