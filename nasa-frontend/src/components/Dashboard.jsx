import React ,{useEffect,useState} from 'react';
import { Grid, Box, Card, CardContent, Typography } from '@mui/material';
import LineGraph from './Charts/LineChart';
import PieGraph from './Charts/Piechart';
import BarGraph from './Charts/BarChart';
import { getInsightWeather } from '../api/insightWeather';

const SmallInfoBox = ({ title, content }) => (
  <Card sx={{ height: 'auto', backgroundColor: '#fff', color: 'black',mb:2 }}>
    <CardContent sx={{textAlign:'center'}}>
        <Typography variant="body1" fontWeight="bold">{content}</Typography>
      <Typography variant="subtitle1">{title}</Typography>
    </CardContent>
  </Card>
);


const Dashboard = () => {
  const [weatherData,setWeatherData] = useState(null);
  const [currentSolData,setCurrentSolData] = useState(null);
  const [latestSolNumber,setLatestSolNumber] = useState(null)

  useEffect(() => {
      getInsightWeather()
        .then(data => {
          setWeatherData(data);
        })
        .catch(err => console.log("error in fetching data",err));
    }, []); 
    
    useEffect(() => {
      if(weatherData){
  const solKeys = weatherData.sol_keys;
  const currentSol = solKeys[solKeys.length - 1];
  setLatestSolNumber(currentSol);
  const currentData = weatherData[currentSol];
  setCurrentSolData(currentData);
      }
    },[weatherData])

   

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'black', mb: 2 }}>
        Insight: Mars Weather Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Grid container direction="column" spacing={2}>
              <Grid item>
              <SmallInfoBox title="Latest Sol" content={`Sol ${latestSolNumber}`} >
            </SmallInfoBox>
            </Grid>
            <Grid item>
              <SmallInfoBox title="Average Temperature" content={` ${currentSolData?.AT?.av ?? 'N/A'} °C`} >
            </SmallInfoBox>
            </Grid>
            <Grid item>
              <SmallInfoBox title="Average Wind" content={`${currentSolData?.HWS?.av ?? 'N/A'} m/s`}  />
            </Grid>
            <Grid item>
              <SmallInfoBox title="Average Pressure"  content={`${currentSolData?.PRE?.av ?? 'N/A'} pa`}/>
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12} sm={6} md={6}>
              <LineGraph lineGraphData={weatherData}/>
             <Box sx={{mt:2}}>
       <BarGraph barGraphData={weatherData} />
          </Box>
        </Grid>


        <Grid item  xs={12} sm={6} md={3}>
              <PieGraph pieGraphData={weatherData} />  
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
