import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import PatientService from "../../../../services/patient.service";
import { setError, setSuccess } from "../../../../store/common/actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 9,
  },
  tableContainer: {
    // minWidth: 650,
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
    padding: '6px 16px 6px 0px',
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    cursor: "pointer"
  },
}))(TableRow);

const Content = (props) => {
  const { data, reloadData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const onItemDelete = (selectedItem) => {
    const documentId = selectedItem.id || 1;
    const tab = "Labs";
    PatientService.deleteDocument(documentId, tab)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        reloadData();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        let severity = "error";
        dispatch(
          setError({
            severity: severity,
            message: resMessage,
          })
        );
      });
  };

  return (
    <TableContainer className={classes.tableContainer}>
      <Table size="small" className={classes.table}>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow onClick={() => alert(row.filename)} key={`${row.created}_${index}`}>
              <StyledTableCell component="th" scope="row">
                {moment(row.created).format("MMM, DD, YYYY")}
              </StyledTableCell>
              <StyledTableCell>{row.filename}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Content;
