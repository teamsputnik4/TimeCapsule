import React, { useState } from 'react';
import type { TimeCapsule, CapsuleAction, DateFilterOption } from '../types';
import { CapsuleCard } from './CapsuleCard';
import { SearchBar } from './SearchBar';
import { DateFilter } from './DateFilter';
import { filterCapsules } from '../utils/filter';

interface Props {
  capsules: TimeCapsule[];
  onAction: (id: string, action: CapsuleAction) => void;
}

export function CapsuleList({ capsules, onAction }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilterOption>('all');
  const filteredCapsules = filterCapsules(capsules, searchTerm, dateFilter);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <DateFilter value={dateFilter} onChange={setDateFilter} />
      </div>
      
      {filteredCapsules.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm || dateFilter !== 'all' 
            ? 'No capsules found matching your criteria' 
            : 'No capsules yet'}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCapsules.map((capsule) => (
            <CapsuleCard 
              key={capsule.id}
              capsule={capsule}
              onAction={onAction}
            />
          ))}
        </div>
      )}
    </div>
  );
}