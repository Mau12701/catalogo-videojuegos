export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface GamePlatform {
  platform: Platform;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  background_image: string | null;
  rating: number;
  rating_top: number;
  metacritic: number | null;
  released: string | null;
  genres: Genre[];
  platforms: GamePlatform[] | null;
  description_raw?: string;   
}

export interface GamesApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export type OrderingOption =
  | "-rating"
  | "rating"
  | "-released"
  | "released"
  | "-metacritic"
  | "metacritic"
  | "name"
  | "-name";

export interface GameFilters {
  search?: string;
  genres?: string;      // slug o id, separados por coma
  platforms?: string;   // id, separados por coma
  dates?: string;        // "2023-01-01,2023-12-31"
  ordering?: OrderingOption;
  page?: number;
  page_size?: number;
}