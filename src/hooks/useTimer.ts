import { useState, useEffect, useRef } from 'react';

interface UseTimerReturn {
  timeRemaining: number;
  isTimeUp: boolean;
  startTime: Date | null;
  formatTime: (seconds: number) => string;
  startTimer: () => void;
  resetTimer: () => void;
}

export const useTimer = (initialSeconds: number = 3600): UseTimerReturn => {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!startTime) {
      setStartTime(new Date());
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeRemaining(initialSeconds);
    setIsTimeUp(false);
    setStartTime(null);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    isTimeUp,
    startTime,
    formatTime,
    startTimer,
    resetTimer,
  };
};