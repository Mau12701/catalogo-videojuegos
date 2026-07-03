import { GenreFilter } from "./GenreFilter";
import { PlatformFilter } from "./PlatformFilter";
import { DateFilter } from "./DateFilter";
import { SortSelect } from "./SortSelect";
import type { OrderingOption } from "../../types";

export interface SidebarFilters {
  genre: string;
  platforms: string[];
  startDate: string;
  endDate: string;
  ordering: OrderingOption;
}

interface SidebarProps {
  filters: SidebarFilters;
  onFiltersChange: (filters: SidebarFilters) => void;
}

export function Sidebar({ filters, onFiltersChange }: SidebarProps) {
  const hasActiveFilters =
    filters.genre !== "" ||
    filters.platforms.length > 0 ||
    filters.startDate !== "" ||
    filters.endDate !== "";

  function resetFilters() {
    onFiltersChange({
      genre: "",
      platforms: [],
      startDate: "",
      endDate: "",
      ordering: "-rating",
    });
  }

  return (
    <aside className="w-64 shrink-0 space-y-6 border-r border-steam-gray/40 bg-steam-darker/60 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-white">
          Filtros
        </h2>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-steam-blue hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      <SortSelect
        value={filters.ordering}
        onChange={(ordering) => onFiltersChange({ ...filters, ordering })}
      />

      <GenreFilter
        selectedGenre={filters.genre}
        onChange={(genre) => onFiltersChange({ ...filters, genre })}
      />

      <PlatformFilter
        selectedPlatforms={filters.platforms}
        onChange={(platforms) => onFiltersChange({ ...filters, platforms })}
      />

      <DateFilter
        startDate={filters.startDate}
        endDate={filters.endDate}
        onChange={(startDate, endDate) =>
          onFiltersChange({ ...filters, startDate, endDate })
        }
      />
    </aside>
  );
}