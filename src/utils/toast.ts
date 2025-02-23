import { Toast } from '../types';

export function createToast(message: string, type: Toast['type'] = 'success'): Toast {
  return {
    id: crypto.randomUUID(),
    message,
    type,
  };
}