import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
}));

const RadarGraph = ({ RadarGraphData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (RadarGraphData) {
      const solKeys = RadarGraphData.sol_keys;
      const latestSol = solKeys[solKeys.length - 1];
      const latestData = RadarGraphData[latestSol];

      // Convert metrics to array suitable for RadarChart
      const chartData = [
        { metric: "Temperature (°C)", value: latestData.AT?.av ?? 0 },
        { metric: "Wind Speed (m/s)", value: latestData.HWS?.av ?? 0 },
        { metric: "Pressure (Pa)", value: latestData.PRE?.av ?? 0 },
      ];

      setData(chartData);
    }
  }, [RadarGraphData]);

  return (
    <Item>
      <Typography variant="subtitle1" gutterBottom align="center">
        Latest Sol Weather Metrics
      </Typography>
      <ResponsiveContainer width="100%" minWidth={400} height={200}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Radar
            name="Mars Weather"
            dataKey="value"
            stroke="#8884d8"
            fill="#1976d2"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </Item>
  );
};

export default RadarGraph;
