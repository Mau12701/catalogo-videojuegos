import type {
  Game,
  GamesApiResponse,
  GameFilters,
  Genre,
  Platform,
} from "../types";

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

function buildQuery(params: Record<string, string | number | undefined>): string {
  const query = new URLSearchParams();
  query.set("key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  return query.toString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error RAWG API: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function getGames(filters: GameFilters = {}): Promise<GamesApiResponse> {
  const query = buildQuery({
    search: filters.search,
    genres: filters.genres,
    platforms: filters.platforms,
    dates: filters.dates,
    ordering: filters.ordering,
    page: filters.page,
    page_size: filters.page_size ?? 20,
  });

  return fetchJson<GamesApiResponse>(`${BASE_URL}/games?${query}`);
}

export function getGameDetails(slugOrId: string | number): Promise<Game> {
  const query = buildQuery({});
  return fetchJson<Game>(`${BASE_URL}/games/${slugOrId}?${query}`);
}

export function getGenres(): Promise<{ results: Genre[] }> {
  const query = buildQuery({});
  return fetchJson<{ results: Genre[] }>(`${BASE_URL}/genres?${query}`);
}

export function getPlatforms(): Promise<{ results: Platform[] }> {
  const query = buildQuery({});
  return fetchJson<{ results: Platform[] }>(`${BASE_URL}/platforms?${query}`);
}