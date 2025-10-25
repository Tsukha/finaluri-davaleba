export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
    };
  };
  likes: number;
  created_at: string;
  width: number;
  height: number;
  color: string;
}

export interface UnsplashResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}