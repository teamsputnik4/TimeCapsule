export interface TimeCapsule {
  id: string;
  title: string;
  message?: string;
  fileUrl?: string;
  unlockDate: Date;
  isLocked: boolean;
  password: string; // Added password field
  attempts: number; // Track failed unlock attempts
}

export interface CapsuleFormData {
  title: string;
  message?: string;
  file?: File;
  unlockDate: Date;
  password: string; // Added password field
}

export type CapsuleAction = 'delete' | 'unlock';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export type DateFilterOption = 'all' | 'upcoming' | 'today' | 'past';