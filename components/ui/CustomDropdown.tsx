"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
}

export function CustomDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  name,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-col gap-2" ref={ref}>
      {/* Hidden input for form compatibility */}
      {name && <input type="hidden" name={name} value={value} />}

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={[
          "p-3 bg-input-bg border border-bd-primary rounded-lg text-sm text-left",
          "flex items-center justify-between gap-2",
          "focus:outline-none focus:ring-2 focus:ring-primary/20",
          "transition-colors duration-150",
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:border-teal-500",
          open ? "border-teal-500 ring-2 ring-teal-500/20" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className={selected ? "text-input-text" : "text-sub-text"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={[
            "text-gray-400 shrink-0 transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className={[
            "absolute z-50 mt-1 w-full bg-white border border-bd-primary",
            "rounded-lg shadow-lg overflow-auto max-h-60",
            "animate-in fade-in slide-in-from-top-1 duration-150",
          ].join(" ")}
          style={{ top: "100%", left: 0 }}
        >
          <ul role="listbox" className="py-1">
            {options.map((option) => {
              const isSelected = option.value === value;
              const isPlaceholder = option.value === "";

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    if (!isPlaceholder) {
                      onChange(option.value);
                      setOpen(false);
                    }
                  }}
                  className={[
                    "flex items-center justify-between px-3 py-2.5 text-sm cursor-pointer",
                    "transition-colors duration-100",
                    isPlaceholder
                      ? "text-sub-text cursor-default"
                      : isSelected
                        ? "bg-teal-50 text-teal-700 font-medium"
                        : "text-input-text hover:bg-gray-50",
                  ].join(" ")}
                >
                  {option.label}
                  {isSelected && !isPlaceholder && (
                    <Check size={14} className="text-teal-600 shrink-0" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <label className="text-xs text-gray-500">{label}</label>
    </div>
  );
}