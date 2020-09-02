import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Video from "./../../../../components/videos/Video";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
}));

const Schedule = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Schedule
      </Typography>
      <Grid container justify="center" spacing={8}>
        <Grid item md={6} xs={12}></Grid>
        <Grid item md={6} xs={12}>
          <Video />
        </Grid>
      </Grid>
    </div>
  );
};

export default Schedule;
