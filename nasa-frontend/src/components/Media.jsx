import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { getApod } from '../api/apod';

const Media = () => {
  const [apod, setApod] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApod()
      .then((data) => {
        setApod(data);
        setLoading(false);
      })
      .catch((err) => console.log('error fetching data', err));
  }, []);

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
        minHeight: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Box
          component="img"
          src={apod.url}
          alt={apod.title}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            objectFit: 'cover',
            maxHeight: { xs: '50vh', md: '60vh' },
          }}
        />

        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            mt: 4,
            mb: 2,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            textAlign: 'center',
          }}
        >
          Astronomy Picture Of The Day
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'white',
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            textAlign: 'justify',
          }}
        >
          {apod.explanation}
        </Typography>
      </Container>
    </Box>
  );
};

export default Media;
