import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { playSound } from '../utils/sounds';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isPaused: boolean;
  // optional UTC ms epoch when the question was started; if provided, timer will sync to this
  startedAt?: number | null;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isPaused, startedAt }) => {
  const computeInitial = useCallback(() => {
    if (startedAt && typeof startedAt === 'number') {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      return Math.max(0, duration - elapsed);
    }
    return duration;
  }, [duration, startedAt]);

  const [timeLeft, setTimeLeft] = useState<number>(computeInitial());

  useEffect(() => {
    setTimeLeft(computeInitial());
  }, [computeInitial]);

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      if (startedAt) {
        // compute based on startedAt to keep clients in sync
        const elapsed = Math.floor((Date.now() - (startedAt as number)) / 1000);
        const newLeft = Math.max(0, duration - elapsed);
        setTimeLeft(newLeft);
        if (newLeft <= 0) onTimeUp();
        
        // Play tick sound for last 5 seconds
        if (newLeft <= 5 && newLeft > 0) {
          playSound('tick');
        }
      } else {
        setTimeLeft(prev => {
          const next = prev - 1;
          if (next <= 0) onTimeUp();
          
          // Play tick sound for last 5 seconds
          if (next <= 5 && next > 0) {
            playSound('tick');
          }
          
          return next;
        });
      }
    }, 1000); // Reduced from 500ms to 1000ms for better performance

    return () => clearInterval(intervalId);
  }, [timeLeft, isPaused, onTimeUp, duration, startedAt]);

  const radius = 45;
  const circumference = useMemo(() => 2 * Math.PI * radius, []);
  const strokeDashoffset = useMemo(() => 
    circumference - (timeLeft / duration) * circumference, 
    [circumference, timeLeft, duration]
  );

  const timeColor = useMemo(() => 
    timeLeft <= 5 ? 'text-red-500' : 'text-gray-900', 
    [timeLeft]
  );

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className={timeLeft <= 5 ? 'text-red-500' : 'text-yellow-400'}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center text-4xl font-black ${timeColor}`}>
        {timeLeft}
      </div>
    </div>
  );
};

export default Timer;