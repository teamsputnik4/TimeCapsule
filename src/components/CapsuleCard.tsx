import React, { useState } from 'react';
import { Lock, Unlock, Trash2, Eye, EyeOff } from 'lucide-react';
import { TimeCapsule, CapsuleAction } from '../types';
import { CountdownTimer } from './CountdownTimer';

interface Props {
  capsule: TimeCapsule;
  onAction: (id: string, action: CapsuleAction, password?: string) => void;
}

export function CapsuleCard({ capsule, onAction }: Props) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);

  const handleUnlock = () => {
    if (password === capsule.password) {
      onAction(capsule.id, 'unlock', password);
      setPassword('');
      setShowUnlock(false);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{capsule.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onAction(capsule.id, 'delete', capsule.password)}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Delete capsule"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          {capsule.isLocked ? (
            <Lock className="h-5 w-5 text-gray-500" />
          ) : (
            <Unlock className="h-5 w-5 text-green-500" />
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <CountdownTimer 
          unlockDate={capsule.unlockDate}
          onUnlock={() => setShowUnlock(true)}
        />
      </div>
      
      {capsule.message && (
        <p className="text-gray-700 mb-4">{capsule.message}</p>
      )}
      
      {capsule.fileUrl && (
        <img 
          src={capsule.fileUrl} 
          alt="Capsule content"
          className="w-full h-32 object-cover rounded-md mb-4"
        />
      )}

      {showUnlock && (
        <div className="mt-4 space-y-2">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to unlock"
              className="w-full px-4 py-2 rounded-md border border-gray-300 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <button
            onClick={handleUnlock}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Unlock
          </button>
        </div>
      )}

      {!showUnlock && (
        <button
          onClick={() => setShowUnlock(true)}
          disabled={capsule.isLocked}
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            capsule.isLocked
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {capsule.isLocked ? 'Locked' : 'Unlock'}
        </button>
      )}
    </div>
  );
}