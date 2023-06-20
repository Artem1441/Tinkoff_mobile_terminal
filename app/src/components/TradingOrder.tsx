import { memo, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import THEMES from "../constants/THEMES";
import { AddOrder } from "../core/api";
import roundPrice from "../helpers/roundPrice";
import showPercent from "../helpers/showPercent";
import { setOrderPriceAction, setOrderQuantityAction } from "../store/DataReducer";

const TradingOrder = () => {
    const dispatch = useDispatch();
    const { orderPrice, orderQuantity, portfolioOneStock, shareInfo } = useSelector((state: any) => state.DataReducerName);


    // useEffect(() => {
    //     console.log("orderPrice")
    // }, [orderPrice])

    // useEffect(() => {
    //     console.log("orderQuantity")
    // }, [orderQuantity])

    // useEffect(() => {
    //     console.log("portfolioOneStock")
    // }, [portfolioOneStock])

    // useEffect(() => {
    //     console.log("shareInfo")
    // }, [shareInfo])

    const showError = (text: any) => { Alert.alert(text) }

    return (
        <>
            <View style={styles.container}>
                {shareInfo.buyAvailableFlag ? <View style={styles.typeOfTrade}>
                    {shareInfo.sellAvailableFlag ? <Text style={styles.typeOfTradeText}>L/S</Text> : <Text style={styles.typeOfTradeText}>L</Text>}
                </View> : null}
                <TextInput
                    placeholder="Цена"
                    placeholderTextColor={THEMES.DarkTextColor}
                    style={styles.input}
                    autoCapitalize={"none"}
                    onChangeText={(prev) => dispatch(setOrderPriceAction(prev))}
                    value={orderPrice}
                />
                <TextInput
                    placeholder="Количество"
                    placeholderTextColor={THEMES.DarkTextColor}
                    style={styles.input}
                    autoCapitalize={"none"}
                    onChangeText={(prev) => dispatch(setOrderQuantityAction(prev))}
                    value={orderQuantity}
                />

                <View style={styles.hiddenTextContainer}>
                    {(portfolioOneStock.quantityLots && orderPrice)
                        ?
                        <>
                            {portfolioOneStock.quantityLots > 0
                                ?
                                <>
                                    {orderPrice > portfolioOneStock.averagePositionPrice
                                        ?
                                        <Text style={styles.green}>+{showPercent(portfolioOneStock.averagePositionPrice, orderPrice)}%</Text>
                                        : orderPrice < portfolioOneStock.averagePositionPrice
                                            ?
                                            <Text style={styles.red}>{showPercent(portfolioOneStock.averagePositionPrice, orderPrice)}%</Text>
                                            :
                                            <Text style={styles.gray}>{showPercent(portfolioOneStock.averagePositionPrice, orderPrice)}%</Text>
                                    }
                                </>
                                :
                                <>
                                    {orderPrice < portfolioOneStock.averagePositionPrice
                                        ?
                                        <Text style={styles.green}>+{showPercent(orderPrice, portfolioOneStock.averagePositionPrice)}%</Text>
                                        : orderPrice > portfolioOneStock.averagePositionPrice
                                            ?
                                            <Text style={styles.red}>{showPercent(orderPrice, portfolioOneStock.averagePositionPrice)}%</Text>
                                            :
                                            <Text style={styles.gray}>{showPercent(orderPrice, portfolioOneStock.averagePositionPrice)}%</Text>
                                    }
                                </>
                            }

                        </>
                        :
                        <Text />}
                    {(orderPrice && orderQuantity) ? <>
                        <Text style={{ color: "black" }}>{roundPrice(orderQuantity * orderPrice * shareInfo.lot)}&#8381;</Text></> : null}
                </View>

                {(orderPrice && orderQuantity)
                    ?
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity onPress={() => AddOrder("BUY", showError)}>
                            <View style={styles.btnGreen}>
                                <Text style={styles.btnText}>Покупка</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => AddOrder("SELL", showError)}>
                            <View style={styles.btnRed}>
                                <Text style={styles.btnText}>Продажа</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.btnsContainer}>
                        <View style={{ ...styles.btnGreen, opacity: 0.5 }}>
                            <Text style={styles.btnText}>Покупка</Text>
                        </View>

                        <View style={{ ...styles.btnRed, opacity: 0.5 }}>
                            <Text style={styles.btnText}>Продажа</Text>
                        </View>
                    </View>
                }
            </View>
        </>
    )
}

export default memo(TradingOrder)

const styles = StyleSheet.create({
    container: {
        borderTopColor: "rgba(0,0,0, 0.2)",
        borderTopWidth: 0.5,
        borderBottomColor: "rgba(0,0,0, 0.2)",
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 6
    },
    image: {
        width: 44, height: 44, borderRadius: 50
    },
    green: {
        color: "green"
    },
    red: {
        color: "red"
    },
    gray: {
        color: "gray"
    },
    input: {
        width: '100%',
        height: 50,
        // backgroundColor: THEMES.DarkBackgroundColor,
        backgroundColor: "rgb(210, 210, 210)",
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        // color: THEMES.DarkTextColor,
        color: "#808e9b",
        marginBottom: 10
    },
    btnsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 7
    },
    btnGreen: {
        backgroundColor: "green",
        width: Dimensions.get("screen").width * 0.45,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    btnRed: {
        backgroundColor: "red",
        width: Dimensions.get("screen").width * 0.45,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    btnText: {
        color: "white",
        fontSize: 16
    },
    hiddenTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 14,
        marginVertical: 3
    },
    typeOfTrade: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(210, 210, 210)",
        borderRadius: 50,
    },
    typeOfTradeText: {
        color: "#808e9b",
        fontSize: 12
    }
})


    // {"buyAvailableFlag": true, "lot": 10, "minPriceIncrement": 0.01, "sellAvailableFlag": true}

    // {"averagePositionPrice": 244.3, "averagePositionPriceFifo": 244.3, "averagePositionPricePt": 0, "blocked": false, "close": 244.33, "currentPrice": 244.34, "expectedYield": 0.41, "figi": "BBG004730N88", "img": "https://invest-brands.cdn-tinkoff.ru/sber3x160.png", "instrumentType": "share", "name": "Сбербанк", "open": 245.7, "quantity": 10, "quantityLots": 1, "ticker": "SBER"}

    // {"averagePositionPrice": 0.023035, "averagePositionPriceFifo": 0.023035, "averagePositionPricePt": 0, "blocked": false, "close": 0.023045, "currentPrice": 0.02304, "expectedYield": -0.05, "figi": "BBG004730ZJ9", "img": "https://invest-brands.cdn-tinkoff.ru/vtbx160.png", "instrumentType": "share", "name": "ВТБ", "open": 0.02312, "quantity": -10000, "quantityLots": -1, "ticker": "VTBR"}