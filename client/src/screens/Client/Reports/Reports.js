import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
  finance: {
    cursor: "pointer",
    color: "#3e82ef",
  },
}));

const Reports = () => {
  const classes = useStyles();
  const history = useHistory();

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
        <Typography
          onClick={() => history.push("/setup/report-finance")}
          component="p"
          variant="body1"
          color="textPrimary"
          className={classes.finance}
        >
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
