import {
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  makeStyles,
  Switch,
  TextField,
  withStyles
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "../../../../../../services/users.service";
import { setSuccess } from "../../../../../../store/common/actions";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff"
    }
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px"
  },
  formControl: {
    margin: "10px 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 120
    }
  },
  formLabel: {
    margin: "5px 10px"
  },
  root: {
    "& .MuiTypography-root": {
      marginLeft: "5px"
    }
  },
  formHelperText: {
    width: "220px",
    fontSize: "12px",
    paddingLeft: "10px"
  },
  statusText: {
    width: "220px",
    fontSize: "14px"
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
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

const NewOrEditUserModal = ({
  isOpen,
  handleOnClose,
  isNewUser,
  forwardEmailList,
  fetchAllUsers,
  allUsers,
  authUser,
  ...props
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState([]);

  const nameError = allUsers.some((u) =>
    isNewUser
      ? String(u.firstname).trim() === String(user.firstname).trim() &&
        String(u.lastname).trim() === String(user.lastname).trim()
      : false
  );
  const firstnameError =
    String(user.firstname).length <= 0 || String(user.firstname).length > 255;
  const lastnameError =
    String(user.lastname).length <= 0 || String(user.lastname).length > 255;
  const emailErrorOne = allUsers.some((u) =>
    isNewUser ? String(u.email).trim() === String(user.email).trim() : false
  );
  const emailErrorTwo = String(user.email).length <= 0;
  const statusError = user.id === authUser.id && String(user.status) === "D";
  const adminError =
    user.id === authUser.id &&
    Boolean(user.admin) ===
      true; /*TODO: if row edited==self, admin was false, user sets admin=true, then print message "You cant grant yourself administrator permissions!" */

  const validate = () => {
    let valide = true;
    if (
      nameError ||
      firstnameError ||
      lastnameError ||
      emailErrorOne ||
      emailErrorTwo ||
      statusError ||
      adminError
    ) {
      valide = false;
    }
    return valide;
  };

  useEffect(() => {
    const tempUser = {
      ...props.user
    };
    setUser(tempUser);
  }, [props.user]);

  const payload = {
    firstname: user.firstname,
    lastname: user.lastname,
    title: user.title,
    email: user.email,
    phone: user.phone,
    note: user.note,
    status: user.status,
    appointments: user.appointments,
    type: user.type,
    schedule: user.schedule,
    admin: user.admin,
    email_forward_user_id: user.email_forward_user_id
  };
  const handleCreateNewOrEditUser = () => {
    if (isNewUser) {
      UserService.createNewUser(payload).then(
        (response) => {
          setTimeout(() => {
            dispatch(setSuccess(response.data.message));
          }, 300);
        },
        (error) => {
          setTimeout(() => {
            setErrors(error.response.error);
          }, 300);
        }
      );
    } else {
      UserService.updateUser(authUser.id, user.id, payload).then(
        (response) => {
          setTimeout(() => {
            dispatch(setSuccess(response.data.message));
          }, 300);
        },
        (error) => {
          setTimeout(() => {
            setErrors(error.response.error);
          }, 300);
        }
      );
    }

    handleOnClose();
    setTimeout(() => {
      fetchAllUsers();
    }, 200);
  };

  const handleOnChange = (event) => {
    const isChecked = event.target.type === "checkbox";
    setUser({
      ...user,
      [event.target.name]: isChecked
        ? event.target.checked
        : event.target.value.trim()
    });
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleCreateNewOrEditUser();
    }
  };

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isOpen}
        onClose={handleOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {isNewUser ? "New User" : "Edit User"}
        </DialogTitle>
        <DialogContent className={classes.content}>
          {errors &&
            errors.map((error, index) => (
              <Alert severity="error" key={index}>
                {error.msg}
              </Alert>
            ))}
          <div className={classes.root}>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={12} md={4} className={classes.gridMargin}>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth
                    autoFocus
                    required
                    label="Firstname"
                    name="firstname"
                    value={user.firstname ? String(user.firstname) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={nameError || firstnameError}
                    helperText={
                      (nameError &&
                        "This firstname and lastname already exists!") ||
                      (firstnameError &&
                        "Firstname can't be less then 0 or greater then 255 characters!")
                    }
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    required
                    fullWidth={true}
                    label="Lastname"
                    name="lastname"
                    value={user.lastname ? String(user.lastname) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={nameError || lastnameError}
                    helperText={
                      (nameError &&
                        "This firstname and lastname already exists!") ||
                      (lastnameError &&
                        "Lastname can't be less then 0 or greater then 255 characters!")
                    }
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    label="Title"
                    name="title"
                    value={user.title ? String(user.title) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    value={user.email ? String(user.email) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={emailErrorOne || emailErrorTwo}
                    helperText={
                      (emailErrorOne && "This email already exists!") ||
                      (emailErrorTwo && "Email can't be empty!")
                    }
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={user.phone ? String(user.phone) : ""}
                    onChange={handleOnChange}
                    onKeyUp={handleKeyUp}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Created"
                    value={
                      user.created ? moment(user.created).format("lll") : ""
                    }
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Created By"
                    value={user.created_user}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} className={classes.gridMargin}>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    id="outlined-select-currency"
                    select
                    label="Status"
                    name="status"
                    value={user.status}
                    onChange={handleOnChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      native: true
                    }}
                    error={statusError}
                    helperText={
                      statusError && "You can't set yourself to deleted!"
                    }
                  >
                    <option aria-label="None" value="A">
                      Active
                    </option>
                    <option aria-label="None" value="I">
                      Inactive
                    </option>
                    <option aria-label="None" value="D">
                      Deleted
                    </option>
                  </TextField>
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth
                    required
                    id="outlined-select-currency"
                    select
                    label="Type"
                    name="type"
                    value={user.type}
                    onChange={handleOnChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option aria-label="None" value="PP">
                      Primary Provider
                    </option>
                    <option aria-label="None" value="SP">
                      Secondary Provider
                    </option>
                    <option aria-label="None" value="A">
                      Administrative
                    </option>
                    <option aria-label="None" value="L">
                      Limited
                    </option>
                  </TextField>
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    id="outlined-select-currency"
                    select
                    label="Schedule"
                    name="schedule"
                    value={user.schedule}
                    onChange={handleOnChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option aria-label="None" value="F">
                      Full
                    </option>
                    <option aria-label="None" value="H">
                      Half
                    </option>
                    <option aria-label="None" value="Q">
                      Quarter
                    </option>
                  </TextField>
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    id="outlined-select-currency"
                    select
                    label="Forward Email"
                    name="email_forward_user_id"
                    value={user.email_forward_user_id}
                    onChange={handleOnChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option aria-label="None" value="" />
                    {forwardEmailList.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.name}
                      </option>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Last Login"
                    value={
                      user.login_dt ? moment(user.login_dt).format("lll") : ""
                    }
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Updated"
                    value={
                      user.updated ? moment(user.updated).format("lll") : ""
                    }
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
                <FormControl component="div" className={classes.formControl}>
                  <TextField
                    fullWidth={true}
                    disabled={true}
                    label="Updated By"
                    value={user.updated_user}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  className={classes.formLabel}
                  control={
                    <GreenSwitch
                      checked={Boolean(user.appointments)}
                      size="small"
                      name="appointments"
                      onChange={handleOnChange}
                    />
                  }
                  label="Appointments"
                />
                <FormControlLabel
                  className={classes.formLabel}
                  control={
                    <GreenSwitch
                      checked={Boolean(user.admin)}
                      size="small"
                      name="admin"
                      onChange={handleOnChange}
                    />
                  }
                  label="Administrator"
                />
                {adminError && (
                  <FormHelperText
                    style={{ textAlign: "center", marginTop: "-3PX" }}
                    error={true}
                  >
                    You can't grant yourself administrator permissions!
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.noteMargin}
                fullWidth
                variant="outlined"
                multiline
                name="note"
                label="Notes"
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  rows: 6
                }}
                value={user.note ? String(user.note) : ""}
                onChange={handleOnChange}
                onKeyUp={handleKeyUp}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleOnClose}
            style={{
              borderColor: colors.orange[600],
              color: colors.orange[600]
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleCreateNewOrEditUser}
            disabled={!validate()}
          >
            {isNewUser ? "Save" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewOrEditUserModal;
