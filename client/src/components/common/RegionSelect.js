import React from 'react'
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const getRegions = country => {
  if (!country) {
    return [];
  }
  return country[2].split("|").map(regionPair => {
    let [regionName = null] = regionPair.split("~");
    return regionName;
  });
};

function RegionMUISelectors(props) {
  return (
      <TextField
        id="region"
        label="Region"
        value={props.region}
        select
        onChange={(e) => props.handleChange("region", e.target.value)}
        fullWidth
      >
        {getRegions(props.country).map(
          (option, index) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
        )}
      </TextField>
  )
}

export default RegionMUISelectors;
