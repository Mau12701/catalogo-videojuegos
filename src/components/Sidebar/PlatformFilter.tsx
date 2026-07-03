import { usePlatforms } from "../../hooks/usePlatforms";

interface PlatformFilterProps {
  selectedPlatforms: string[]; // ids como string
  onChange: (platformIds: string[]) => void;
}

export function PlatformFilter({ selectedPlatforms, onChange }: PlatformFilterProps) {
  const { platforms, loading, error } = usePlatforms();

  function togglePlatform(id: string) {
    if (selectedPlatforms.includes(id)) {
      onChange(selectedPlatforms.filter((p) => p !== id));
    } else {
      onChange([...selectedPlatforms, id]);
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-steam-light/60">
        Plataforma
      </h3>

      {loading && <p className="text-xs text-steam-light/50">Cargando plataformas...</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="max-h-48 space-y-1 overflow-y-auto pr-1">
          {platforms.map((platform) => {
            const id = String(platform.id);
            const checked = selectedPlatforms.includes(id);

            return (
              <label
                key={platform.id}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm text-steam-light hover:bg-steam-gray"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePlatform(id)}
                  className="h-3.5 w-3.5 accent-steam-blue"
                />
                {platform.name}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}