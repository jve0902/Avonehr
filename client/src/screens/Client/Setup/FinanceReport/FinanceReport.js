import React, { useState, useEffect } from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Reports } from "./components";
import FinanceReportService from "./../../../../services/financeReport.service";
import { AuthConsumer } from "./../../../../providers/AuthProvider";
import Video from "./../../../../components/videos/Video";
import { formatDate, get3MonthsAgo } from "../../../../utils/helpers"

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
}));

export default function FinanceReport(props) {
  const classes = useStyles();
  const [selectedFromDate, setSelectedFromDate] = useState(
    formatDate(get3MonthsAgo())
  );
  const [selectedToDate, setSelectedToDate] = useState(formatDate(new Date()));
  const [reports, setReports] = useState([]);

  const fetchFinanceReport = () => {
    FinanceReportService.getAll(selectedFromDate, selectedToDate).then((res) => {
      setReports(res.data);
    });
  };

  useEffect(() => {
    fetchFinanceReport();
  }, []);

  const handleDateFromChange = (date) => {
    setSelectedFromDate(formatDate(new Date(date)));
  };

  const handleDateToChange = (date) => {
    setSelectedToDate(formatDate(new Date(date)));
  };

  const handleOnEnterClick = () => {
    FinanceReportService.getAll(selectedFromDate, selectedToDate).then((res) => {
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
                Finance Report
              </Typography>
            </div>
            <Typography component="p" variant="body2" color="textPrimary">
              This page is used to search accounting records
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline1"
                    label="From"
                    value={selectedFromDate}
                    onChange={handleDateFromChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    maxDate={selectedToDate}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline2"
                    label="To"
                    value={selectedToDate}
                    onChange={handleDateToChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    minDate={selectedFromDate}
                    maxDate={new Date()}
                  />
                </MuiPickersUtilsProvider>
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