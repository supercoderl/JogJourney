import AsyncStorage from '@react-native-async-storage/async-storage';

export const get_storage_data = async (dataField: string) => {
    try {
        const value = await AsyncStorage.getItem(dataField);
        return value ? JSON.parse(value) : null;

    } catch (e) {
        // error reading value
        console.log(e);
    }

};

export const set_storage_data = async (dataField: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(dataField, jsonValue);
    } catch (e) {
        console.log(e);
    }
};
export const clear_storage_data = async () => {
    try {
        await AsyncStorage.clear(); // This clears all keys in AsyncStorage
        console.log('All storage cleared!');
    } catch (e) {
        console.log('Error clearing storage:', e);
    }
};


export default { get_storage_data, set_storage_data, clear_storage_data };
