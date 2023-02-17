export const getLocalStorage = (key, defaultValue) => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  };
  
  export const setLocalStorage = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  