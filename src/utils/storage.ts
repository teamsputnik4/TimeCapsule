import { TimeCapsule } from '../types';

const STORAGE_KEY = 'timeCapsules';

export function loadCapsules(): TimeCapsule[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const capsules = JSON.parse(stored);
    return capsules.map((capsule: any) => ({
      ...capsule,
      unlockDate: new Date(capsule.unlockDate)
    }));
  } catch (error) {
    console.error('Failed to load capsules:', error);
    return [];
  }
}

export function saveCapsules(capsules: TimeCapsule[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(capsules));
  } catch (error) {
    console.error('Failed to save capsules:', error);
  }
}