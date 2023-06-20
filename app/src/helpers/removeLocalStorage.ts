import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
    key: string,
}

const removeLocalStorage = async ({ key }: IProps) => {
    return await AsyncStorage.removeItem(key)
}

export default removeLocalStorage