import React,{useEffect,useState} from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
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

const BarGraph = ({barGraphData}) =>{
const [weatherData,setWeatherData] = useState(barGraphData);

 useEffect(() => {
     setWeatherData(barGraphData);
  }, [barGraphData]);  

const graphData = weatherData? Object.entries(weatherData).filter(([key]) =>key !== 'sol_keys' && key !== 'validity_checks')
.map(([sol,data]) => ({
 sol: `${sol}`,
  temperature: data.AT?.av
}))
:[];

    return(
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
<Item>
    <h3>Sol vs Temperature</h3>
    <ResponsiveContainer width="100%" minWidth={400} height={200}>
<BarChart data={graphData}  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}  barCategoryGap="20%">

<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="sol"/>
 <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Bar dataKey="temperature" fill="#1976d2" />
</BarChart>
    </ResponsiveContainer>
</Item>
</Grid>
</Grid>
    )
}
export default BarGraph;