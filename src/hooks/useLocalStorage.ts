"use client";
import { useState, useEffect } from "react";

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Sync from localStorage on client side
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
    }
  }, [key]);

  // Setter function that updates both state and localStorage
  const setValue = (value: SetValue<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;


// Usage in Frontend
// import useLocalStorage from "@/hooks/useLocalStorage";

// const Counter = () => {
//   const [count, setCount] = useLocalStorage("counter", 0);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
//     </div>
//   );
// };
