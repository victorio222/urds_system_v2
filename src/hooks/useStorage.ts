type StorageType = "session" | "local";

type UseStorageReturnValue = {
  getItem: (key: string, type?: StorageType) => string;
  setItem: (key: string, value: string, type?: StorageType) => boolean;
  removeItem: (key: string, type?: StorageType) => void;
  removeAll: (type?: StorageType) => void;
};

const useStorage = (): UseStorageReturnValue => {
  const getStorage = (type?: StorageType): Storage => {
    if (typeof window === "undefined") throw new Error("window is undefined");
    return type === "session" ? window.sessionStorage : window.localStorage;
  };

  const getItem = (key: string, type?: StorageType): string => {
    return getStorage(type).getItem(key) ?? "";
  };

  const setItem = (key: string, value: string, type?: StorageType): boolean => {
    getStorage(type).setItem(key, value);
    return true;
  };

  const removeItem = (key: string, type?: StorageType) => {
    getStorage(type).removeItem(key);
  };

  const removeAll = (type?: StorageType) => {
    getStorage(type).clear();
  };

  return {
    getItem,
    setItem,
    removeItem,
    removeAll,
  };
};

export default useStorage;
