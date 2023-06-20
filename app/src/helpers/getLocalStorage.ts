import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
    key: string,
}

const getLocalStorage = async ({ key }: IProps) => {
    return await AsyncStorage.getItem(key) 
}

export default getLocalStorage