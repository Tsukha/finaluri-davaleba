import type { UnsplashPhoto, UnsplashResponse } from '../types/unsplash.types';

const UNSPLASH_ACCESS_KEY = 'LNgJ6SC1DDJ0J7ZnsujazxLQagDkxWr3QKSL488B53s';
const PER_PAGE = 20;
const BASE_URL = 'https://api.unsplash.com';

class UnsplashService {
  private async fetchWithAuth(url: string): Promise<any> {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async searchPhotos(query: string, page: number): Promise<UnsplashResponse> {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      per_page: PER_PAGE.toString(),
    });

    return this.fetchWithAuth(`${BASE_URL}/search/photos?${params}`);
  }

  async getPhotos(page: number): Promise<{ results: UnsplashPhoto[]; total_pages: number }> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: PER_PAGE.toString(),
    });

    const results = await this.fetchWithAuth(`${BASE_URL}/photos?${params}`);
    return {
      results,
      total_pages: 100,
    };
  }

  async getPhotoById(id: string): Promise<UnsplashPhoto> {
    return this.fetchWithAuth(`${BASE_URL}/photos/${id}`);
  }
}

export const unsplashService = new UnsplashService();
export { UNSPLASH_ACCESS_KEY };