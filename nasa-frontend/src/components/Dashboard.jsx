import React, { useEffect, useState } from 'react';
import { Grid, Box, Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import LineGraph from './Charts/LineChart';
import PieGraph from './Charts/Piechart';
import BarGraph from './Charts/BarChart';
import RadarGraph from './Charts/RadarChart';
import { getInsightWeather } from '../api/insightWeather';
import { useTheme } from '@mui/material/styles';

const SmallInfoBox = ({ title, content }) => (
  <Card sx={{ backgroundColor: '#fff', color: 'black',minWidth:"20rem" }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="body1" fontWeight="bold">{content}</Typography>
      <Typography variant="subtitle1">{title}</Typography>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentSolData, setCurrentSolData] = useState(null);
  const [latestSolNumber, setLatestSolNumber] = useState(null);

  
 const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // 'md' is typically 960px

  useEffect(() => {
    getInsightWeather()
      .then(data => setWeatherData(data))
      .catch(err => console.log("error in fetching data", err));
  }, []);

  useEffect(() => {
    if (weatherData) {
      const solKeys = weatherData.sol_keys;
      const currentSol = solKeys[solKeys.length - 1];
      setLatestSolNumber(currentSol);
      setCurrentSolData(weatherData[currentSol]);
    }
  }, [weatherData]);
  
 if (isSmallScreen) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          📱 This dashboard is best viewed on a desktop or larger screen.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'black', mb: 2 }}>
        Insight: Mars Weather Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Grid container direction="row" spacing={3}>
            <Grid item>
              <SmallInfoBox title="Latest Sol" content={`Sol ${latestSolNumber}`} />
            </Grid>
            <Grid item>
              <SmallInfoBox title="Average Temperature" content={`${currentSolData?.AT?.av ?? 'N/A'} °C`} />
            </Grid>
            <Grid item>
              <SmallInfoBox title="Average Wind" content={`${currentSolData?.HWS?.av ?? 'N/A'} m/s`} />
            </Grid>
            <Grid item>
              <SmallInfoBox title="Average Pressure" content={`${currentSolData?.PRE?.av ?? 'N/A'} pa`} />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column: Graphs */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {/* Row 1 */}
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineGraph lineGraphData={weatherData} />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 300 }}>
                <PieGraph pieGraphData={weatherData} />
              </Box>
            </Grid>

            {/* Row 2 */}
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 300 }}>
                <BarGraph barGraphData={weatherData} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 300 }}>
                <RadarGraph RadarGraphData={weatherData} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
