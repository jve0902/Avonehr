import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { appointments } from "./Data";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 650,
    marginTop: theme.spacing(2),
  },
  actions: {
    textAlign: "center",
    display: "flex",
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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Appointments = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} size="tiny" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Appointment Type</StyledTableCell>
            <StyledTableCell>Appointment Name Portal</StyledTableCell>
            <StyledTableCell>Minutes</StyledTableCell>
            <StyledTableCell>Allow Patients Schedule</StyledTableCell>
            <StyledTableCell>Sort Order</StyledTableCell>
            <StyledTableCell>Note</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>Created By</StyledTableCell>
            <StyledTableCell>Updated</StyledTableCell>
            <StyledTableCell>Updated By</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <StyledTableRow key={appointment.name} key={appointment.key}>
              <TableCell component="th" scope="row">
                {appointment.type}
              </TableCell>
              <TableCell align="right">{appointment.aptNamePortal}</TableCell>
              <TableCell align="right">{appointment.minutes}</TableCell>
              <TableCell align="right">
                {appointment.allowPatientSchedule}
              </TableCell>
              <TableCell align="right">{appointment.sortOder}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">{appointment.status}</TableCell>
              <TableCell align="right">{moment().format("ll")}</TableCell>
              <TableCell align="right">{appointment.createdBy}</TableCell>
              <TableCell align="right">{moment().format("ll")}</TableCell>
              <TableCell align="right">{appointment.updatedBy}</TableCell>
              <TableCell className={classes.actions}>
                <React.Fragment>
                  <Button color="primary">Edit</Button>
                  <Button color="secondary">Delete</Button>
                </React.Fragment>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Appointments;
