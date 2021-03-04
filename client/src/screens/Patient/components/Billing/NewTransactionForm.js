import React, { useEffect, useState, useCallback } from "react";

import {
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../../components/Alert";
import useDidMountEffect from "../../../../hooks/useDidMountEffect";
import usePatientContext from "../../../../hooks/usePatientContext";
import { toggleNewTransactionDialog } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";
import { TransactionFormFields } from "../../../../static/transactionForm";

const useStyles = makeStyles((theme) => ({
  formInput: {
    marginBottom: theme.spacing(1),
  },
  customLabel: {
    fontSize: 16,
    color: "#37474f",
    margin: theme.spacing(1, 0),
  },
  m2: {
    margin: theme.spacing(2, 0),
  },
}));

const NewTransactionForm = (props) => {
  const classes = useStyles();
  const { reloadData } = props;
  const { state, dispatch } = usePatientContext();
  const { patientId } = state;
  const { enqueueSnackbar } = useSnackbar();

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [formFields, setFormFields] = useState({
    date: new Date(),
    type: "",
    paymentType: "",
    amount: "",
    accountNum: "",
    notes: "",
  });

  const fetchBillingTransactionTypes = useCallback(() => {
    PatientService.getBillingTransactionTypes(patientId).then((res) => {
      setTransactionTypes(res.data);
    });
  }, [patientId]);

  const fetchBillingPaymentOptions = useCallback(() => {
    PatientService.getBillingPaymentOptions(patientId).then((res) => {
      setPaymentOptions(res.data);
    });
  }, [patientId]);

  useEffect(() => {
    fetchBillingTransactionTypes();
    fetchBillingPaymentOptions();
  }, [fetchBillingTransactionTypes, fetchBillingPaymentOptions]);

  const createBilling = () => {
    const reqBody = {
      data: {
        dt: moment(formFields.date).format("YYYY-MM-DD hh:mm"),
        type_id: formFields.type,
        payment_type: formFields.paymentType,
        amount: formFields.amount,
        note: formFields.notes,
      },
    };
    PatientService.createBilling(patientId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        reloadData();
        dispatch(toggleNewTransactionDialog());
      })
      .catch((error) => {
        const resMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();
        enqueueSnackbar(`${resMessage}`, { variant: "error" });
      });
  };

  const openConfirmationDialog = () => {
    setShowConfirmationDialog((prevstate) => !prevstate);
  };

  const closeConfirmationDialog = () => {
    setShowConfirmationDialog((prevstate) => !prevstate);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (formFields.type === 3 || formFields.type === 4) {
      openConfirmationDialog();
    } else {
      createBilling();
    }
  };

  const handleInputChnage = (e) => {
    const { value, name } = e.target;
    if (name === "type" && (value === 3 || value === 4) && formFields.paymentType === "") {
      formFields.paymentType = "C";
    }
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    const name = "date";
    setFormFields({
      ...formFields,
      [name]: date,
    });
  };

  const renderOptionsForDropdowns = (value) => {
    switch (value) {
      case "transactionTypes": {
        const transactionTypeSelectOptions = transactionTypes.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ));
        return transactionTypeSelectOptions;
      }
      case "paymentOptions": {
        const paymentTypeSelectOptions = paymentOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {`${option.account_number} - ${option.type}`}
          </MenuItem>
        ));
        return paymentTypeSelectOptions;
      }
      default:
        return <div />;
    }
  };

  useDidMountEffect(() => {
    if (transactionTypes.length) {
      const name = "type";
      setFormFields({
        ...formFields,
        [name]: transactionTypes[0].id,
      });
    }
  }, [transactionTypes]);

  const checkIfRequired = useCallback((field) => {
    if (field === "accountNum") {
      if (formFields.paymentType === "C" || formFields.paymentType === "A") {
        return true;
      }
      return false;
    }
    return true;
  }, [formFields.paymentType]);

  return (
    <>
      <Alert
        open={showConfirmationDialog}
        title="Confirmation"
        message="Are you sure you want to create this billing?"
        applyButtonText="Continue"
        cancelButtonText="Cancel"
        applyForm={createBilling}
        cancelForm={closeConfirmationDialog}
      />
      <form onSubmit={onFormSubmit}>
        <Grid item md={4} className={classes.formInput}>
          <KeyboardDatePicker
            key="date"
            margin="dense"
            inputVariant="outlined"
            name="date"
            id="date"
            format="dd/MM/yyyy"
            label="Date"
            value={formFields.date}
            onChange={handleDateChange}
            fullWidth
            required
          />
        </Grid>
        {TransactionFormFields.map((item) => (
          <Grid
            key={item.name}
            container
            alignItems="center"
            className={classes.formInput}
          >
            <Grid item md={4}>
              {item.baseType === "input" ? (
                <TextField
                  variant="outlined"
                  margin="dense"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  required
                  fullWidth
                  value={formFields[item.name]}
                  onChange={(e) => handleInputChnage(e)}
                />
              ) : (
                <TextField
                  select
                  variant="outlined"
                  margin="dense"
                  label={item.label}
                  id={item.id}
                  name={item.name}
                  value={formFields[item.name]}
                  required={checkIfRequired(item.name)}
                  fullWidth
                  onChange={(e) => handleInputChnage(e)}
                >
                  {!!item.options && item.options.length ? item.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                  : renderOptionsForDropdowns(item.id)}
                </TextField>
              )}
            </Grid>
          </Grid>
        ))}
        <Grid item md={12} className={classes.m2}>
          <TextField
            variant="outlined"
            name="notes"
            label="Notes"
            type="text"
            required
            fullWidth
            value={formFields.notes}
            onChange={(e) => handleInputChnage(e)}
            multiline
            rows={5}
          />
        </Grid>

        <Grid container justify="space-between">
          <Button
            variant="outlined"
            type="submit"
          >
            Save
          </Button>
        </Grid>
      </form>
    </>
  );
};

NewTransactionForm.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default NewTransactionForm;
