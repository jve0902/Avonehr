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
import AccountingSearchResults from "./components";
import moment from "moment";

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
    maxWidth: "456px",
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
  const [amountFrom, setAmountFrom] = useState("-100");
  const [amountTo, setAmountTo] = useState("100");
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(7, "days").format("YYYY-MM-DD")
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [types, setTypes] = useState([]);
  const [selectType, setSelectedType] = useState("");
  const [searchResult, setSearchResults] = useState([]);

  const serachAccounts = (e) => {
    e.preventDefault();
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
      <div className={classes.paper}>
        <Grid container direction="column">
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
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => serachAccounts(e)}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  variant="outlined"
                  className={classes.textField}
                  value={amountFrom}
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
                  variant="outlined"
                  className={classes.textField}
                  value={amountTo}
                  margin="normal"
                  id="amountTo"
                  label="Amount To"
                  name="amountTo"
                  autoComplete="amountTo"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  onChange={(event) => setAmountTo(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  id="date"
                  label="Date From"
                  value={dateFrom}
                  className={classes.textField}
                  onChange={handleDateChangeFrom}
                  type="date"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  id="date"
                  label="Date To"
                  type="date"
                  value={dateTo}
                  className={classes.textField}
                  onChange={handleDateChangeTo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  variant="outlined"
                  className={classes.customSelect}
                  displayEmpty
                  value={selectType}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Types
                  </MenuItem>
                  {types.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onSubmit={() => serachAccounts()}
              >
                Search
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
      <div className={classes.serachResults}>
        {searchResult.length > 0 && (
          <AccountingSearchResults result={searchResult} />
        )}
      </div>
    </div>
  );
}
