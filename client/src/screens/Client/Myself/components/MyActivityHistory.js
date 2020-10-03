import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { setError } from "../../../../store/common/actions";
import MySelfService from "../../../../services/myself.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: "5px",
  },
  tableContainer: {
    width: 500,
    marginTop: theme.spacing(1),
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
  overFlowControl: {
    maxWidth: "130px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
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

export default function MyActivityHistory(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [activityHistory, setActivityHistory] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (userId != null) {
      MySelfService.getActivityHistory(userId).then(
        (res) => {
          setActivityHistory(res.data);
        },
        (error) => {
          dispatch(setError(error));
        }
      );
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Grid container direction="column" justify="center">
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            My Activity History
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page shows a user's activity history
          </Typography>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell>Patient</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityHistory.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell component="th" scope="row">
                      {moment(row.dt).format("lll")}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.patient}
                    </TableCell>
                    <TableCell className={classes.patientLink}>
                      {row.action}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
    </div>
  );
}
