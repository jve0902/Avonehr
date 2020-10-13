import React from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: "20px",
    // padding: "0 25px",
  },
  paper: {
    padding: "5px"
  },
  tableContainer: {
    minWidth: 650,
    marginTop: theme.spacing(2)
  },
  overFlowControl: {
    maxWidth: "130px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  patientLink: {
    color: theme.palette.text.link,
    cursor: "pointer"
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    fontWeight: 700
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    },
    "& th": {
      fontSize: 12
    },
    "& td": {
      fontSize: 12
    }
  }
}))(TableRow);

export default function PatientSearchResults(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Patient ID</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Middle Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">State</StyledTableCell>
              <StyledTableCell align="center">Postal Code</StyledTableCell>
              <StyledTableCell align="center">Country</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Phone Home</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Created</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.result.map((result, index) => (
              <StyledTableRow key={index}>
                <TableCell
                  className={classes.patientLink}
                  onClick={() => history.push(`/patient/${result.id}`)}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {result.id}
                </TableCell>
                <TableCell
                  className={classes.patientLink}
                  align="center"
                  onClick={() => history.push(`/patient/${result.id}`)}
                >
                  {result.firstname}
                </TableCell>
                <TableCell
                  className={classes.patientLink}
                  align="center"
                  onClick={() => history.push(`/patient/${result.id}`)}
                >
                  {result.middlename}
                </TableCell>
                <TableCell
                  className={classes.patientLink}
                  align="center"
                  onClick={() => history.push(`/patient/${result.id}`)}
                >
                  {result.lastname}
                </TableCell>
                <TableCell align="center">{result.city}</TableCell>
                <TableCell align="center">{result.state}</TableCell>
                <TableCell align="center">{result.postal}</TableCell>
                <TableCell align="center">{result.country}</TableCell>
                <TableCell align="center">{result.phone_cell}</TableCell>
                <TableCell align="center">{result.phone_home}</TableCell>
                <TableCell align="center">{result.email}</TableCell>
                <TableCell align="center">{result.gender}</TableCell>
                <TableCell align="center">
                  {moment(result.created).format("lll")}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

PatientSearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      middlename: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postal: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      phone_cell: PropTypes.string.isRequired,
      phone_home: PropTypes.email,
      email: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired
    })
  )
};
