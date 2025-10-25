import React, { useState, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  AlertTitle,
  Paper,
  AppBar,
  Toolbar,
} from '@mui/material';
import { SearchBar } from './components/SearchBar';
import { PhotoGrid } from './components/PhotoGrid';
import { PhotoModal } from './components/PhotoModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { usePhotoSearch } from './hooks/usePhotoSearch';
import type { UnsplashPhoto } from './types/unsplash.types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    usePhotoSearch(searchQuery);

  const photos = useMemo(() => {
    const allPhotos = data?.pages.flatMap((page) => page.results) || [];
    const uniquePhotos = new Map<string, UnsplashPhoto>();
    
    allPhotos.forEach((photo) => {
      if (!uniquePhotos.has(photo.id)) {
        uniquePhotos.set(photo.id, photo);
      }
    });
    
    return Array.from(uniquePhotos.values());
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar sx={{ flexDirection: 'column', py: 3, gap: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h1" fontWeight="700" gutterBottom>
              Unsplash Gallery
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover millions of beautiful, free photos from talented creators worldwide
            </Typography>
          </Box>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {isLoading && <LoadingSpinner />}

        {isError && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <Alert severity="error" sx={{ maxWidth: 500 }}>
              <AlertTitle>Error loading photos</AlertTitle>
              Please check your connection and try again.
            </Alert>
          </Box>
        )}

        {!isLoading && !isError && photos.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                No photos found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try searching for "nature" or "architecture"
              </Typography>
            </Paper>
          </Box>
        )}

        {!isLoading && !isError && photos.length > 0 && (
          <>
            <PhotoGrid photos={photos} onPhotoClick={setSelectedPhoto} />

            {hasNextPage && (
              <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage}
                  sx={{ px: 4, py: 1.5 }}
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More Photos'}
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Modal */}
      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </Box>
  );
};

export default App;