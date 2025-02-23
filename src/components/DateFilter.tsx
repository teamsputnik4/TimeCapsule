import React from 'react';
import { Calendar } from 'lucide-react';
import type { DateFilterOption } from '../types';

interface Props {
  value: DateFilterOption;
  onChange: (option: DateFilterOption) => void;
}

export function DateFilter({ value, onChange }: Props) {
  return (
    <div className="relative mb-4 flex items-center gap-2">
      <Calendar className="h-5 w-5 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DateFilterOption)}
        className="py-2 px-3 rounded-lg border border-gray-300 focus:border-black-500 focus:ring-1 focus:ring-black-500"
      >
        <option value="all">All Capsules</option>
        <option value="upcoming">Upcoming</option>
        <option value="today">Today</option>
        <option value="past">Past</option>
      </select>
    </div>
  );
}