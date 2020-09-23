import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import DrugsService from "../../../../../services/drugs.service";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 450,
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

const GreenSwitch = withStyles({
  switchBase: {
    color: grey[300],
    "&$checked": {
      color: green[500],
    },
    "&$checked + $track": {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const Drugstable = ({ user, result }) => {
  const classes = useStyles();

  let [favorite, setFavorite] = useState();

  const changeHandler = (event, drug_id, drug_favorite) => {
    const payload = {
      drug_id,
    };
    let checked = event.target.checked;
    setFavorite((drug_favorite = checked));
    if (favorite !== true) {
      DrugsService.addFavorite(drug_id, user.id, payload).then((res) => {
        console.log(res.data.data);
      });
    } else {
      DrugsService.deleteFavorite(drug_id).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Favorites</StyledTableCell>
            <StyledTableCell>Updated</StyledTableCell>
            <StyledTableCell>Updated By</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((drug) => (
            <StyledTableRow key={drug.id}>
              <TableCell component="th" scope="row">
                {drug.name}
              </TableCell>
              <TableCell>
                <GreenSwitch
                  size="small"
                  checked={favorite}
                  name="checkedB"
                  onChange={(e) => changeHandler(e, drug.id, drug.favorite)}
                />
              </TableCell>
              <TableCell>{drug.updated}</TableCell>
              <TableCell>{drug.updated_name}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Drugstable;
