import { useState, useMemo } from "react";
import { GameCard } from "../components/GameCard/GameCard";
import { Sidebar } from "../components/Sidebar/Sidebar";
import type { SidebarFilters } from "../components/Sidebar/Sidebar";
import { Loader } from "../components/UI/Loader";
import { ErrorMessage } from "../components/UI/ErrorMessage";
import { useGames } from "../hooks/useGames";

export function Home() {
  const [filters, setFilters] = useState<SidebarFilters>({
    genre: "",
    platforms: [],
    startDate: "",
    endDate: "",
    ordering: "-rating",
  });

  const [search, setSearch] = useState("");

  const apiFilters = useMemo(
    () => ({
      search: search || undefined,
      genres: filters.genre || undefined,
      platforms: filters.platforms.length > 0 ? filters.platforms.join(",") : undefined,
      dates:
        filters.startDate && filters.endDate
          ? `${filters.startDate},${filters.endDate}`
          : undefined,
      ordering: filters.ordering,
    }),
    [search, filters]
  );

  const { games, loading, error, count, hasNextPage, page, setPage } =
    useGames(apiFilters);

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6">
      <Sidebar filters={filters} onFiltersChange={setFilters} />

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Buscar videojuego..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm rounded border border-steam-gray bg-steam-darker px-3 py-2 text-sm text-steam-light outline-none focus:border-steam-blue"
          />
          <p className="whitespace-nowrap text-xs text-steam-light/60">
            {count.toLocaleString("es-ES")} resultados
          </p>
        </div>

        {loading && <Loader />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={() => setPage(page)} />
        )}

        {!loading && !error && games.length === 0 && (
          <p className="py-12 text-center text-sm text-steam-light/60">
            No se encontraron juegos con esos filtros.
          </p>
        )}

        {!loading && !error && games.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="rounded border border-steam-gray px-3 py-1.5 text-sm text-steam-light disabled:opacity-30"
              >
                Anterior
              </button>
              <span className="text-sm text-steam-light/70">Página {page}</span>
              <button
                disabled={!hasNextPage}
                onClick={() => setPage(page + 1)}
                className="rounded border border-steam-gray px-3 py-1.5 text-sm text-steam-light disabled:opacity-30"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}