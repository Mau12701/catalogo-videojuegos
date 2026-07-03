import { ORDERING_LABELS } from "../../utils/constants";
import type { OrderingOption } from "../../types";

interface SortSelectProps {
  value: OrderingOption;
  onChange: (value: OrderingOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-steam-light/60">
        Ordenar por
      </h3>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as OrderingOption)}
        className="w-full rounded border border-steam-gray bg-steam-darker px-2 py-1.5 text-sm text-steam-light outline-none focus:border-steam-blue"
      >
        {Object.entries(ORDERING_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}