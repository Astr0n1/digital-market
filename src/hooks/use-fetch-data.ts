'use client';

import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetchData<T>(
  fetchFunction: (...args: any[]) => Promise<T>,
  initialArgs: any[] = [], // Initial arguments for the fetch function
  fetchImmediately = true // Option to fetch immediately on mount
): FetchState<T> & { refetch: (...args: any[]) => Promise<void> } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: fetchImmediately,
    error: null,
  });

  const fetchData = useCallback(async (...args: any[]) => {
    // Only set loading if not already loading
    setState((prevState) => {
        if (prevState.loading) return prevState;
        return { ...prevState, loading: true, error: null };
    });
    try {
      const result = await fetchFunction(...args);
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      console.error("Error fetching data:", err);
      setState({ data: null, loading: false, error: err instanceof Error ? err : new Error('An unknown error occurred') });
    }
  }, [fetchFunction]); // Dependency: fetchFunction itself

  useEffect(() => {
    if (fetchImmediately) {
      fetchData(...initialArgs);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, fetchImmediately, initialArgs]); // Re-fetch if function, immediate flag, or args reference changes


  return { ...state, refetch: fetchData };
}
