import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { getInsightWeather } from '../../api/insightWeather';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles?.('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const LineGraph = () => {
  const [weatherData, setWeatherData] = useState(null);


  useEffect(() => {
    getInsightWeather()
      .then(data => {
        setWeatherData(data);
      })
      .catch(err => console.log("error in fetching data",err));
  }, []);

  const graphData = weatherData
    ? Object.entries(weatherData).map(([sol, data]) => ({
        sol,
        temp: data.AT?.av ?? null,
        wind: data.HWS?.av ?? null,
        pressure: data.PRE?.av ?? null,
      }))
    : [];

  return (
   
      <Grid container spacing={3}>
  <Grid item xs={12} md={6}>
          <Item>
            <h3>Average Temperature (°C)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sol" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Item>
        </Grid>

        {/* Chart 2: Wind Speed */}
        <Grid item xs={12} md={4}>
          <Item>
            <h3>Average Wind Speed (m/s)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sol" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wind" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Item>
        </Grid>

        {/* Chart 3: Pressure */}
        <Grid item xs={12} md={4}>
          <Item>
            <h3>Average Pressure (Pa)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sol" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pressure" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </Item>
        </Grid>
      </Grid>

  );
};

export default LineGraph;
