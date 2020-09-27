import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Video from "./../../../components/videos/Video";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  mainContent: {
    marginTop: theme.spacing(3),
  },
}));

const Reports = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Reports
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is used to list reports
      </Typography>
      <div className={classes.mainContent}>
        <Typography component="p" variant="body1" color="textPrimary">
          Finance Report
        </Typography>
      </div>
      {/* <Grid container justify="center" spacing={8}>
        <Grid item md={6} xs={12}></Grid>
        <Grid item md={6} xs={12}>
          <Video url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        </Grid>
      </Grid> */}
    </div>
  );
};

export default Reports;
