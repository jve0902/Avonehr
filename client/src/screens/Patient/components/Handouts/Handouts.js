import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Button,
  Grid,
  Typography,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import PatientService from "../../../../services/patient.service";
import { setError, setSuccess } from "../../../../store/common/actions";
import { useDispatch } from "react-redux";

const HandoutsForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onClose, reloadData } = props;
  const [allHandouts, setAllHandouts] = useState([]);

  useEffect(() => {
    fetchAllHandouts();
  },[])

  const fetchAllHandouts = () => {
    PatientService.getAllHandouts().then((res) => {
        setAllHandouts(res.data);
      });
  }

  const createPatientHandoutHandler = () => {
    const reqBody = {
        data : {
            "patient_id": 1,
            "handout_id": 1,
            "admin_note": "admin_note",
            "old_admin_note": "old_admin_note"
        }
      };
      // TODO:: static for the time being - discussion required

    PatientService.createPatientHandout(reqBody)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        reloadData();
        onClose();
      })
      .catch((error) => {
        const resMessage = (error.response && error.response.data &&
          error.response.data.message) || error.message || error.toString();
        let severity = "error";
        dispatch(
          setError({
            severity: severity,
            message: resMessage,
          })
        );
      })
  }

  return (
    <>
      <Typography variant="h3" color="textSecondary" gutterBottom>
        Patient Handouts
      </Typography>

      <TableContainer className={classes.tableContainer}>
      <Table size="small" className={classes.table}>
        <TableBody>
          {allHandouts.map((row, index) => (
            <TableRow key={`${row.created}_${index}`}>
                <TableCell padding="checkbox">
                <Checkbox
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    // onChange={onSelectAllClick}
                    // inputProps={{ 'aria-label': 'select all desserts' }}
                />
                </TableCell>
              <TableCell component="th" scope="row">
                {moment(row.created).format("MMM, DD, YYYY")}
              </TableCell>
              <TableCell>{row.filename}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Grid
        className={classes.actionContainer}
        container
        justify="space-between"
      >
        <Button
          variant="outlined"
          onClick={() => createPatientHandoutHandler()}
          type="submit"
        >
          Save
        </Button>
        <Button variant="outlined" onClick={() => onClose()}>
          Cancel
        </Button>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  processPaymentButton: {
    margin: theme.spacing(3, 0),
  },
  amountContainer: {
    marginLeft: "0px !important",
  },
  formInput: {
    marginBottom: theme.spacing(1),
  },
  actionContainer: {
    marginTop: theme.spacing(4),
  },
}));

export default HandoutsForm;

