import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid
} from "@material-ui/core";
import ContextMenu from "../Messages/contextMenu";
import PatientService from "../../../services/patient.service";
import { setError, setSuccess } from '../../../store/common/actions';
import { useDispatch } from "react-redux";

export default function Content(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, reloadData } = props;

  const [element, setElement] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const menuHandler = (e, item) => {
    setElement(e.currentTarget);
    setSelectedItem(item);
  }

  const onItemDelete = () => {
    const allergyId = selectedItem.drug_id;
    PatientService.deleteAllergy(allergyId)
      .then((response) => {
        dispatch(setSuccess(`${response.data.message}`));
        reloadData();
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
    {/* <ContextMenu
        element={element}
        deleteHandler={() => onItemDelete()}
        menu={[
          {
            label: 'Edit',
            value: 'edit',
          },
          {
            label: 'Delete',
            value: 'delete',
          },
        ]}
      /> */}
      {
        data.map(item => (
          <Grid key={item.drug_id} className={classes.inputRow} onContextMenu={(e) => menuHandler(e, item)}>
            <Grid component="span">
              {item.name}
            </Grid>
          </Grid>
        ))
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(1),
  },
}));
