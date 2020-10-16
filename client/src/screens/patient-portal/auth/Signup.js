import React, { useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

import Error from "./../../../components/common/Error";
import { AuthConsumer } from "./../../../providers/AuthProvider";
import AuthService from "./../../../services/patient_portal/auth.service";
import { setSuccess } from "./../../../store/common/actions";
import { SignupForm } from "./components";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  ErrorSection: {
    minHeight: "300px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    color: theme.palette.text.secondary
  },
  lockIcon: {
    fontSize: "40px"
  }
}));

const PatientSignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { clientCode } = useParams();
  const [client, setClient] = React.useState(null);
  const [clientError, setClientError] = React.useState([]);
  const [errors, setErrors] = React.useState([]);

  useEffect(() => {
    AuthService.getClientCode(clientCode).then(
      (res) => {
        setClient(res.data[0]);
      },
      (error) => {
        if (!error.response) {
          return;
        }
        const { data, status } = error.response;

        if (status === 400) {
          setClientError([
            {
              msg: data.message
            }
          ]);
        } else {
          setErrors([]);
        }
      }
    );
  }, [clientCode]);

  const handleFormSubmit = (data) => {
    let formData = data;
    formData.patient = {
      ...formData.patient,
      client_id: client.client_id
    };
    AuthService.register(formData).then(
      (response) => {
        dispatch(setSuccess(`${response.data.message}`));
        history.push(`/login/${clientCode}`);
      },
      (error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      }
    );
  };

  return (
    <AuthConsumer>
      {({ isAuth }) => {
        if (isAuth) {
          history.push("/");
        }
        return (
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            {clientError.length > 0 ? (
              <div className={`${classes.paper} ${classes.ErrorSection}`}>
                <Error errors={clientError} variant="filled" />
                <Alert icon={false} severity="info">
                  Go back to <Link to="/">Home page</Link>
                </Alert>
              </div>
            ) : (
              <>
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon className={classes.lockIcon} />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h2"
                    className={classes.pageTitle}
                  >
                    Register with {client && client.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    To register as a new patient, please enter your infromation
                    in the fields below. Please do not use this form if you are
                    already patient.
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    If you would like to amend your information, please send a
                    Secure Message or call our office.
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    If you are already a registered patient with online access,
                    you can log in <Link to={`/login/${clientCode}`}>here</Link>
                  </Typography>
                </div>
                <SignupForm
                  onFormSubmit={handleFormSubmit}
                  errors={errors.error}
                />
              </>
            )}
          </Container>
        );
      }}
    </AuthConsumer>
  );
};

export default PatientSignUp;
