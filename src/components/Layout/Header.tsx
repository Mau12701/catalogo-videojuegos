import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-steam-gray/40 bg-steam-darker/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-steam-blue">Games</span>
          <span className="text-xl font-bold text-white">catálogo</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-steam-light">
          <Link
            to="/"
            className="transition-colors hover:text-steam-blue"
          >
            Catálogo
          </Link>

          <a
            href="https://rawg.io"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-steam-blue"
          >
            Powered by RAWG
          </a>
        </nav>
      </div>
    </header>
  );
}