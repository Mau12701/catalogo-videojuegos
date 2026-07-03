import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails } from "../services/api";
import { StarRating } from "../components/UI/StarRating";
import { Loader } from "../components/UI/Loader";
import { ErrorMessage } from "../components/UI/ErrorMessage";
import { formatDate } from "../utils/formatDate";
import { RAWG_IMAGE_FALLBACK } from "../utils/constants";
import type { Game } from "../types";

export function GameDetail() {
  const { slug } = useParams<{ slug: string }>();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const gameSlug = slug;

    let active = true;

    async function fetchGame() {
      setLoading(true);
      setError(null);

      try {
        const data = await getGameDetails(gameSlug);

        if (active) {
          setGame(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Error al cargar el juego"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchGame();

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!game) return null;

  const platformNames =
    game.platforms?.map((p) => p.platform.name) ?? [];

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">

      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-steam-blue transition hover:underline"
      >
        ← Volver al catálogo
      </Link>

      <div className="overflow-hidden rounded-xl bg-steam-darker ring-1 ring-steam-gray/40">

        <div className="relative h-72 w-full sm:h-96">

          <img
            src={game.background_image ?? RAWG_IMAGE_FALLBACK}
            alt={game.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-steam-darker via-transparent to-transparent" />

        </div>

        <div className="space-y-6 p-8">

          <div className="space-y-3">

            <h1 className="text-3xl font-bold text-white">
              {game.name}
            </h1>

            <StarRating
              rating={game.rating}
              metacritic={game.metacritic}
            />

            <p className="text-sm text-steam-light/70">
              Lanzamiento: {formatDate(game.released)}
            </p>

          </div>

          {game.genres.length > 0 && (

            <div>

              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-steam-light/60">
                Géneros
              </h2>

              <div className="flex flex-wrap gap-2">

                {game.genres.map((genre) => (

                  <span
                    key={genre.id}
                    className="rounded-full bg-steam-gray px-3 py-1 text-xs text-steam-light"
                  >
                    {genre.name}
                  </span>

                ))}

              </div>

            </div>

          )}

          {platformNames.length > 0 && (

            <div className="space-y-2">

              <h2 className="text-xs font-semibold uppercase tracking-wide text-steam-light/60">
                Plataformas
              </h2>

              <p className="text-sm leading-relaxed text-steam-light">
                {platformNames.join(" · ")}
              </p>

            </div>

          )}

          {game.description_raw && (

            <div className="space-y-2">

              <h2 className="text-xs font-semibold uppercase tracking-wide text-steam-light/60">
                Descripción
              </h2>

              <p className="whitespace-pre-line text-sm leading-7 text-steam-light/90">
                {game.description_raw.length > 500
                  ? `${game.description_raw.slice(0, 500)}...`
                  : game.description_raw}
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}