import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { UnsplashPhoto } from '../types/unsplash.types';

interface PhotoModalProps {
  photo: UnsplashPhoto;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          m: 2,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 1,
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'grey.100' },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Image Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            p: 2,
            minHeight: { xs: 300, md: 'auto' },
          }}
        >
          <Box
            component="img"
            src={photo.urls.regular}
            alt={photo.alt_description || 'Photo'}
            sx={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Info Section */}
        <Box
          sx={{
            width: { xs: '100%', md: 384 },
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Avatar
              src={photo.user.profile_image.small}
              alt={photo.user.name}
              sx={{ width: 48, height: 48 }}
            />
            <Box>
              <Typography variant="h6" fontWeight="600">
                {photo.user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{photo.user.username}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          {photo.description && (
            <>
              <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {photo.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* Stats */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Likes
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {photo.likes.toLocaleString()}
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Dimensions
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {photo.width} × {photo.height}
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Published
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {new Date(photo.created_at).toLocaleDateString()}
              </Typography>
            </Paper>
          </Box>

          {/* View on Unsplash Button */}
          <Button
            variant="contained"
            fullWidth
            href={`https://unsplash.com/photos/${photo.id}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 3 }}
          >
            View on Unsplash
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}