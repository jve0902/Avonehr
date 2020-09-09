import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '40px 0px',
  },
  title: {
    paddingBottom: theme.spacing(1),
  },

  tableContainer: {
    minWidth: 650,
    marginTop: theme.spacing(2),
    maxWidth: '70%',
  },

  actions: {
    textAlign: 'center',
    display: 'flex',
    border: 'none',
    '& button': {
      fontSize: '12px',
    },
  },
  customSelect: {
    width: '185px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: '180px',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: '12px',
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '& th': {
      fontSize: 12,
    },
    '& td': {
      fontSize: 12,
    },
  },
}))(TableRow);

export default function Support() {
  const classes = useStyles();
  const [cases, setCases] = useState('');
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Technical Support
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl className={classes.customSelect}>
            <InputLabel id="opneCases">View open cases</InputLabel>
            <Select
              labelId="opneCases"
              id="openCases"
              value={cases}
              onChange={(event) => setCases(event.target.value)}
            >
              <MenuItem value={10}>Case 1</MenuItem>
              <MenuItem value={20}>Case 2</MenuItem>
              <MenuItem value={30}>Case 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Button
          disabled={!cases}
          variant="contained"
          color="primary"
          className={classes.submit}
          // onClick={(event) => serachAccounts()}
        >
          New Case
        </Button>
      </Grid>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is used for support
      </Typography>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Case Id</StyledTableCell>
              <StyledTableCell>Client</StyledTableCell>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell>Created By</StyledTableCell>
              <StyledTableCell>Updated</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
