import React from 'react';
import {
  Card,
  CardMedia,
  Avatar,
  Typography,
  Box,
  alpha,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { UnsplashPhoto } from '../types/unsplash.types';

interface PhotoCardProps {
  photo: UnsplashPhoto;
  onClick: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
          '& .photo-overlay': {
            opacity: 1,
          },
          '& .photo-image': {
            transform: 'scale(1.1)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '100%' }}>
        <CardMedia
          component="img"
          image={photo.urls.small}
          alt={photo.alt_description || 'Photo'}
          className="photo-image"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />

        {/* Overlay */}
        <Box
          className="photo-overlay"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: `linear-gradient(to top, ${alpha('#000', 0.7)}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            color: 'white',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Avatar
              src={photo.user.profile_image.small}
              alt={photo.user.name}
              sx={{ width: 32, height: 32, border: '2px solid white' }}
            />
            <Typography variant="body2" fontWeight="600" noWrap>
              {photo.user.name}
            </Typography>
          </Box>

          {photo.description && (
            <Typography
              variant="caption"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: alpha('#fff', 0.9),
                mb: 1,
              }}
            >
              {photo.description}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FavoriteIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">
              {photo.likes.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};