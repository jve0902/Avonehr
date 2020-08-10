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
}));

const PracticeForm = () => {
  const classes = useStyles();
  const [name, setName] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [address2, setAddress2] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [zipCode, setZipCode] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [fax, setFax] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [ein, setEin] = React.useState(null);
  const [npi, setNpi] = React.useState(null);
  const [clientCode, setClientCode] = React.useState(null);
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
        value={name}
        variant="outlined"
        margin="dense"
        required
        fullWidth
        id="name"
        label="Practice name"
        name="name"
        autoComplete="name"
        autoFocus
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        name="address"
        label="Practice Address"
        id="address"
        autoComplete="current-address"
        onChange={(event) => setAddress(event.target.value)}
        value={address}
      />
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        name="address2"
        label="Practice Address Line Two"
        id="address2"
        autoComplete="current-address2"
        onChange={(event) => setAddress2(event.target.value)}
        value={address2}
      />
      <TextField
        value={city}
        variant="outlined"
        margin="dense"
        fullWidth
        id="city"
        label="Practice city"
        name="city"
        autoComplete="city"
        autoFocus
        onChange={(event) => setCity(event.target.value)}
      />
      <TextField
        value={state}
        variant="outlined"
        margin="dense"
        fullWidth
        id="state"
        label="Practice state"
        name="state"
        autoComplete="state"
        autoFocus
        onChange={(event) => setState(event.target.value)}
      />
      <TextField
        value={zipCode}
        variant="outlined"
        margin="dense"
        fullWidth
        id="zipcode"
        label="Practice Zipcode"
        name="zipcode"
        autoComplete="zipcode"
        autoFocus
        onChange={(event) => setZipCode(event.target.value)}
      />
      <TextField
        value={phone}
        variant="outlined"
        margin="dense"
        fullWidth
        id="phone"
        label="Practice phone"
        name="phone"
        autoComplete="phone"
        autoFocus
        onChange={(event) => setPhone(event.target.value)}
      />
      <TextField
        value={fax}
        variant="outlined"
        margin="dense"
        fullWidth
        id="fax"
        label="Practice Fax"
        name="fax"
        autoComplete="fax"
        autoFocus
        onChange={(event) => setFax(event.target.value)}
      />
      <TextField
        value={url}
        variant="outlined"
        margin="dense"
        fullWidth
        id="url"
        label="Practice Website URL"
        name="url"
        autoComplete="url"
        autoFocus
        onChange={(event) => setUrl(event.target.value)}
      />
      <TextField
        value={email}
        variant="outlined"
        margin="dense"
        fullWidth
        id="email"
        label="Practice Email"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        value={ein}
        variant="outlined"
        margin="dense"
        fullWidth
        id="ein"
        label="Practice EIN Number"
        name="ein"
        autoComplete="ein"
        autoFocus
        onChange={(event) => setEin(event.target.value)}
      />
      <TextField
        value={npi}
        variant="outlined"
        margin="dense"
        fullWidth
        id="npi"
        label="Practice NPI Number"
        name="npi"
        autoComplete="npi"
        autoFocus
        onChange={(event) => setNpi(event.target.value)}
      />
      <TextField
        value={clientCode}
        variant="outlined"
        margin="dense"
        fullWidth
        id="clientCode"
        label="Client Code"
        name="clientCode"
        autoComplete="clientCode"
        autoFocus
        onChange={(event) => setClientCode(event.target.value)}
      />
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
        onClick={(event) => alert(email, password, gender)}
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

export default PracticeForm;
