import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native"
import { useSelector } from "react-redux";
import { CancelOrder } from "../core/api";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { memo } from "react";

const OrdersList = ({ isAll }: any) => {
    const { orders, stocksJSON, currentTicker } = useSelector((state: any) => state.DataReducerName);
    const showToast = (text: any) => {
        Alert.alert(text)
    }

    return (
        <ScrollView style={styles.container}>
            {orders.length
                ?
                orders.map((order: any, i: any) => <View key={i}>
                    {(order.ticker === currentTicker || isAll) ?
                        <View key={order.orderId} style={styles.block}>
                            <View style={styles.blockSide}>
                                {order.direction === 1 ? <View style={styles.green} /> : <View style={styles.red} />}
                                {stocksJSON[order.ticker] ? <Image source={{ uri: stocksJSON[order.ticker].img }} style={styles.image} /> : null}
                                <View style={styles.left}>
                                    <Text style={{color: "black"}}>{order.ticker}</Text>
                                    <Text style={{color: "black"}}>{order.direction === 1 ? "Покупка" : "Продажа"}</Text>
                                </View>
                            </View>

                            <View style={styles.blockSide}>
                                <View style={styles.right}>
                                    <Text style={{color: "black"}}>{order.totalOrderAmount} руб.</Text>
                                    <Text style={{color: "black"}}>{order.lotsRequested} * {order.initialSecurityPrice}</Text>
                                </View>

                                <View style={styles.right}>
                                    <TouchableOpacity onPress={() => CancelOrder(order.orderId, showToast)}><MaterialIcons name="delete" size={30} color="gray" /></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        : null
                    }
                </View>
                )
                :
                <>
                    {isAll ?
                        <Text style={{color: "black"}}>Заявок нет</Text>
                        : null
                    }
                </>}
        </ScrollView>
    )
}

export default memo(OrdersList)

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    image: {
        width: 40, height: 40, borderRadius: 50,
        marginRight: 6,
        marginLeft: 6
    },
    block: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 5,
        // borderWidth: 1,
        // borderColor: "red",
        borderRadius: 20,
        marginVertical: 4,
        justifyContent: "space-between"
    },
    blockSide: {
        flexDirection: "row"
    },
    green: {
        width: 3,
        height: "100%",
        backgroundColor: "green",
    },
    red: {
        width: 3,
        height: "100%",
        backgroundColor: "red",
    },
    left: {
        justifyContent: "space-between"
    },
    right: {
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    leftRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%"
    }
})

// [{"averagePositionPrice": 0, "currency": "rub", "direction": 1, "executedCommission": 0, "executedOrderPrice": 0, "executionReportStatus": 4, "figi": "BBG004730N88", "initialCommission": 1.17, "initialOrderPrice": 2339.7, "initialSecurityPrice": 233.97, "lotsExecuted": 0, "lotsRequested": 1, "orderDate": "2023-06-05T18:23:10.117Z", "orderId": "36422019616", "orderType": 1, "serviceCommission": 0, "stages": [], "ticker": "SBER", "totalOrderAmount": 2339.7}, {"averagePositionPrice": 0, "currency": "rub", "direction": 1, "executedCommission": 0, "executedOrderPrice": 0, "executionReportStatus": 4, "figi": "BBG004730RP0", "initialCommission": 1.5899999999999999, "initialOrderPrice": 3175.8, "initialSecurityPrice": 158.79, "lotsExecuted": 0, "lotsRequested": 2, "orderDate": "2023-06-05T19:10:34.891Z", "orderId": "36422580678", "orderType": 1, "serviceCommission": 0, "stages": [], "ticker": "GAZP", "totalOrderAmount": 3175.8}, {"averagePositionPrice": 0, "currency": "rub", "direction": 2, "executedCommission": 0, "executedOrderPrice": 0, "executionReportStatus": 4, "figi": "BBG006L8G4H1", "initialCommission": 1.27, "initialOrderPrice": 2525.8, "initialSecurityPrice": 2525.8, "lotsExecuted": 0, "lotsRequested": 1, "orderDate": "2023-06-05T19:12:20.372Z", "orderId": "36422597454", "orderType": 1, "serviceCommission": 0, "stages": [], "ticker": "YNDX", "totalOrderAmount": 2525.8}]
