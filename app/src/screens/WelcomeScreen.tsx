import { TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import SCREENS from "../constants/SCREENS";
import THEMES from "../constants/THEMES";
import { TestToken } from "../core/api";
import setLocalStorage from "../helpers/setLocalStorage";
import { setErrorAction, setTokenAction } from "../store/TokenReducer";

const WelcomeScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.TokenReducerName.token);
    const error = useSelector((state: any) => state.TokenReducerName.error);

    const sendToken = async () => {
        const res = await TestToken()
        if (!res.status) dispatch(setErrorAction(res.message))
        else {
            setLocalStorage({ key: "token", value: token })
            setLocalStorage({ key: "accountId", value: res.result })
            navigation.navigate(SCREENS.MainScreen)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Вставьте токен от Tinkoff API</Text>

                <TextInput
                    placeholder="Вставьте токен"
                    placeholderTextColor={THEMES.DarkTextColor}
                    style={styles.input}
                    autoCapitalize={"none"}
                    onChangeText={(prev) => dispatch(setTokenAction(prev))}
                    value={token}
                />

                <TouchableOpacity onPress={sendToken}>
                    <Text style={styles.btnText}>Попробовать</Text>
                </TouchableOpacity>

                {error && <Text style={styles.error}>
                    {error}
                </Text>}

                <View style={styles.getToken}>
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HelpScreen)}>
                        <Text style={styles.getTokenText}>Как получить токен?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: "rgb(210, 210, 210)",
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: "#808e9b",
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        marginTop: 10,
        color: '#808e9b',
    },
    btnText: {
        color: '#808e9b',
        marginBottom: 10,
        fontSize: 16
    },
    error: {
        color: "red"
    },
    getTokenText: {
        color: "black",
        fontSize: 16
    },
    getToken: {
        position: "absolute",
        bottom: 14,
        left: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center"
    }
})