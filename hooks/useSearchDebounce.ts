import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [keyword, setKeyWord] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyWord(true);
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return { debouncedValue, keyword };
};

export default useDebounce;
