import AsyncStorageLib from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'potspot_apikey';

export const persistToken = async (token: string) => {
  AsyncStorageLib.setItem(TOKEN_KEY, token);
};

export const eraseToken = async () => AsyncStorageLib.removeItem(TOKEN_KEY);

export const getToken = async (): Promise<string | null> => {
  const t = await AsyncStorageLib.getItem(TOKEN_KEY);
  return t;
};
