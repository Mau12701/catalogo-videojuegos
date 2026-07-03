import { useEffect, useState } from "react";
import { getPlatforms } from "../services/api";
import type { Platform } from "../types";

interface UsePlatformsResult {
  platforms: Platform[];
  loading: boolean;
  error: string | null;
}

export function usePlatforms(): UsePlatformsResult {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchPlatforms() {
      setLoading(true);
      setError(null);

      try {
        const data = await getPlatforms();
        if (active) setPlatforms(data.results);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Error al cargar plataformas");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchPlatforms();

    return () => {
      active = false;
    };
  }, []);

  return { platforms, loading, error };
}