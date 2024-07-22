import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebounced] = useState(value);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
      setIsSearch(true);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return { debouncedValue, isSearch };
};

export default useDebounce;
