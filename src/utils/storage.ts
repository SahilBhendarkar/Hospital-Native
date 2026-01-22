import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    save: async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error('Error saving data', e);
        }
    },

    load: async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Error loading data', e);
            return null;
        }
    },

    remove: async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing data', e);
        }
    },

    clear: async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.error('Error clearing data', e);
        }
    },
};
