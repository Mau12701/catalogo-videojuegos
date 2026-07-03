import { useGenres } from "../../hooks/useGenres";

interface GenreFilterProps {
  selectedGenre: string;
  onChange: (genreSlug: string) => void;
}

export function GenreFilter({ selectedGenre, onChange }: GenreFilterProps) {
  const { genres, loading, error } = useGenres();

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-steam-light/60">
        Género
      </h3>

      {loading && <p className="text-xs text-steam-light/50">Cargando géneros...</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="max-h-48 space-y-1 overflow-y-auto pr-1">
          <button
            onClick={() => onChange("")}
            className={`block w-full rounded px-2 py-1 text-left text-sm transition-colors ${
              selectedGenre === ""
                ? "bg-steam-blue text-steam-darker font-medium"
                : "text-steam-light hover:bg-steam-gray"
            }`}
          >
            Todos
          </button>

          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onChange(genre.slug)}
              className={`block w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                selectedGenre === genre.slug
                  ? "bg-steam-blue text-steam-darker font-medium"
                  : "text-steam-light hover:bg-steam-gray"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}