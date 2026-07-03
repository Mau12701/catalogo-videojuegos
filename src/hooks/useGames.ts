import { useEffect, useState, useCallback } from "react";
import { getGames } from "../services/api";
import type { Game, GameFilters } from "../types";

interface UseGamesResult {
  games: Game[];
  loading: boolean;
  error: string | null;
  count: number;
  hasNextPage: boolean;
  page: number;
  setPage: (page: number) => void;
}

export function useGames(filters: Omit<GameFilters, "page">): UseGamesResult {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getGames({ ...filters, page });
      setGames(data.results);
      setCount(data.count);
      setHasNextPage(data.next !== null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar los juegos");
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, [
    filters.search,
    filters.genres,
    filters.platforms,
    filters.dates,
    filters.ordering,
    filters.page_size,
    page,
  ]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  // Si cambian los filtros, siempre volvemos a la página 1
  useEffect(() => {
    setPage(1);
  }, [
    filters.search,
    filters.genres,
    filters.platforms,
    filters.dates,
    filters.ordering,
  ]);

  return { games, loading, error, count, hasNextPage, page, setPage };
}