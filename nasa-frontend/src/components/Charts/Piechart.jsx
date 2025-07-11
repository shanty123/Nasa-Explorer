import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PieChart } from "@mui/x-charts/PieChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const PieGraph = ({ pieGraphData }) => {
  const [weatherData, setWeatherData] = useState(pieGraphData);
  const [radius, setRadius] = useState(50);
  const [itemNb, setItemNb] = useState(7);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    setWeatherData(pieGraphData);
  }, [pieGraphData]);

  const pieData = {};
  if (weatherData) {
    Object.values(weatherData).forEach((sol) => {
      const wd = sol.WD;
      if (!wd) return;

      Object.entries(wd).forEach(([key, value]) => {
        if (key !== "most_common" && value?.compass_point) {
          const direction = value.compass_point;
          const count = value.ct;
          pieData[direction] = (pieData[direction] || 0) + count;
        }
      });
    });
  }

  const pieChartData = Object.entries(pieData).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Item>
          <Typography variant="h6" gutterBottom>
            Wind Direction Pie Chart
          </Typography>
          <PieChart
            height={300}
            width={400}
            series={[
              {
                data: pieChartData.slice(0, itemNb),
                innerRadius: radius,
                arcLabel: (params) => params.label ?? "",
                arcLabelMinAngle: 20,
                value: (params) => params.value ?? "",
              },
            ]}
            skipAnimation={skipAnimation}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skipAnimation}
                onChange={(e) => setSkipAnimation(e.target.checked)}
              />
            }
            label="Skip Animation"
          />
          <Typography id="input-item-number" gutterBottom>
            Number of items
          </Typography>
          <Slider
            value={itemNb}
            onChange={(e, val) => typeof val === "number" && setItemNb(val)}
            valueLabelDisplay="auto"
            min={1}
            max={pieChartData.length}
            aria-labelledby="input-item-number"
          />
          <Typography id="input-radius" gutterBottom>
            Radius
          </Typography>
          <Slider
            value={radius}
            onChange={(e, val) => typeof val === "number" && setRadius(val)}
            valueLabelDisplay="auto"
            min={15}
            max={100}
            aria-labelledby="input-radius"
          />
        </Item>
      </Grid>
    </Grid>
  );
};

export default PieGraph;
