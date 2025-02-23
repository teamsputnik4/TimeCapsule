import { TimeCapsule, DateFilterOption } from '../types';

function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function filterCapsules(
  capsules: TimeCapsule[],
  searchTerm: string,
  dateFilter: DateFilterOption
): TimeCapsule[] {
  let filtered = capsules;
  const now = new Date();
  
  // Apply date filter
  if (dateFilter !== 'all') {
    filtered = filtered.filter((capsule) => {
      switch (dateFilter) {
        case 'upcoming':
          return capsule.unlockDate > now;
        case 'today':
          return isToday(capsule.unlockDate);
        case 'past':
          return capsule.unlockDate <= now;
        default:
          return true;
      }
    });
  }
  
  // Apply search filter
  const term = searchTerm.toLowerCase().trim();
  if (term) {
    filtered = filtered.filter((capsule) => 
      capsule.title.toLowerCase().includes(term) ||
      capsule.message?.toLowerCase().includes(term)
    );
  }
  
  return filtered;
}