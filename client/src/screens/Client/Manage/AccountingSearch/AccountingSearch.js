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
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

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
    marginTop: theme.spacing(1),
  },
  formElments: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: '20px',
    // maxWidth: '180px',
  },
  customSelect: {
    width: '200px',
  },
  type: {
    marginTop: '20px',
    marginBottom: '5px',
  },
  paper: {
    padding: '25px',
    maxWidth: '500px',
  },
  textField: {
    width: '200px',
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

  const serachAccounts = () => {
    const payload = {
      amount1: amountFrom,
      amount2: amountTo,
    };
    Accounting.getAccounting(payload).then((res) => {
      setAllAccounts(res.data);
    });
  };

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
      <Grid container direction="column">
        <Paper className={classes.paper}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
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
                    id="amountFrom"
                    label="Amount From"
                    name="amountFrom"
                    autoComplete="amountFrom"
                    autoFocus
                    onChange={(event) => setAmountFrom(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={amountTo}
                    variant="outlined"
                    margin="normal"
                    id="amountTo"
                    label="Amount To"
                    name="amountTo"
                    autoComplete="amountTo"
                    // autoFocus
                    onChange={(event) => setAmountTo(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="date"
                    label="Date From"
                    variant="outlined"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <Typography component="p" variant="body2" color="textPrimary">
                    Date To
                  </Typography>
                  <DatePicker
                    selected={dateTo}
                    onChange={handleDateChangeTo}
                    customInput={<CustomInput />}
                  /> */}
                  <TextField
                    variant="outlined"
                    id="date"
                    label="Date To"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    className={classes.type}
                    component="p"
                    variant="subtitle2"
                    color="textPrimary"
                  >
                    Type
                  </Typography>
                  <Select
                    variant="outlined"
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
                disabled={
                  !dateFrom || !dateTo || !type || !amountFrom || !amountTo
                }
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(event) => serachAccounts()}
              >
                Search
              </Button>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

AccountingSearch.propTypes = {};
