import { ScrollView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import SCREENS from "../constants/SCREENS"
import removeLocalStorage from "../helpers/removeLocalStorage"
import { setAccountIdAction, setTokenAction } from "../store/TokenReducer"

const SettingsScreen = ({ navigation }: any) => {
    const dispatch = useDispatch()

    const logout = () => {
        removeLocalStorage({ key: "token" });
        removeLocalStorage({ key: "accountId" });
        dispatch(setTokenAction(""))
        dispatch(setAccountIdAction(""))
        navigation.navigate(SCREENS.WelcomeScreen)
    }

    return (
        <ScrollView>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Удалить токен и выйти из приложения:</Text>
            </View>

            <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => logout()}>
                    <View style={styles.backBtn}>
                        <Text style={styles.btnText}>Выйти</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    textContainer: {
        marginTop: 12,
        marginBottom: 4,
        paddingHorizontal: 10
    },
    text: {
        color: "black"
    },
    backBtn: {
        backgroundColor: "red",
        width: 64,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6
    },
    btnText: {
        color: "white",
        fontSize: 16
    }
})