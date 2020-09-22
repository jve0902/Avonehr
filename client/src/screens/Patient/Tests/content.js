import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 650,
  },
  actions: {
    textAlign: "center",
    display: "flex",
    border: "none",
    "& button": {
      fontSize: "12px",
    },
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
      height: "50px"
    },
  },
}))(TableRow);

const Content = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer}>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>Test</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>Lab Date</StyledTableCell>
            <StyledTableCell>Physician</StyledTableCell>
            <StyledTableCell align="center">Conventional Flag</StyledTableCell>
            <StyledTableCell>Functional Flag</StyledTableCell>
            <StyledTableCell>Error</StyledTableCell>
            <StyledTableCell>Notes</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <TableCell component="th" scope="row">
                {moment(row.created).format("MMM, DD, YYYY")}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.lab_dt ? moment(row.lab_dt).format("MMM, DD, YYYY") : "-"}</TableCell>
              <TableCell>{row.physician}</TableCell>
              <TableCell>{row.physician}</TableCell>
              <TableCell>{row.physician}</TableCell>
              <TableCell>{row.upload_error}</TableCell>
              <TableCell>{row.note}</TableCell>

              <TableCell className={classes.actions}>
                <Button variant="text">Delete</Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Content;
