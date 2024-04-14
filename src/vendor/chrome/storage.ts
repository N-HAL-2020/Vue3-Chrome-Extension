const getStorageArea = () => {
  return chrome.storage.local;
};
type StorageArea = ReturnType<typeof getStorageArea>;

export const setStorage = async (key: string, value: any) => {
  return errorHandling((storage) => {
    storage.set({
      [key]: value,
    });
  });
};

/**
 * chrome.storage.local.get関数の1つ目の引数の型
 */
type SearchKeys = Parameters<StorageArea["get"]>[0];
export const getStorage = async (keys: SearchKeys) => {
  return errorHandling((storage) => {
    return storage.get(keys);
  });
};

export const removeStorage = async (keys: string | string[]) => {
  return errorHandling((storage) => {
    storage.remove(keys);
  });
};

type ErrorHandlingCallback<T> = (storage: StorageArea) => T;
/**
 * エラーハンドリング用のミドルウェア
 */
const errorHandling = <T>(callback: ErrorHandlingCallback<T>) => {
  try {
    const storage = getStorageArea();
    return callback(storage);
  } catch (e: unknown) {
    // return Result
    throw e;
  }
};
