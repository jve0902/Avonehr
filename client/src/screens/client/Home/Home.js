import React, { useEffect, useState } from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Colors from "../../../theme/colors";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Calendar } from "./components";
import Appointments from "./../../../services/appointments.service";
import DashboardHome from "../../../services/DashboardHome.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  titleContainer: {
    padding: "0 0 0 1em",
    borderBottom: `1px solid ${Colors.border}`,
    minHeight: 47,
  },
  title: {
    fontWeight: "600",
    fontSize: "1em",
  },
  providers: {
    display: "block",
    listStyle: "none",
    width: "100%",
    "& li": {
      fontSize: "13px",
      display: "flex",
      justifyContent: "space-between",
      listStyle: "none",
      padding: "3px 0px",
      cursor: "pointer",
      "&:hover": {
        background: "#fafafa",
      },
      "& div": {
        flex: 2,
      },
    },
  },
  providersLabel: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  count: {
    width: "30px",
    flex: "1 !important",
  },
  providerDetails: {
    marginTop: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [events, setEvents] = useState([
    { title: "event 1", date: "2020-08-01" },
    { title: "event 2", date: "2020-08-02" },
  ]);
  const [providers, setProviders] = useState([]);
  const getMapFromArray = (data) => {
    const formedData = data.reduce((acc, item) => {
      return [
        ...acc,
        {
          ...item,
          title: item.firstname,
          start: item.start_dt,
          end: item.end_dt,
        },
      ];
    }, []);

    return formedData;
  };

  useEffect(() => {
    async function fetchAppointments() {
      const { data } = await Appointments.getAll();
      const eventsFromAPI = getMapFromArray(data);
      setEvents(eventsFromAPI);
    }

    async function fetchProviders() {
      const { data } = await DashboardHome.getProviders();
      setProviders(data);
    }

    fetchProviders();
    fetchAppointments();
  }, []);

  const handleProviderClick = async (provider) => {
    setSelectedProvider(provider);
    const { data } = await Appointments.getAllByProvider(provider.id);
    const eventsFromAPI = getMapFromArray(data);
    setEvents(eventsFromAPI);
  };

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h2" color="textPrimary">
        Home
      </Typography>
      <Grid container spacing={8}>
        <Grid item md={7} xs={12}>
          <Calendar events={events} />
        </Grid>
        <Grid item md={5} xs={12}>
          <Card className={classes.root1} variant="outlined">
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.titleContainer}
            >
              <Typography className={classes.title}>Provider</Typography>
            </Grid>

            <CardContent>
              <ul className={classes.providers}>
                <li className={classes.providersLabel}>
                  <div>Name</div>
                  <div className={classes.count}>Count</div>
                  <div>Since</div>
                </li>
                {providers &&
                  providers.map((provider) => (
                    <li
                      key={provider.id}
                      onClick={() => handleProviderClick(provider)}
                    >
                      <div>{provider.name}</div>
                      <div className={classes.count}>{provider.count}</div>
                      <div>{`${moment(provider.dt).format("ll")} (${moment(
                        provider.dt
                      )
                        .startOf("day")
                        .fromNow()})`}</div>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          <Card className={classes.providerDetails} variant="outlined">
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.titleContainer}
            >
              <Typography className={classes.title}>
                Provider Details- Mark Hyman, MD
              </Typography>
            </Grid>

            <CardContent>
              <ul className={classes.providers}>
                <li className={classes.providersLabel}>
                  <div>Type</div>
                  <div className={classes.count}>Count</div>
                  <div>Since</div>
                </li>
                <li>
                  <div>Patient Labs</div>
                  <div className={classes.count}>10</div>
                  <div>Jan 1 2020 (2 days ago)</div>
                </li>
                <li>
                  <div>Messages from Patients</div>
                  <div className={classes.count}>10</div>
                  <div>Jan 1 2020 (2 days ago)</div>
                </li>
                <li>
                  <div>Messages To Patient Unread</div>
                  <div className={classes.count}>10</div>
                  <div>Jan 1 2020 (2 days ago)</div>
                </li>
                <li>
                  <div>Patient Appointments Request</div>
                  <div className={classes.count}>10</div>
                  <div>Jan 1 2020 (2 days ago)</div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
