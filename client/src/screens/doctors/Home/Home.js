import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Calendar } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
}));
export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={8}>
        <Typography component="h1" variant="h2" color="textPrimary">
          Home
        </Typography>
        <Grid item md={8} xs={12}>
          <Calendar />
        </Grid>
        <Grid item md={4} xs={12}></Grid>
      </Grid>
    </div>
  );
}
