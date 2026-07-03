import { useEffect, useState } from "react";
import { getGenres } from "../services/api";
import type { Genre } from "../types";

interface UseGenresResult {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

export function useGenres(): UseGenresResult {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchGenres() {
      setLoading(true);
      setError(null);

      try {
        const data = await getGenres();
        if (active) setGenres(data.results);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Error al cargar géneros");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchGenres();

    return () => {
      active = false;
    };
  }, []);

  return { genres, loading, error };
}