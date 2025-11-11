import { useCallback, useRef, useState } from 'react';

export interface DebugInfo {
  [key: string]: string;
  timestamp: string;
}

export interface UseDebugReturn {
  debugInfo: DebugInfo;
  addDebugInfo: (key: string, value: string) => void;
  clearDebugInfo: () => void;
  getDebugLog: () => string;
}

export const useDebug = (): UseDebugReturn => {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({ timestamp: Date.now().toString() });
  const debugHistoryRef = useRef<DebugInfo[]>([]);

  const addDebugInfo = useCallback((key: string, value: string) => {
    setDebugInfo(prev => {
      // Ограничиваем количество записей в текущем debugInfo до 50
      const currentEntries = Object.entries(prev).filter(([k]) => k !== 'timestamp');
      if (currentEntries.length >= 50) {
        // Удаляем самую старую запись (кроме timestamp)
        const oldestKey = currentEntries[0][0];
        const { [oldestKey]: _, ...rest } = prev;
        return { ...rest, [key]: value, timestamp: Date.now().toString() };
      }
      return { ...prev, [key]: value, timestamp: Date.now().toString() };
    });

    // Сохраняем в историю (последние 50 записей)
    debugHistoryRef.current.push({ [key]: value, timestamp: Date.now().toString() });
    if (debugHistoryRef.current.length > 50) {
      debugHistoryRef.current = debugHistoryRef.current.slice(-50);
    }
  }, []);

  const clearDebugInfo = useCallback(() => {
    setDebugInfo({ timestamp: Date.now().toString() });
    debugHistoryRef.current = [];
  }, []);

  const getDebugLog = useCallback(() => {
    return JSON.stringify(
      {
        current: debugInfo,
        history: debugHistoryRef.current,
      },
      null,
      2,
    );
  }, [debugInfo]);

  return {
    debugInfo,
    addDebugInfo,
    clearDebugInfo,
    getDebugLog,
  };
};
