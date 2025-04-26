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

  // Memoize initialArgs stringified representation for dependency array
  const initialArgsString = JSON.stringify(initialArgs);

  const fetchData = useCallback(async (...args: any[]) => {
    // Only set loading if not already loading
    setState((prevState) => {
        if (prevState.loading) return prevState;
        return { ...prevState, loading: true, error: null };
    });
    console.log("useFetchData - fetchData called with args:", args); // Debug log
    try {
      const result = await fetchFunction(...args);
       console.log("useFetchData - fetch successful, result:", result); // Debug log
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      console.error("useFetchData - Error fetching data:", err);
      setState({ data: null, loading: false, error: err instanceof Error ? err : new Error('An unknown error occurred') });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFunction]); // fetchFunction might change if defined inline, but usually stable if imported

  useEffect(() => {
    if (fetchImmediately) {
      // Parse the stringified args back when calling fetchData
      fetchData(...JSON.parse(initialArgsString));
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, fetchImmediately, initialArgsString]); // Use stringified args in dependency array


  return { ...state, refetch: fetchData };
}
