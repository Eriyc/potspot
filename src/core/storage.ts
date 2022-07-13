import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export function getItem<T>(name: string): T {
  const value = storage.getString(name);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(name: string, value: T) {
  storage.set(name, JSON.stringify(value));
}
export async function removeItem(name: string) {
  storage.delete(name);
}
