import { useState } from 'react';

export function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

export function validateName(name) {
  const MIN_NUMBER = 12;
  return name.length >= MIN_NUMBER;
}

export function validatePassword(string) {
  const MIN_NUMBER = 6;
  return string.length >= MIN_NUMBER;
}

// ref from userLocalStorage https://usehooks.com/useLocalStorage/
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export function roundDigits(num) {
  const rounded = Math.round((Number(num) + Number.EPSILON) * 100) / 100;
  return rounded.toFixed(2);
}
