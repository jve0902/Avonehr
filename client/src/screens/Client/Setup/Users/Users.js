import React, { useState, useEffect } from "react";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  makeStyles,
  Switch,
  withStyles
} from "@material-ui/core";
import { AuthConsumer } from "../../../../providers/AuthProvider";
import { green, grey } from "@material-ui/core/colors";
import UsersTable from "./component/UsersTable";
import NewOrEditUserModal from "./component/modal/NewOrEditUserModal";
import UsersService from "../../../../services/users.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px"
  },
  uploadButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "550px",
    marginBottom: theme.spacing(1),
    "& h1": {
      [theme.breakpoints.up("md")]: {
        marginRight: theme.spacing(4)
      }
    }
  }
}));
const GreenSwitch = withStyles({
  switchBase: {
    color: grey[300],
    "&$checked": {
      color: green[500]
    },
    "&$checked + $track": {
      backgroundColor: green[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

const Users = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [forwardEmailList, setForwardEmailList] = useState([]);
  const [userValues, setUserValues] = useState("");
  const [isShowDeleted, setIsShowDeleted] = useState(false);

  const fetchAllUsers = () => {
    UsersService.getAllUsers().then((res) => {
      const users = res.data.data;
      setAllUsers(users);
      if (isShowDeleted === false) {
        let tempUsers = users.filter((user) => user.status !== "D");
        setAllUsers(tempUsers);
      } else {
        setAllUsers(users);
      }
    });
  };
  const fetchForwardEmailList = () => {
    UsersService.getForwardEmailList().then((res) =>
      setForwardEmailList(res.data.data)
    );
  };

  useEffect(() => {
    fetchAllUsers();
  }, [isShowDeleted]);

  useEffect(() => {
    fetchForwardEmailList();
  }, []);

  const handleOnNewClick = () => {
    setIsOpen(true);
    setIsNewUser(true);
    setUserValues({
      admin: false,
      status: "A",
      schedule: "F",
      type: "",
      appointments: true
    });
  };

  const handleOnEditClick = (id) => {
    setIsOpen(true);
    setIsNewUser(false);
    const selectUserById = allUsers.filter((user) => user.id === id);
    selectUserById && setUserValues(_.head(selectUserById));
  };

  return (
    <AuthConsumer>
      {({ user }) => (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth={false} className={classes.root}>
            <div className={classes.uploadButtons}>
              <Typography component="h1" variant="h2" color="textPrimary">
                Users
              </Typography>
              <FormControlLabel
                control={
                  <GreenSwitch
                    checked={isShowDeleted}
                    size="small"
                    name="active"
                    onChange={() => setIsShowDeleted(!isShowDeleted)}
                  />
                }
                label="Show deleted users"
                labelPlacement="start"
              />
              <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={() => handleOnNewClick()}
              >
                New
              </Button>
            </div>
            <Grid container justify="center" spacing={8}>
              <Grid item md={12} xs={12}>
                <Typography component="p" variant="body2" color="textPrimary">
                  This page is used to manage users
                </Typography>
                <UsersTable
                  users={allUsers}
                  handleOnEditClick={handleOnEditClick}
                />
              </Grid>
            </Grid>
            <NewOrEditUserModal
              isOpen={isOpen}
              handleOnClose={() => setIsOpen(false)}
              isNewUser={isNewUser}
              forwardEmailList={forwardEmailList}
              fetchAllUsers={fetchAllUsers}
              authUser={user}
              user={userValues}
              allUsers={allUsers}
            />
          </Container>
        </React.Fragment>
      )}
    </AuthConsumer>
  );
};

export default Users;
