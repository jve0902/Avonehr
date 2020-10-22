import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles
} from "@material-ui/core";
import React from "react";
import moment from "moment";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 450,
    marginTop: theme.spacing(2)
  },
  actions: {
    textAlign: "center",
    display: "flex",
    border: "none",
    "& button": {
      fontSize: "12px"
    }
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
      fontSize: 12,
      height: "50px"
    }
  }
}))(TableRow);

const AccountingTypesTable = ({ result }) => {
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Ammount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Note</StyledTableCell>
              <StyledTableCell>Client</StyledTableCell>
              <StyledTableCell>Created</StyledTableCell>
              <StyledTableCell>Created By</StyledTableCell>
              <StyledTableCell>Updated</StyledTableCell>
              <StyledTableCell>Updated By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((type) => (
              <StyledTableRow key={type.id}>
                <TableCell component="th" scope="row">
                  {type.name}
                </TableCell>
                <TableCell>
                  <NumberFormat
                    value={type.ammount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell>
                  {type.status === "A"
                    ? "Active"
                    : type.status === "I"
                    ? "Inactive"
                    : type.status === "D"
                    ? "Deleted"
                    : ""}
                </TableCell>
                <TableCell>{type.note}</TableCell>
                <TableCell>
                  {type.client_name === null ? "All" : type.client_name}
                </TableCell>
                <TableCell>
                  {type.created ? moment(type.created).format("lll") : ""}
                </TableCell>
                <TableCell>{type.created_user}</TableCell>
                <TableCell>
                  {type.updated ? moment(type.updated).format("lll") : ""}
                </TableCell>
                <TableCell>{type.updated_user}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AccountingTypesTable;
