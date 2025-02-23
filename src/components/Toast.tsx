import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Toast as ToastType } from '../types';

interface Props {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${
        toast.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      <p>{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-4 text-current hover:opacity-75"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}