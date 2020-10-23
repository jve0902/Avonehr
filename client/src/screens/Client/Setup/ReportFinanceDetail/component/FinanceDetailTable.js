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
import { useHistory } from "react-router-dom";

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
  },
  detailLink: {
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
      fontSize: 12,
      height: "50px"
    }
  }
}))(TableRow);

const FinanceDetailTable = ({ financeDetail }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Encounter Tile</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Note</StyledTableCell>
              <StyledTableCell>CPT Name</StyledTableCell>
              <StyledTableCell>Created</StyledTableCell>
              <StyledTableCell>Patient</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financeDetail.map((detail) => (
              <StyledTableRow key={detail.id}>
                <TableCell component="th" scope="row">
                  {detail.name}
                </TableCell>
                <TableCell>{detail.encounter_title}</TableCell>
                <TableCell>
                  {detail.dt ? moment(detail.dt).format("lll") : ""}
                </TableCell>
                <TableCell>
                  <NumberFormat
                    value={detail.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell>{detail.note}</TableCell>
                <TableCell>{detail.cpt_name}</TableCell>
                <TableCell>
                  {detail.created ? moment(detail.created).format("lll") : ""}
                </TableCell>
                <TableCell
                  className={classes.detailLink}
                  onClick={() => history.push(`/patient/${detail.hyperlink}`)}
                >
                  {detail.patient_name}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FinanceDetailTable;
