'use client';

import { useState, useEffect, useCallback } from 'react';

const MEMORY_WARNING_THRESHOLD_MB = 500;
const CHECK_INTERVAL_MS = 30000; // Check every 30 seconds

interface MemoryInfo {
  usedMB: number | null;
  limitMB: number | null;
  isWarning: boolean;
}

export function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState<MemoryInfo>({
    usedMB: null,
    limitMB: null,
    isWarning: false,
  });
  const [warningDismissed, setWarningDismissed] = useState(false);

  const checkMemory = useCallback(() => {
    // performance.memory is Chrome-only
    const perf = performance as any;
    if (perf.memory) {
      const usedMB = Math.round(perf.memory.usedJSHeapSize / (1024 * 1024));
      const limitMB = Math.round(perf.memory.jsHeapSizeLimit / (1024 * 1024));
      const isWarning = usedMB >= MEMORY_WARNING_THRESHOLD_MB;

      setMemoryInfo({ usedMB, limitMB, isWarning });

      // Reset dismissed state if memory goes back down
      if (!isWarning) {
        setWarningDismissed(false);
      }
    }
  }, []);

  useEffect(() => {
    checkMemory();
    const interval = setInterval(checkMemory, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [checkMemory]);

  const dismissWarning = useCallback(() => {
    setWarningDismissed(true);
  }, []);

  return {
    ...memoryInfo,
    showWarning: memoryInfo.isWarning && !warningDismissed,
    dismissWarning,
  };
}
