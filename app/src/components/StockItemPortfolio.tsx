import { memo } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import { useDispatch } from "react-redux"
import SCREENS from "../constants/SCREENS"
import roundPrice from "../helpers/roundPrice"
import showPercent from "../helpers/showPercent"
import { setCurrentTickerAction } from "../store/DataReducer"

const StockItemPortfolio = ({ navigation, data }: any) => {

    // item.instrumentType === "share" &&

    const dispatch = useDispatch()

    const goToStockScreen = () => {
        dispatch(setCurrentTickerAction(data.ticker))
        navigation.navigate(SCREENS.StockScreen)
    }

    const name = data.name
    const close = data.close
    const quantity = data.quantity
    const expectedYield = data.expectedYield
    const dataOpen = close * quantity - expectedYield
    const dataClose = close * quantity

    // { "averagePositionPrice": 0.02255, "averagePositionPriceFifo": 0.02255, "averagePositionPricePt": 0, "blocked": false, "close": 0.02253, "currentPrice": 0.022535, "expectedYield": -0.15, "figi": "BBG004730ZJ9", "img": "https://invest-brands.cdn-tinkoff.ru/vtbx160.png", "instrumentType": "share", "name": "ВТБ", "open": 0.0205, "quantity": 10000, "quantityLots": 1, "ticker": "VTBR" }

    return (
        <>
            {data.instrumentType === "share" ?
                <TouchableOpacity onPress={goToStockScreen}>
                    <View style={styles.container}>
                        <Image source={{ uri: data.img }} style={styles.image} />
                        <Text style={{ color: "black" }}>{name} </Text>
                        <Text style={{ color: "black" }}>{close}&#8381; </Text>
                        <Text style={{ color: "black" }}>{roundPrice(close * quantity)}&#8381; </Text>
                        <Text style={expectedYield > 0 ? styles.textGreen : styles.textRed}>{expectedYield}&#8381; </Text>
                        <Text style={dataOpen < dataClose ? styles.textGreen : styles.textRed}>{showPercent(dataOpen, dataClose)}%</Text>
                    </View>
                </TouchableOpacity>
                :
                null}
        </>
    )
}

export default memo(StockItemPortfolio)


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
        width: 44, height: 44, borderRadius: 50, marginRight: 10
    },
})