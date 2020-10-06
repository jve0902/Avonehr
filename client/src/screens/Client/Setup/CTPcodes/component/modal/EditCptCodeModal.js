import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { colors, Grid } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  gridMargin: {
    margin: "8px 0px",
  },
  noteMargin: {
    margin: "15px 0px",
  },
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 120,
    },
  },
  formLabel: {
    fontSize: "14px",
    fontWeight: "600",
    width: "220px",
  },
  formHelperText: {
    width: "220px",
    fontSize: "12px",
    paddingLeft: "16px",
  },
  formField: {
    flex: 1,
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

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

const EditCptCodeModal = ({
  isOpen,
  hendleOnClose,
  cpt_id,
  cpt_description,
  cpt_fee,
  cpt_favorite,
  cpt_billable,
  cpt_notes,
  handleChangeFee,
  handleChangeFavorite,
  handleChangeBillable,
  handleChangeNotes,
  handleEditCptCode,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isOpen}
        onClose={hendleOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          Edit CPT Code
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            This page is used to edit cpt code
          </DialogContentText>
          <div className={classes.root}>
            <FormControl component="div" className={classes.formControl}>
              <Grid item md={3} className={classes.gridMargin}>
                <TextField
                  fullWidth={true}
                  label="CPT ID"
                  value={cpt_id}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={true}
                />
              </Grid>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <Grid item xs={6} md={9} className={classes.gridMargin}>
                <TextField
                  fullWidth={true}
                  label="CPT Description"
                  value={cpt_description}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={true}
                />
              </Grid>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <Grid item md={2} className={classes.gridMargin}>
                <TextField
                  fullWidth={true}
                  label="Fee"
                  value={cpt_fee ? cpt_fee : ""}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="$"
                  onChange={handleChangeFee}
                />
              </Grid>
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <GreenSwitch
                checked={Boolean(cpt_favorite)}
                size="small"
                name="switchBox"
                onChange={handleChangeFavorite}
              />
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <GreenSwitch
                checked={Boolean(cpt_billable)}
                size="small"
                name="switchBox"
                onChange={handleChangeBillable}
              />
            </FormControl>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                className={classes.noteMargin}
                fullWidth={true}
                variant="outlined"
                multiline
                name="note"
                label="Notes"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  rows: 8,
                }}
                value={cpt_notes}
                onChange={handleChangeNotes}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button
            size="small"
            variant="outlined"
            onClick={hendleOnClose}
            style={{
              borderColor: colors.orange[600],
              color: colors.orange[600],
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleEditCptCode}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCptCodeModal;
