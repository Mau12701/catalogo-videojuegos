interface DateFilterProps {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

export function DateFilter({ startDate, endDate, onChange }: DateFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-steam-light/60">
        Fecha de lanzamiento
      </h3>

      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-xs text-steam-light/70">
          Desde
          <input
            type="date"
            value={startDate}
            onChange={(e) => onChange(e.target.value, endDate)}
            className="rounded border border-steam-gray bg-steam-darker px-2 py-1 text-sm text-steam-light outline-none focus:border-steam-blue"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-steam-light/70">
          Hasta
          <input
            type="date"
            value={endDate}
            onChange={(e) => onChange(startDate, e.target.value)}
            className="rounded border border-steam-gray bg-steam-darker px-2 py-1 text-sm text-steam-light outline-none focus:border-steam-blue"
          />
        </label>

        {(startDate || endDate) && (
          <button
            onClick={() => onChange("", "")}
            className="self-start text-xs text-steam-blue hover:underline"
          >
            Limpiar fechas
          </button>
        )}
      </div>
    </div>
  );
}