import AsyncStorage from '@react-native-async-storage/async-storage';

type KeyType = 'access_token';

export const setToken = async (key: KeyType, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Error saving data for key ${key}: ${error}`);
  }
};

export const getToken = async (key: KeyType): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(`Error getting data for key ${key}: ${error}`);
    return null;
  }
};

export const removeToken = async (key: KeyType): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Error removing data for key ${key}: ${error}`);
  }
};
