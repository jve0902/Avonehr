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
    // marginTop: "20px",
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
        {props.result.length !== 0 ? (
          <Table className={classes.table} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Patient Name</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Client Id</StyledTableCell>
                <StyledTableCell>CPT Id</StyledTableCell>
                <StyledTableCell>CPT Name</StyledTableCell>
                <StyledTableCell>Note</StyledTableCell>
                <StyledTableCell>Created</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Patient Id</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.result.map((result, index) => (
                <StyledTableRow key={index}>
                  <TableCell component="th" scope="row">
                    {result.name}
                  </TableCell>
                  <TableCell
                    //Todo: Link to patient page
                    className={classes.patientLink}
                  >
                    {result.patient_name}
                  </TableCell>
                  <TableCell>{result.amount}</TableCell>
                  <TableCell>{result.client_id}</TableCell>
                  <TableCell>{result.cpt_id ? result.cpt_id : "N/A"}</TableCell>
                  <TableCell>
                    {result.cpt_name ? result.cpt_name : "N/A"}
                  </TableCell>
                  <TableCell align="center">{result.note || "-"}</TableCell>
                  <TableCell>{moment(result.created).format("lll")}</TableCell>
                  <TableCell>{result.encounter_title}</TableCell>
                  <TableCell>{result.patient_id}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className={classes.placeholderText}>
            Search For Accounting Records
          </div>
        )}
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
