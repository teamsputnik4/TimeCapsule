import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search capsules..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-black-500 focus:ring-1 focus:ring-black-500"
      />
    </div>
  );
}