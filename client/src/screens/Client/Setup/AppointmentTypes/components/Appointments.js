import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 650,
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
  overflowControl: {
    maxWidth: "130px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
}));
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0,0,0,0.87)",
    boxShadow: theme.shadows[1],
    fontSizw: 13
  }
}))(Tooltip);
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

const Appointments = ({ appointments, onEdit, onDelete, ...props }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Appointment Type</StyledTableCell>
            <StyledTableCell>Portal Name</StyledTableCell>
            <StyledTableCell>Minutes</StyledTableCell>
            <StyledTableCell>Patient Schedule</StyledTableCell>
            <StyledTableCell>Order</StyledTableCell>
            <StyledTableCell align="center">Note</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>Created By</StyledTableCell>
            <StyledTableCell>Updated</StyledTableCell>
            <StyledTableCell>Updated By</StyledTableCell>
            <StyledTableCell /*align="center"*/>Actions</StyledTableCell>
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
              {appointment.note && appointment.note.length > 0 ? (
                <LightTooltip title={appointment.note}>
                  <TableCell className={classes.overflowControl} align="center">
                    {appointment.note}
                  </TableCell>
                </LightTooltip>
              ) : (
                <TableCell className={classes.overflowControl} align="center">
                  {appointment.note || ""}
                </TableCell>
              )}
              <TableCell>{appointment.active ? "Active" : "-"}</TableCell>
              <TableCell>{moment(appointment.created).format("lll")}</TableCell>
              <TableCell>{appointment.created_user}</TableCell>
              <TableCell>
                {appointment.updated
                  ? moment(appointment.updated).format("lll")
                  : "-"}
              </TableCell>
              <TableCell>{appointment.updated_user || "-"}</TableCell>
              <TableCell className={classes.actions}>
                <IconButton
                  aria-label="edit"
                  className={classes.margin}
                  onClick={() => onEdit(appointment.id)}
                >
                  <EditIcon fontSize="medium" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={() => onDelete(appointment.id)}
                >
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Appointments;
