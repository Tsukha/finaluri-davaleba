import { useInfiniteQuery } from '@tanstack/react-query';
import { unsplashService } from '../services/unsplashService';
import { useDebounce } from './useDebounce';

export const usePhotoSearch = (searchQuery: string) => {
  const debouncedQuery = useDebounce(searchQuery, 500);

  return useInfiniteQuery({
    queryKey: ['photos', debouncedQuery],
    queryFn: ({ pageParam = 1 }) => {
      if (debouncedQuery.trim()) {
        return unsplashService.searchPhotos(debouncedQuery, pageParam);
      }
      return unsplashService.getPhotos(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
  });
};