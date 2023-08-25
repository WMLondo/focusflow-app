import { useEffect, useState } from "react";

const getStorage = (key) => JSON.parse(localStorage.getItem(key));

const setStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(getStorage(key) || defaultValue);

  useEffect(() => {
    setStorage(key, value);
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
