import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LineChartBox = ({ title, dataKey, color, data }) => (
  <Box sx={{ width: "100%", height: 250 }}>
    <Typography variant="subtitle1" align="center" gutterBottom>
      {title}
    </Typography>
    <ResponsiveContainer width="100%" height="85%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sol" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={color} />
      </LineChart>
    </ResponsiveContainer>
  </Box>
);

const LineGraph = ({ lineGraphData }) => {
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    if (lineGraphData) {
      const parsed = Object.entries(lineGraphData)
        .filter(([key]) => key !== "sol_keys" && key !== "validity_checks")
        .map(([sol, data]) => ({
          sol,
          temp: data.AT?.av ?? null,
          wind: data.HWS?.av ?? null,
          pressure: data.PRE?.av ?? null,
        }));
      setGraphData(parsed);
    }
  }, [lineGraphData]);

  return (
    <Item sx={{ display: "flex", flexWrap: "wrap" }}>
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <LineChartBox
          title="Average Temperature (°C)"
          dataKey="temp"
          color="#8884d8"
          data={graphData}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <LineChartBox
          title="Average Wind Speed (m/s)"
          dataKey="wind"
          color="#82ca9d"
          data={graphData}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <LineChartBox
          title="Average Pressure (Pa)"
          dataKey="pressure"
          color="#ff7300"
          data={graphData}
        />
      </Box>
    </Item>
  );
};

export default LineGraph;
