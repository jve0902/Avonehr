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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 25px",
  },
  paper: {
    padding: "5px",
  },
  tableContainer: {
    minWidth: 650,
    marginTop: theme.spacing(2),
  },
  patientLink: {
    color: "#2979FF",
    cursor: "pointer",
  },
  placeholderText: {
    textAlign: "center",
    padding: "100px",
    fontWeight: "500",
    fontSize: "30px",
    opacity: "20%",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& th": {
      fontSize: 12,
    },
    "& td": {
      fontSize: 12,
    },
  },
}))(TableRow);

export default function AccountingSearchResults(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Encounter</StyledTableCell>
              <StyledTableCell>CPT Id</StyledTableCell>
              <StyledTableCell>CPT Name</StyledTableCell>
              <StyledTableCell>Note</StyledTableCell>
              <StyledTableCell>Patient</StyledTableCell>
              <StyledTableCell>Created</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.result.map((result, index) => (
              <StyledTableRow key={index}>
                <TableCell component="th" scope="row">
                  {moment(result.dt).format("lll")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {result.name}
                </TableCell>
                <TableCell>{result.amount}</TableCell>
                <TableCell>{result.encounter_title}</TableCell>
                <TableCell>{result.cpt_id ? result.cpt_id : "N/A"}</TableCell>
                <TableCell>
                  {result.cpt_name ? result.cpt_name : "N/A"}
                </TableCell>
                <TableCell>{result.note || "-"}</TableCell>
                <TableCell
                  //Todo: Link to patient page
                  className={classes.patientLink}
                >
                  {result.patient_name}
                </TableCell>
                <TableCell>{moment(result.created).format("lll")}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

AccountingSearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      client_id: PropTypes.string.isRequired,
      cpt_id: PropTypes.string,
      cpt_name: PropTypes.string,
      created: PropTypes.string.isRequired,
      encounter_title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      note: PropTypes.string,
      patient_id: PropTypes.number.isRequired,
      patient_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
