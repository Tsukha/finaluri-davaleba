import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingSpinner: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 12,
    }}
  >
    <CircularProgress size={64} />
    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
      Loading photos...
    </Typography>
  </Box>
);