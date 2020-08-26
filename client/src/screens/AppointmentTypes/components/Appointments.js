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
import { colors } from "@material-ui/core";

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

const Appointments = ({ appointments, onEdit, onDelete, ...props }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="a dense table">
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
            <StyledTableRow key={appointment.id}>
              <TableCell component="th" scope="row">
                {appointment.appointment_type}
              </TableCell>
              <TableCell>{appointment.appointment_name_portal}</TableCell>
              <TableCell>{appointment.length}</TableCell>
              <TableCell>
                {appointment.allow_patients_schedule ? "Yes" : "No"}
              </TableCell>
              <TableCell>{appointment.sort_order}</TableCell>
              <TableCell>{appointment.note}</TableCell>
              <TableCell>{appointment.active ? "Active" : ""}</TableCell>
              <TableCell>{moment(appointment.created).format("lll")}</TableCell>
              <TableCell>{appointment.created_user}</TableCell>
              <TableCell>{moment(appointment.updated).format("lll")}</TableCell>
              <TableCell>{appointment.updated_user}</TableCell>
              <TableCell className={classes.actions}>
                <React.Fragment>
                  <Button
                    color="primary"
                    onClick={() => onEdit(appointment.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => onDelete(appointment.id)}
                    style={{
                      color: colors.red[600],
                    }}
                  >
                    Delete
                  </Button>
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
