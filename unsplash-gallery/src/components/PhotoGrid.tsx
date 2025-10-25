import React from 'react';
import { Box } from '@mui/material';
import type { UnsplashPhoto } from '../types/unsplash.types';
import { PhotoCard } from './PhotoCard';

interface PhotoGridProps {
  photos: UnsplashPhoto[];
  onPhotoClick: (photo: UnsplashPhoto) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onPhotoClick }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo)} />
      ))}
    </Box>
  );
};