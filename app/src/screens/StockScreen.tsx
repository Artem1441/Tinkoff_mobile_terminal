import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import ChartScreenComponent from "../components/ChartScreenComponent";
import OrderbookScreenComponent from "../components/OrderbookScreenComponent";
import StockTop from "../components/StockTop";
import { IsOpenMarketForStock } from "../core/api";
import { setTradingStatusAction } from "../store/DataReducer";

const StockScreen = () => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const { tradingStatus } = useSelector((state: any) => state.DataReducerName);
    const [block, setBlock] = useState("order")
    const interval: any = useRef();

    const showError = (text: any) => Alert.alert(text)

    const makeRequests = () => {
        IsOpenMarketForStock(showError)
    }

    const resetInterval = () => {
        clearInterval(interval.current);
        interval.current = null;
    }

    useEffect(() => {
        makeRequests()
        if (isFocused) interval.current = setInterval(() => makeRequests(), 5000)
        if (!isFocused) resetInterval()

        return () => {
            dispatch(setTradingStatusAction(0))
        }
    }, [isFocused])

    return (
        <ScrollView >
            <View style={styles.btnsTop}>
                <TouchableOpacity onPress={() => setBlock("chart")}>
                    <View style={block === "chart" ? styles.btnActive : styles.btnUnactive}>
                        <Text style={styles.btnText}>
                            График
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setBlock("order")}>
                    <View style={block === "order" ? styles.btnActive : styles.btnUnactive}>
                        <Text style={styles.btnText}>
                            Торговля
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <StockTop />

            {block === "chart"
                ?
                <>
                    <ChartScreenComponent />
                </>
                :
                <>
                    <OrderbookScreenComponent isWork={tradingStatus === 5} />
                </>
            }

        </ScrollView>
    )
}

export default StockScreen

const styles = StyleSheet.create({
    ticker: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10
    },
    btnText: {
        fontSize: 16,
        color: "black"
    },
    btnsTop: {
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    btnActive: {
        width: Dimensions.get("screen").width * 0.48,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "gray"
    },
    btnUnactive: {
        width: Dimensions.get("screen").width * 0.48,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "lightgray"
    }
})