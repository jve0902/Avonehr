import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";
import {
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid #333",
    padding: theme.spacing(1),
    background: "#fff",
    borderRadius: "10px",
  },
}));

const CustomTooltip = ({ payload }) => {
  const classes = useStyles();

  if (payload && payload.length) {
    return (
      <div className={classes.root}>
        <p className="label">
          {`Date : ${moment(payload[0]?.payload?.lab_dt).format(
            "MMMM Do YYYY, h:mm A",
          )}`}
        </p>
        <p className="label">{`File : ${payload[0]?.payload?.filename}`}</p>
        <p className="label">{`Value : ${payload[0]?.payload?.value}`}</p>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  payload: PropTypes.instanceOf(Array).isRequired,
};

const Graph = ({ data, range, conventionalRange }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (data) {
      const tempData = data.map((d) => ({
        id: d.id,
        lab_dt: d.lab_dt,
        filename: d.filename,
        value: d.value,
        year: moment(d.lab_dt).format("MMM-YYYY"),
      }));
      setGraphData(tempData);
    }
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={550}>
      <LineChart
        width={1300}
        height={550}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="year"
          interval={0}
          style={{
            fontSize: "0.9rem",
          }}
        />
        <YAxis
          type="number"
          domain={[parseInt(conventionalRange.low, 10), Math.round(conventionalRange.high)]}
          interval={0}
          tickCount={6}
          style={{
            fontSize: "0.9rem",
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={conventionalRange?.high}
          label={{
            position: "insideTopLeft", value: "Conventional range", fontSize: "0.6rem", fill: "#477fc9",
          }}
          stroke="#477fc9"
        />
        <ReferenceLine
          y={range?.high}
          label={{
            position: "insideBottomLeft", value: "Functional range", fontSize: "0.6rem", fill: "#477fc9",
          }}
          stroke="#477fc9"
        />
        <ReferenceLine
          y={range?.low}
          label={{
            position: "insideTopLeft", value: "Functional range", fontSize: "0.6rem", fill: "#477fc9",
          }}
          stroke="#477fc9"
        />
        <ReferenceLine
          y={conventionalRange?.low}
          label={{
            position: "insideBottomLeft", value: "Conventional range", fontSize: "0.6rem", fill: "#477fc9",
          }}
          stroke="#477fc9"
        />
        <Line
          animationDuration={0}
          strokeWidth={2}
          type="monotone"
          dataKey="value"
          fill="#477fc9"
          stroke="#477fc9"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

Graph.propTypes = {
  data: PropTypes.oneOfType([PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      lab_dt: PropTypes.string,
      filename: PropTypes.string,
      value: PropTypes.number,
    }),
  ), PropTypes.any]).isRequired,
  range: PropTypes.oneOfType([
    PropTypes.shape({
      high: PropTypes.number,
      low: PropTypes.number,
    }),
    PropTypes.bool,
  ]).isRequired,
  conventionalRange: PropTypes.oneOfType([
    PropTypes.shape({
      high: PropTypes.number,
      low: PropTypes.number,
    }),
    PropTypes.bool,
  ]).isRequired,
};

export default Graph;
