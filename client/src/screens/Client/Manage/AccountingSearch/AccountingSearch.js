//Todo: Have to add validation
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Accounting from "../../../../services/accountingSearch.service";
import Paper from "@material-ui/core/Paper";
import AccountingSearchResults from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
  },
  formElments: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "20px",
  },
  customSelect: {
    width: "200px",
  },
  type: {
    marginTop: "20px",
  },
  paper: {
    padding: "25px",
    maxWidth: "500px",
  },
  textField: {
    width: "200px",
  },
  serachResults: {
    marginTop: "55px",
  },
}));

export default function AccountingSearch() {
  const classes = useStyles();
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [types, setTypes] = useState([]);
  const [selectType, setSelectedType] = useState("");
  const [searchResult, setSearchResults] = useState([]);

  const serachAccounts = () => {
    const payload = {
      data: {
        amount1: amountFrom,
        amount2: amountTo,
      },
    };
    Accounting.search(payload).then((res) => {
      setSearchResults(res.data.data);
    });
  };

  useEffect(() => {
    Accounting.searchType().then((res) => setTypes(res.data.data));
  }, []);

  const handleChange = (event) => {
    setSelectedType(event.target.value);
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
                    value={selectType}
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Insurance Form Fee
                    </MenuItem>
                    {types.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Button
                disabled={!amountFrom || !amountTo}
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
      <div className={classes.serachResults}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.title}
        >
          Records
        </Typography>

        <AccountingSearchResults result={searchResult} />
      </div>
    </div>
  );
}
