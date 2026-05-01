"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterDropdownProps = {
  label: string;
  options: FilterOption[];
  selected: string | null;
  onSelect: (value: string | null) => void;
};

export const FilterDropdown = ({
  label,
  options,
  selected,
  onSelect,
}: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string | null) => {
    onSelect(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === selected)?.label;
  const hasSelection = !!selected;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-colors
          ${
            hasSelection
              ? "border-blue-500 bg-blue-50 text-blue-600"
              : "border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50"
          }`}
      >
        {selectedLabel ?? label}
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${
            hasSelection ? "text-blue-500" : "text-gray-400"
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-40 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden py-1.5">
          <button
            onClick={() => handleSelect(null)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
          >
            <span
              className={
                !selected ? "text-primary font-medium" : "text-gray-700"
              }
            >
              All
            </span>
            {!selected && (
              <Check size={14} strokeWidth={2.5} className="text-primary" />
            )}
          </button>

          <div className="h-px bg-gray-100 mx-3 my-1" />

          {options.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
              >
                <span
                  className={
                    isSelected ? "text-primary font-medium" : "text-gray-700"
                  }
                >
                  {option.label}
                </span>
                {isSelected && (
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    className="text-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
