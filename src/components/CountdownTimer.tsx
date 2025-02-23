import React, { useState, useEffect } from 'react';
import { formatCountdown } from '../utils/date';

interface Props {
  unlockDate: Date;
  onUnlock?: () => void;
}

export function CountdownTimer({ unlockDate, onUnlock }: Props) {
  const [countdown, setCountdown] = useState(formatCountdown(unlockDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdown = formatCountdown(unlockDate);
      setCountdown(newCountdown);
      
      if (newCountdown === 'Ready to unlock' && onUnlock) {
        onUnlock();
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [unlockDate, onUnlock]);

  return (
    <span className="text-sm font-medium text-gray-600">
      {countdown}
    </span>
  );
}