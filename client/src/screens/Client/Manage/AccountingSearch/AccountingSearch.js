import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import Accounting from '../../../../services/accountingSerarch.service';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '40px 0px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formElments: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: '180px',
  },
  dateInput: {
    padding: '10px',
  },
  customSelect: {
    width: '185px',
  },
  type: {
    marginTop: '10px',
  },
}));
const CustomInput = ({ value, onClick }) => {
  const classes = useStyles();

  return (
    <input value={value} className={classes.dateInput} onClick={onClick} />
  );
};
export default function AccountingSearch() {
  const classes = useStyles();
  const [amountFrom, setAmountFrom] = React.useState('');
  const [amountTo, setAmountTo] = React.useState('');
  const [dateFrom, setDateFrom] = React.useState(new Date());
  const [dateTo, setDateTo] = React.useState(new Date());
  const [type, setType] = React.useState('');
  const [allAccount, setAllAccounts] = React.useState([]);

  const fetchAllAccount = () => {
    const payload = {
      amount1: amountFrom,
      amount2: amountTo,
    };
    Accounting.getAccounting(payload).then((res) => {
      setAllAccounts(res.data);
    });
  };

  useEffect(() => {
    fetchAllAccount();
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleDateChangeFrom = (date) => {
    setDateFrom(date);
  };
  const handleDateChangeTo = (date) => {
    setDateTo(date);
  };
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Accounting Search
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is used to search accounting records
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={amountFrom}
              variant="outlined"
              margin="normal"
              id="email"
              label="Amount From"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setAmountFrom(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={amountTo}
              variant="outlined"
              margin="normal"
              id="email"
              label="Amount To"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setAmountTo(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="body2" color="textPrimary">
              Date From
            </Typography>
            <DatePicker
              selected={dateFrom}
              onChange={handleDateChangeFrom}
              customInput={<CustomInput />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="body2" color="textPrimary">
              Date To
            </Typography>
            <DatePicker
              selected={dateTo}
              onChange={handleDateChangeTo}
              customInput={<CustomInput />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              className={classes.type}
              component="p"
              variant="body2"
              color="textPrimary"
            >
              Type
            </Typography>
            <Select
              className={classes.customSelect}
              displayEmpty
              value={type}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Insurance Form Fee
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Button
          disabled={!dateFrom || !dateTo || !type || !amountFrom || !amountTo}
          variant="contained"
          color="primary"
          className={classes.submit}
          // onClick={(event) => onFormSubmit(event, login)}
        >
          Search
        </Button>
      </form>
    </div>
  );
}

AccountingSearch.propTypes = {};
