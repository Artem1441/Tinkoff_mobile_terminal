import { memo, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import getStockInfoByTicker from "../helpers/getStockInfoByTicker";
import roundPrice from "../helpers/roundPrice";
import showPercent from "../helpers/showPercent";
import { setPortfolioOneStockAction } from "../store/DataReducer";

const PortfolioOneStock = () => {
    const dispatch = useDispatch()
    const { portfolioOneStock, portfolio, currentTicker, stocksJSON, stocks } = useSelector((state: any) => state.DataReducerName);

    const close = portfolioOneStock.close
    const quantity = portfolioOneStock.quantity
    // const quantityLots = portfolioOneStock.quantityLots
    const expectedYield = portfolioOneStock.expectedYield
    const dataOpen = close * quantity - expectedYield
    const dataClose = close * quantity

    useEffect(() => {
        let isPosition = false
        portfolio.positions.map((position: any) => {
            if (position.figi === stocksJSON[currentTicker].figi) {
                isPosition = true
                dispatch(setPortfolioOneStockAction(getStockInfoByTicker(stocks, position)))
            }
        })
        if (!isPosition) dispatch(setPortfolioOneStockAction({}))
    }, [portfolio])

    return (
        <View style={styles.container}>
            {close
                ?
                <>
                    <Text style={{color: "black"}}>{close}&#8381; </Text>
                    {/* <Text>{quantityLots} лот - {quantity} штук </Text> */}
                    <View style={styles.texts}>
                        <Text style={styles.price}>{roundPrice(close * quantity)}&#8381;</Text>
                        <Text style={{color: "black"}}>{quantity} шт.</Text>
                    </View>
                    <View style={styles.texts}>
                        <Text style={expectedYield > 0 ? styles.textGreen : expectedYield < 0 ? styles.textRed : styles.textGray}>{expectedYield > 0 ? "+" : expectedYield < 0 ? "-" : null}{expectedYield}&#8381; </Text>
                        <Text style={dataOpen < dataClose ? styles.textGreen : dataOpen > dataClose ? styles.textRed : styles.textGray}>{showPercent(dataOpen, dataClose)}%</Text>
                    </View>
                </>
                :
                null}
        </View>
    )
}

export default memo(PortfolioOneStock)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    price: {
        fontSize: 18,
        fontWeight: "500",
        color: "black"
    },
    textGreen: {
        color: "green"
    },
    textRed: {
        color: "red"
    },
    textGray: {
        color: "gray"
    },
    image: {
        width: 40, height: 40, borderRadius: 50, marginRight: 10
    },
    texts: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 3,
        alignItems: "center"
    }
})