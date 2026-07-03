interface StarRatingProps {
  rating: number;      // 0 a 5 (RAWG usa escala 0-5)
  metacritic?: number | null;
}

export function StarRating({ rating, metacritic }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: totalStars }).map((_, index) => {
          const isFull = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;

          return (
            <svg
              key={index}
              viewBox="0 0 20 20"
              className={`h-4 w-4 ${
                isFull || isHalf ? "text-steam-blue" : "text-steam-gray"
              }`}
              fill="currentColor"
            >
              {isHalf ? (
                <defs>
                  <linearGradient id={`half-${index}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#2a475e" stopOpacity="1" />
                  </linearGradient>
                </defs>
              ) : null}
              <path
                fill={isHalf ? `url(#half-${index})` : "currentColor"}
                d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.98l-5.2 2.54.99-5.8-4.21-4.1 5.82-.85L10 1.5z"
              />
            </svg>
          );
        })}
      </div>

      <span className="text-sm text-steam-light">{rating.toFixed(1)}</span>

      {metacritic ? (
        <span
          className={`ml-1 rounded px-1.5 py-0.5 text-xs font-semibold ${
            metacritic >= 75
              ? "bg-steam-green text-white"
              : metacritic >= 50
              ? "bg-yellow-600 text-white"
              : "bg-red-700 text-white"
          }`}
        >
          {metacritic}
        </span>
      ) : null}
    </div>
  );
}