import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Video from "./../../../../components/videos/Video";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  action: {
    textTransform: "none",
    marginTop: theme.spacing(2),
  },
}));

export default function Backup() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={8}>
        <Grid item md={5} xs={12}>
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Backup
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used to backup and export all data.
          </Typography>
          <Button variant="outlined" color="primary" className={classes.action}>
            Backup
          </Button>
        </Grid>
        <Grid item md={7} xs={12}>
          <Video />
        </Grid>
      </Grid>
    </div>
  );
}
