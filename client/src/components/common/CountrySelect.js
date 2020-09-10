import React from 'react'
import { CountryRegionData } from "react-country-region-selector";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

function CountryRegionMUISelectors(props) {
  return (
      <TextField
        id="country"
        label="Country"
        value={props.country}
        select
        onChange={(e) => props.handleChange("country", e.target.value)}
        fullWidth
      >
        {CountryRegionData.map((option, index) => (
          <MenuItem key={option[0]} value={option}>
            {option[0]}
          </MenuItem>
        ))}
      </TextField>
  )
}

export default CountryRegionMUISelectors;