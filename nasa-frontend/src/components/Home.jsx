
import React, { useEffect, useState,useCallback } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { getInsightWeather } from '../api/insightWeather';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import WindFilter from './Filter/SelectFilter';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgb(0 0 0 / 29%)',
  borderRadius: 8,
   minWidth:'11rem',
  border: '1px solid rgba(179, 157, 157, 0.14)',
  padding: theme.spacing(4),
  textAlign: 'center',
  color: 'white', 
  backdropFilter: 'blur(5px)',
}));



const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
   const [selectFilter, setSelectFilter] = useState("");


 useEffect(() => {
    getInsightWeather()
      .then(data => {
        setWeatherData(data);
      setLoading(false);
      console.log("data",data);
      })
      .catch(err => console.log("error in fetching data",err));
  }, []);  


const handleFilterChange = useCallback((value) => {
  setSelectFilter(value);
}, []);

 const graphdata = weatherData? Object.entries(weatherData).filter(([key]) =>
   key !== 'sol_keys' && key !== 'validity_checks')
 .filter(([sol,data]) =>{
          const wind = data.HWS?.av;
          if (selectFilter === 'WL6') return wind < 6;
          if (selectFilter === 'WG6') return wind >= 6;
          return true;
        })
        .map(([sol, data]) => ({
          sol: `Sol ${sol}`,
          AvgTemp: data.AT?.av,
          MinTemp: data.AT?.mn,
          MaxTemp: data.AT?.mx,
          WindSpeed: data.HWS?.av,
        }))
    : [];



  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        sx={{ bgcolor: '#0b1a2a', pt: 10 }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );


  return (
    <Box
      sx={{
        backgroundImage: "url('/marsBackground.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'auto',
        minHeight:'100vh',
        pt: 2,
        pb: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'white', mb: 4}}
        >
          Mars InSight Weather Report
        </Typography>

      <WindFilter onFilterChange={handleFilterChange}/>
        {graphdata.length === 0 ? (
          <Typography align="center" color="white">
            No weather data available
          </Typography>
        ) : (
         <Grid container spacing={2}>
  {graphdata.map((item) => (
    <Grid item xs={12} sm={6} key={item.sol}>
      <Item>
        <Typography variant="h6" sx={{ color: 'white' }}>{item.sol}</Typography>
        <Typography sx={{ color: 'white' }}>Avg Temp: {item.AvgTemp} °C</Typography>
        <Typography sx={{ color: 'white' }}>Min Temp: {item.MinTemp} °C</Typography>
        <Typography sx={{ color: 'white' }}>Max Temp: {item.MaxTemp} °C</Typography>
        <Typography sx={{ color: 'white' }}>Wind Speed: {item.WindSpeed} m/s</Typography>
      </Item>
    </Grid>
  ))}
</Grid>
          
        )}
      </Container>
    </Box>
  );
};

export default Home;
