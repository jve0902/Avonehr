import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  controlLabel: {
    marginLeft: "0px",
  },
  input: {
    padding: "10.5px",
  },
  formStyle: {
    display: "flex",
  },
  gridMargin: {
    marginRight: "10px",
    marginBottom: "8px",
  },
  submit: {
    paddingLeft: "30px",
    paddingRight: "30px",
    // fontSize: "1rem",
    marginTop: "8px",
  },
}));

const CPTform = ({
  labCompanyId,
  lebCompanyList,
  handleFormSubmition,
  handleChangeOfCptId,
  handleChangeOfCptDescription,
  handleChangeOfLabCompanyId,
  handleChangeOfFavorite,
  handleChangeOfBillable,
  handleChangeOfSelf,
  handleChangeOfGroup,
}) => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "15px" }}>
      <form onSubmit={(e) => handleFormSubmition(e)}>
        <Grid className={classes.formStyle}>
          <Grid item xs={12} md={2} className={classes.gridMargin}>
            <TextField
              fullWidth={true}
              autoFocus={true}
              label="CPT ID"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeOfCptId}
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.gridMargin}>
            <TextField
              fullWidth={true}
              label="CPT Description"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeOfCptDescription}
            />
          </Grid>
          <Grid item xs={12} md={2} className={classes.gridMargin}>
            <TextField
              fullWidth={true}
              id="outlined-select-currency"
              select
              label="Lab Company"
              value={labCompanyId}
              onChange={handleChangeOfLabCompanyId}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {lebCompanyList.map((lab) => (
                <MenuItem key={lab.id} value={lab.id}>
                  {lab.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <FormControlLabel
          control={
            <Checkbox
              name="favorite"
              onChange={handleChangeOfFavorite}
              color="primary"
              size="small"
            />
          }
          label="Favorites"
          labelPlacement="start"
          className={classes.controlLabel}
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChangeOfBillable}
              name="billable"
              color="primary"
              size="small"
            />
          }
          label="Billable"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChangeOfSelf}
              name="self"
              color="primary"
              size="small"
            />
          }
          label="Self"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChangeOfGroup}
              name="group"
              color="primary"
              size="small"
            />
          }
          label="Group"
          labelPlacement="start"
        />
        <br />
        <Button
          size="medium"
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default CPTform;
