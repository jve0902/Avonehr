import React, { useState } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import CountrySelect from "../../../../components/common/CountrySelect";
import MaskInput from "../../../../components/common/MaskInput";
import RegionSelect from "../../../../components/common/RegionSelect";
import useAuth from "../../../../hooks/useAuth";
import PaymentMethodService from "../../../../services/patient_portal/payment-method.service";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1 / 2),
    top: theme.spacing(1 / 2),
    color: "#ffffff",
  },
  formContainer: {
    margin: theme.spacing(3, 0),
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
    marginBottom: theme.spacing(2),
  },
  buttonsContainer: {
    margin: theme.spacing(3, 0),
  },
}));

const PaymentMethodsForm = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const {
    isOpen, onClose, reloadData,
  } = props;
  const [formFields, setFormFields] = useState({
    cardType: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    address: "",
    address2: "",
    city: "",
    postal: "",
  });
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");


  const updateFormState = (key, value) => {
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };


  const handleInputChange = (e) => {
    const { value, name } = e.target;
    updateFormState(name, value);
  };

  const handleCountryRegion = (identifier, value) => {
    if (identifier === "country") {
      setCountry(value);
    } else if (identifier === "region") {
      setRegion(value);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        exp: formFields.expiryDate.replace("/", ""),
        type: formFields.cardType[0] || "V",
        cvc: formFields.cvv,
        account_number: formFields.cardNumber.replaceAll("/", ""),
        stripe_customer_id: user.stripe_customer_id,
        corp_stripe_customer_id: user.corp_stripe_customer_id,
        address: formFields.address,
        address2: formFields.address2,
        city: formFields.city,
        postal: formFields.postal,
        country: country[1],
        state: region,
      },
    };

    PaymentMethodService.createPaymentMethod(reqBody).then((response) => {
      enqueueSnackbar(`${response.message}`, { variant: "success" });
      reloadData();
      onClose();
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        Add Payment Method
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <form onSubmit={onFormSubmit}>
          <Grid className={classes.formContainer}>
            <Grid>
              <MaskInput
                required
                fullWidth
                className={classes.gutterBottom}
                type="text"
                name="cardNumber"
                label="Card Number"
                margin="dense"
                variant="outlined"
                value={formFields.cardNumber}
                mask="9999/9999/9999/9999"
                onChange={(e) => handleInputChange(e)}
              />
              {!!formFields.cardType && formFields.cardType.length ? (
                <Typography gutterBottom>{formFields.cardType}</Typography>
              )
                : null}
            </Grid>
            <Grid>
              <TextField
                required
                variant="outlined"
                margin="dense"
                name="cvv"
                id="cvv"
                type="number"
                label="CVV"
                className={classes.gutterBottom}
                value={formFields.cvv}
                onChange={(e) => handleInputChange(e)}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 3);
                }}
              />
            </Grid>

            <Grid>
              <MaskInput
                required
                className={classes.gutterBottom}
                type="text"
                name="expiryDate"
                label="Validity"
                margin="dense"
                variant="outlined"
                value={formFields.expiryDate}
                mask="99/99"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid>
              <TextField
                className={classes.gutterBottom}
                label="Address"
                name="address"
                value={formFields.address}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <TextField
                className={classes.gutterBottom}
                label="Address Line 2"
                name="address2"
                value={formFields.address2}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <TextField
                className={classes.gutterBottom}
                label="City"
                name="city"
                value={formFields.city}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <TextField
                className={classes.gutterBottom}
                label="Zip/Postal"
                name="postal"
                value={formFields.postal}
                fullWidth
                onChange={(e) => handleInputChange(e)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <CountrySelect
                id="country-select"
                error={null}
                name="country-select"
                helperText=""
                label="Country"
                handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                country={country}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <RegionSelect
                id="state-select"
                error={null}
                name="state-select"
                helperText=""
                label="State"
                handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                country={country}
                region={region}
                margin="dense"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container className={classes.buttonsContainer} justify="space-between">
            <Button variant="outlined" type="submit">
              Add Method
            </Button>
            <Button variant="outlined" onClick={() => onClose()}>
              Cancel
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

PaymentMethodsForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default PaymentMethodsForm;
