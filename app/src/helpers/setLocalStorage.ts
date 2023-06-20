import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
    key: string,
    value: string
}

const setLocalStorage = async ({ key, value }: IProps) => {
    await AsyncStorage.setItem(key, value)
}

export default setLocalStorage