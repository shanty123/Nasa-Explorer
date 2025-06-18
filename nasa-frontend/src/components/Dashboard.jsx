
import Box from '@mui/material/Box';
import LineGraph from './Charts/LineChart';
import PieGraph from './Charts/Piechart';
import BarGraph from './Charts/BarChart';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <h2>Insight:Mars Weather</h2>
      <Box display="flex" gap={2} flexWrap="wrap">
      <Box flex={1} minWidth={300}>
        <LineGraph />
      </Box>
  <Box flex={1} minWidth={300}>
        <BarGraph/>
      </Box>
      </Box>
      <Box mt={4}>
        <PieGraph />
      </Box>
    
    </Box>
  );
};

export default Dashboard;
