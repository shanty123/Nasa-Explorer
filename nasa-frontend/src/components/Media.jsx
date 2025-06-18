
import React, { useEffect,useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { getApod } from '../api/apod';

const Media = () => {
   const [apod, setApod] = useState();
   const [loading,setLoading] = useState(true);


  useEffect(() => {
    getApod()
    .then(data => {
       setApod(data);
     setLoading(false);
    })
    .catch(err => console.log("error fetching data",err));
  }, []);



  if(loading)
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
        
   if (!apod || !apod.url || apod.media_type !== 'image') {
  return (
    <Typography variant="body1" sx={{ color: 'white', p: 4 }}>
      No image available for today.
    </Typography>
  );
}

  return (
    <Box
      sx={{
        height: '100vh', 
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        borderRadius:"5px",
        p: 2,
      }}
    >
      <Container maxWidth="md">

        <Box
          component="img"
          src={apod.url}
          alt={apod.title}
          sx={{
            width: '100%',
            maxHeight: '60vh',  
            borderRadius: '12px',
          }}
        />
          <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}
        >
          Astronomy Picture Of The Day
        </Typography>

        <Typography variant="body1" sx={{ color: 'white', mt: 2 }}>
          {apod.explanation}
        </Typography>
      </Container>
    </Box>
  );
};

export default Media;
