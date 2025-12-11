"use client";

interface FilterButtonsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterButtons({ filters, activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeFilter === filter
              ? "bg-primary text-white"
              : "bg-background text-sub-text hover:bg-bd-primary"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}