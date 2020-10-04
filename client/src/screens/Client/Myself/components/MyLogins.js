import React, { useEffect, useState, useContext } from "react";
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
// import Tooltip from "@material-ui/core/Tooltip";
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

// const LightTooltip = withStyles((theme) => ({
//   tooltip: {
//     backgroundColor: theme.palette.common.white,
//     color: "rgba(0, 0, 0, 0.87)",
//     boxShadow: theme.shadows[1],
//     fontSize: 13,
//   },
// }))(Tooltip);

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

  const [logins, setLogins] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (userId != null) {
      MySelfService.getLogins(userId).then(
        (res) => {
          setLogins(res.data);
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
            My Logins
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page shows a user's logins
          </Typography>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell>IP address</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logins.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell component="th" scope="row">
                      {moment(row.dt).format("lll")}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.ip}
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
