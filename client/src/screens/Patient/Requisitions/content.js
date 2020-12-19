import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import Tooltip from "../../../components/common/CustomTooltip";
import usePatientContext from "../../../hooks/usePatientContext";

const useStyles = makeStyles((theme) => ({
  text12: {
    fontSize: 12,
  },
  inputRow: {
    marginBottom: theme.spacing(0.5),
    flexWrap: "nowrap",
  },
  block: {
    width: 90,
    minWidth: 90,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  fullWidth: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
}));

const RequisitionsContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.requisitions;

  return (
    <>
      {
        data.map((item) => (
          <Grid key={item.id} container className={classes.inputRow}>
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {moment(item.created).format("MMM D YYYY")}
            </Typography>
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {item.id}
            </Typography>
            {
              !!item.cpt_name && item.cpt_name.length > 30
                ? (
                  <Tooltip title={item.cpt_name}>
                    <Typography
                      component="span"
                      className={`${classes.text12} ${classes.fullWidth}`}
                      color="textPrimary"
                    >
                      {item.cpt_name}
                    </Typography>
                  </Tooltip>
                )
                : (
                  <Typography
                    component="span"
                    className={`${classes.text12} ${classes.fullWidth}`}
                    color="textPrimary"
                  >
                    {item.cpt_name}
                  </Typography>
                )
            }
          </Grid>
        ))
      }
    </>
  );
};

export default RequisitionsContent;
