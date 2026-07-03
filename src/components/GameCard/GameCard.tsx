import { Link } from "react-router-dom";
import { StarRating } from "../UI/StarRating";
import { formatYear } from "../../utils/formatDate";
import { RAWG_IMAGE_FALLBACK } from "../../utils/constants";
import type { GameCardProps } from "./GameCard.types";

export function GameCard({ game }: GameCardProps) {
  const platformNames = game.platforms
    ? game.platforms.slice(0, 4).map((p) => p.platform.name)
    : [];

  return (
    <Link
      to={`/game/${game.slug}`}
      className="group block overflow-hidden rounded-lg bg-steam-darker ring-1 ring-steam-gray/40 transition-transform duration-200 hover:-translate-y-1 hover:ring-steam-blue"
    >
      <div className="relative h-44 w-full overflow-hidden bg-steam-gray">
        <img
          src={game.background_image ?? RAWG_IMAGE_FALLBACK}
          alt={game.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-steam-light">
          {formatYear(game.released)}
        </span>
      </div>

      <div className="space-y-2 p-3">
        <h3 className="truncate text-sm font-semibold text-white group-hover:text-steam-blue">
          {game.name}
        </h3>

        <StarRating rating={game.rating} metacritic={game.metacritic} />

        {game.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {game.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-steam-gray px-2 py-0.5 text-[11px] text-steam-light"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {platformNames.length > 0 && (
          <p className="truncate text-[11px] text-steam-light/70">
            {platformNames.join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}