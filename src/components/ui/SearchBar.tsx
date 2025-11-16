"use client";
import { Search } from "lucide-react";
import { memo } from "react";

interface SearchProps {
  placeHolder?: string;
  value?: string;
  setValue?: (val: string) => void;
  bg_color?: string;
  custom_class?: string;
}

function SearchBar({
  placeHolder,
  value,
  setValue,
  bg_color,
  custom_class,
}: SearchProps) {
  return (
    <div className="relative w-full ">
      <input
        type="text"
        placeholder={placeHolder ?? "search"}
        value={value ?? ""}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        className={`${
          bg_color ?? "bg-gray-200"
        } w-full pl-9 placeholder:font-medium pr-6 p-3 rounded-lg placeholder:text-gray-100 outline-none focus-within:border focus-within:border-blue-200 transition ease-in-out duration-300 border border-transparent ${custom_class ?? ""}`}
      />
      <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export default memo(SearchBar);
