import React, { useState, useEffect } from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Reports } from "./components";
import ReportFinanceService from "./../../../../services/reportFinance.service";
import { AuthConsumer } from "../../../../providers/AuthProvider";
import Video from "../../../../components/videos/Video";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "450px",
    marginBottom: theme.spacing(2),
    "& h1": {
      [theme.breakpoints.up("md")]: {
        marginRight: theme.spacing(4),
      },
    },
  },
  card: {
    minHeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  datePicker: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }
}));

export default function ReportFinance(props) {
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(3, "months").format("YYYY-MM-DD")
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [reports, setReports] = useState([]);

  const fetchReportFinance = () => {
    ReportFinanceService.getAll(dateFrom, dateTo).then((res) => {
      setReports(res.data);
    });
  };

  useEffect(() => {
    fetchReportFinance();
  }, []);

  const handleDateChangeFrom = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateChangeTo = (event) => {
    setDateTo(event.target.value);
  };

  const handleOnEnterClick = () => {
    ReportFinanceService.getAll(dateFrom, dateTo).then((res) => {
      setReports(res.data);
    });
  };

  return (
    <AuthConsumer>
      {({ user }) => (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth={false} className={classes.root}>
            <div className={classes.header}>
              <Typography component="h1" variant="h2" color="textPrimary">
                Report Finance
              </Typography>
            </div>
            <Typography component="p" variant="body2" color="textPrimary">
              This page is used to search accounting records
            </Typography>
            <Grid container className={classes.datePicker}>
              <Grid item xs={12} sm={2} spacing={2}>
                <TextField
                  variant="outlined"
                  id="date"
                  label="Date From"
                  value={dateFrom}
                  className={classes.textField}
                  onChange={handleDateChangeFrom}
                  type="date"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  id="date"
                  label="Date To"
                  type="date"
                  value={dateTo}
                  className={classes.textField}
                  onChange={handleDateChangeTo}
                  size="small"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={() => handleOnEnterClick()}
            >
              Enter
            </Button>
            <Grid container justify="center" spacing={2}>
              <Grid item md={12} xs={12}>
                <Reports
                  reports={reports}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>
                      <Video url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      )}
    </AuthConsumer>
  );
}