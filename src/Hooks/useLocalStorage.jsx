import { useEffect, useState } from "react";

export const useLocalStorage = (key,initialValue) => {
    const [value, setValue] = useState(() => {
        const savedValue = localStorage.getItem(key);
        return savedValue ? JSON.parse(savedValue) : initialValue
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);
  return [value,setValue]
}
