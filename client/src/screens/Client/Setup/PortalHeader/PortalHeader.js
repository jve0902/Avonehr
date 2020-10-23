import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button, Container, CssBaseline, makeStyles } from "@material-ui/core";
import { AuthConsumer } from "../../../../providers/AuthProvider";
import PatientPortalHeaderService from "../../../../services/patientPortalHeader.service";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px"
  },
  uploadButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "450px",
    marginBottom: theme.spacing(1),
    "& h1": {
      [theme.breakpoints.up("md")]: {
        marginRight: theme.spacing(4)
      }
    }
  },
  portal: {
    border: "1px solid",
    borderColor: "textPrimary",
    margin: "5px 0px",
    padding: "10px",
    height: "500px"
  }
}));

const PortalHeader = () => {
  const classes = useStyles();
  const [updated, setUpdated] = React.useState("");
  const [updatedUser, setUpdatedUser] = React.useState("");
  const [header, setHeader] = React.useState("");

  const getPatientPortalHeader = () => {
    PatientPortalHeaderService.getClientPortalHeader().then((res) => {
      res.data.data.map((portal) => {
        setUpdated(moment(portal.updated).format("lll"));
        setUpdatedUser(portal.updated_user);
        setHeader(portal.header);
      });
    });
  };
  React.useEffect(() => {
    getPatientPortalHeader();
  }, []);

  return (
    <AuthConsumer>
      {({ user }) => (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth={false} className={classes.root}>
            <div className={classes.uploadButtons}>
              <Typography
                component="h1"
                variant="h2"
                color="textPrimary"
                className={classes.title}
              >
                Portal Header
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component="span"
                // onClick={() => handleOnNewClick()}
              >
                Save
              </Button>
            </div>
            <Grid container justify="center" spacing={2}>
              <Grid item md={12} xs={12}>
                <Typography component="p" variant="body2" color="textPrimary">
                  This page is used to set the patient portal header
                </Typography>
                <Grid container justify="center" spacing={2}>
                  <Grid item md={5} xs={12}>
                    <div className={classes.portal}>{header}</div>
                    <Typography
                      component="p"
                      variant="body2"
                      color="textPrimary"
                    >
                      Updated: {`${updated} ${updatedUser}`}
                    </Typography>
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <div className={classes.portal}>{header}</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      )}
    </AuthConsumer>
  );
};

export default PortalHeader;
