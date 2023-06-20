import { memo } from "react"
import { TextInput, StyleSheet, View, Text, Button, TouchableOpacity, Image } from "react-native"
import { useDispatch } from "react-redux"
import SCREENS from "../constants/SCREENS"
import showPercent from "../helpers/showPercent"
import { setCurrentTickerAction } from "../store/DataReducer"

const StockItem = ({ navigation, data }: any) => {
    const dispatch = useDispatch()

    const goToStockScreen = () => {
        dispatch(setCurrentTickerAction(data.ticker))
        navigation.navigate(SCREENS.StockScreen)
    }

    return (
        <TouchableOpacity onPress={goToStockScreen}>
            <View style={styles.container}>
                <Image source={{ uri: data.img }} style={styles.image} />
                <Text style={{color: "black"}}>{data.name} </Text>
                <Text style={{color: "black"}}>{data.close}&#8381; </Text>
                <Text style={data.open < data.close ? styles.textGreen : styles.textRed}>{showPercent(data.open, data.close)}%</Text>
            </View>
        </TouchableOpacity>
    )
}

export default memo(StockItem)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        borderTopColor: "#808e9b",
        borderTopWidth: 0.5,
    },
    textGreen: {
        color: "green"
    },
    textRed: {
        color: "red"
    },
    image: {
        width: 44, height: 44, borderRadius: 50,
        marginRight: 10
    },
})