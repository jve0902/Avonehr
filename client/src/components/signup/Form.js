import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  checkbox: {
    "& div": {
      fontSize: "14px",
    },
  },
  gender: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  radioList: {
    display: "inline",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = ({ onFormSubmissionCompleted, onFormSubmit }) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [gender, setGender] = React.useState("");
  const [termsAndConditions, setTermsAndConditions] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <form className={classes.form} noValidate>
      <TextField
        value={email}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />

      <FormControl component="div" className={classes.gender}>
        <FormLabel component="p">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={gender}
          onChange={handleChange}
          className={classes.radioList}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label={
          <div>
            <span>
              I have read and agree to the{" "}
              <Link href="/terms-and-condition">terms and conditions</Link>
            </span>
          </div>
        }
        className={classes.checkbox}
        onChange={() => setTermsAndConditions(!termsAndConditions)}
      />
      <Button
        disabled={!email || !password || !gender || !termsAndConditions}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={(event) => onFormSubmit(email, password, gender)}
      >
        Sign up
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/login" variant="body2">
            Already a member? Login here
          </Link>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  );
};

export default SignUp;
