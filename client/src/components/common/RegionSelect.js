import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const getRegions = (country) => {
  if (!country) {
    return [];
  }
  return country[2].split("|").map((regionPair) => {
    let [regionName = null, regionInShort] = regionPair.split("~");
    return [regionName, regionInShort];
  });
};

function RegionMUISelectors(props) {
  return (
    <TextField
      size={props.size || "medium"}
      id="state"
      label={props.label}
      value={props.region}
      select
      onChange={(e) => props.handleChange("region", e.target.value)}
      fullWidth
      variant={!!props.outlined ? "outlined" : "standard"}
    >
      {getRegions(props.country).map((option, index) => (
        <MenuItem key={option[0]} value={option[1]}>
          {option[0]}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default RegionMUISelectors;
