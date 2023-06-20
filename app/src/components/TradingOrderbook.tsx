import { memo, useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ToNumber from "../helpers/ToNumber"
import { setOrderPriceAction } from "../store/DataReducer";

const TradingOrderbook = () => {
    const dispatch = useDispatch()
    const { asks, bids } = useSelector((state: any) => state.DataReducerName.orderbook);
    const { orders, currentTicker } = useSelector((state: any) => state.DataReducerName);
    const [max, setMax] = useState(-1)
    const width = Dimensions.get("screen").width
    const [localOrders, setLocalOrders]: any = useState({})

    useEffect(() => {
        const arr = [...asks, ...bids]
        let maxLocal = 0
        arr.map(item => { if (item.quantity > maxLocal) maxLocal = item.quantity })
        setMax(maxLocal)

    }, [asks, bids])

    useEffect(() => {
        const obj: any = {}
        orders.forEach((order: any) => { if (order.ticker === currentTicker) obj[order.initialSecurityPrice] = order.lotsRequested })
        setLocalOrders(obj)

    }, [orders])

    return (
        <>
            {(asks.length && bids.length) ?
                <View>
                    {asks.map((item: any, i: number) =>
                        <TouchableOpacity key={i} onPress={() => dispatch(setOrderPriceAction(ToNumber(item.price).toString()))}>
                            <View style={styles.container}>
                                <View style={styles.block}></View>
                                <View style={styles.blockCenter}><Text style={{ color: "black" }}>{ToNumber(item.price)}</Text></View>
                                <View style={{ ...styles.block, alignItems: "flex-end" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        {localOrders[ToNumber(item.price)] ?
                                            <View style={styles.textContainer}>
                                                <View style={styles.order}>
                                                    <Text style={styles.orderText}>{localOrders[ToNumber(item.price)]}</Text>
                                                </View>
                                            </View> : null}
                                        <View style={styles.textContainer}>
                                            <Text style={{ color: "black" }}>{item.quantity}</Text>
                                        </View>
                                    </View>
                                    {max > 0 &&
                                        <View style={{ width: (width * 0.4) * item.quantity / max, ...styles.blockRed, position: "absolute", zIndex: -1 }}>
                                            <Text></Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}

                    {bids.map((item: any, i: number) =>
                        <TouchableOpacity key={i} onPress={() => dispatch(setOrderPriceAction(ToNumber(item.price).toString()))}>
                            <View style={styles.container}>
                                <View style={{ ...styles.block }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={styles.textContainer}>
                                            <Text style={{ color: "black" }}>{item.quantity}</Text>
                                        </View>
                                        {localOrders[ToNumber(item.price)] ?
                                            <View style={styles.textContainer}>
                                                <View style={styles.order}>
                                                    <Text style={styles.orderText}>{localOrders[ToNumber(item.price)]}</Text>
                                                </View>
                                            </View>
                                            : null}
                                    </View>
                                    {max > 0 && <View style={{ width: (width * 0.4) * item.quantity / max, ...styles.blockGreen, position: "absolute", zIndex: -1 }}>
                                        <Text style={{ color: "black" }}></Text>
                                    </View>
                                    }
                                </View>
                                <View style={styles.blockCenter}><Text style={{ color: "black" }}>{ToNumber(item.price)}</Text></View>
                                <View style={styles.block}></View>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                : <Text style={styles.loadingText}>Загрузка...</Text>}
        </>
    )
}

export default memo(TradingOrderbook)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 24,
        borderTopWidth: 0.5,
        borderTopColor: "rgba(0,0,0, 0.2)"
    },
    block: {
        width: "40%",
        position: "relative",
    },
    blockCenter: {
        width: "20%",
        alignItems: "center",
        height: 24,
        justifyContent: "center"
    },
    blockGreen: {
        height: 24,
        backgroundColor: "rgba(0, 255, 0, 0.3)",
        justifyContent: "center"
    },
    blockRed: {
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        height: 24,
        justifyContent: "center"
    },
    centerText: {
        fontSize: 18,
        fontWeight: "500"
    },
    textContainer: {
        height: 24,
        justifyContent: "center",
    },
    order: {
        backgroundColor: "blue",
        width: 25,
        borderRadius: 50,
        alignItems: "center",
        marginLeft: 10,
        height: 15
    },
    orderText: {
        color: "white"
    },
    loadingText: {
        fontSize: 16,
        marginVertical: 10,
        color: "black"
    }
})

{/* <View style={styles.container}>
                    <View style={styles.center}><Text style={styles.centerText}>{lastPrice ? lastPrice : "-"}</Text></View>
                </View> */}