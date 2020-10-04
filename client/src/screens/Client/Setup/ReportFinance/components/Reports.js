import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import NumberFormat from "react-number-format";
import moment from "moment";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 1000,
    marginTop: theme.spacing(2),
  },
  actions: {
    textAlign: "center",
    display: "flex",
    border: "none",
    "& button": {
      fontSize: "12px",
    },
  },
  detailLink: {
    color: theme.palette.text.link,
    cursor: "pointer",
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
      height: "50px",
    },
  },
}))(TableRow);

const Reports = ({ reports, ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Year</StyledTableCell>
            <StyledTableCell>Month</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Service</StyledTableCell>
            <StyledTableCell>Credit</StyledTableCell>
            <StyledTableCell>Payment</StyledTableCell>
            <StyledTableCell>Refund</StyledTableCell>
            <StyledTableCell>Detail</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <StyledTableRow key={report.id}>
              <TableCell component="th" scope="row">
                {report.year}
              </TableCell>
              <TableCell>{moment(report.month, "M").format("MMM")}</TableCell>
              <TableCell>
                <NumberFormat
                  prefix="$"
                  displayType="text"
                  value={report.Total}
                />
              </TableCell>
              <TableCell>
                <NumberFormat
                  prefix="$"
                  displayType="text"
                  value={report.Service}
                />
              </TableCell>
              <TableCell>
                <NumberFormat
                  prefix="$"
                  displayType="text"
                  value={report.Credit}
                />
              </TableCell>
              <TableCell>
                <NumberFormat
                  prefix="$"
                  displayType="text"
                  value={report.Payment}
                />
              </TableCell>
              <TableCell>
                <NumberFormat
                  prefix="$"
                  displayType="text"
                  value={report.Refund}
                />
              </TableCell>
              <TableCell
                className={classes.detailLink}
                onClick={() =>
                  history.push(
                    `/reports/report-finance-detail/${report.year}/${report.month}`
                  )
                }
              >
                Detail
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Reports;
