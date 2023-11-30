import { useState, useEffect } from "react";

const getLocalValue = (key: string, initValue: any) => {
  // SSR Next.js
  if (typeof window === "undefined") return initValue;

  const localValueUnparsed = localStorage.getItem(key);
  if (localValueUnparsed) {
    // if a value is already store
    const localValue = JSON.parse(localValueUnparsed);
    if (localValue) return localValue;
  }

  // return result of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = (key: string, initValue: any) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
