import { useEffect, useRef, } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native"
import { useDispatch } from 'react-redux';
import Orders from "../components/Orders";
import Portfolio from "../components/Portfolio";
import StocksList from "../components/StocksList";
import THEMES from "../constants/THEMES";
import { GetOrders, GetPortfolio, GetStocks } from "../core/api";
import getLocalStorage from "../helpers/getLocalStorage";
import { setAccountIdAction, setTokenAction } from "../store/TokenReducer";
import { useIsFocused } from "@react-navigation/native";

const MainScreen = ({ navigation }: any) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const showError = (text: any) => { Alert.alert(text) }
    const interval: any = useRef();

    const makeRequests = () => {
        GetPortfolio(showError)
        GetStocks()
        GetOrders(showError)
    }

    const resetInterval = () => {
        clearInterval(interval.current);
        interval.current = null;
    }

    useEffect(() => {
        const Start = async () => {
            const tokenLocal = await getLocalStorage({ key: "token" }) || ""
            const accountIdLocal = await getLocalStorage({ key: "accountId" }) || ""
            dispatch(setTokenAction(tokenLocal))
            dispatch(setAccountIdAction(accountIdLocal))
            makeRequests()
        }

        Start()

        if (isFocused) interval.current = setInterval(() => makeRequests(), 5000)
        if (!isFocused) resetInterval()

    }, [isFocused])


    return (
        <>
            <ScrollView style={styles.container}>
                <Orders />
                <Portfolio navigation={navigation} />
                <StocksList navigation={navigation} />
            </ScrollView>
        </>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: THEMES.DarkBackgroundColor,
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: THEMES.DarkTextColor,
    }
})

{/* {"balance": -3170.48, "positions": [{"averagePositionPrice": [Object], "balance": 70, "expectedYield": [Object], "figi": "BBG00F9XX7H4", "instrumentType": "Stock", "isin": "RU000A0JSE60", "lots": 70, "name": "РуссНефть", "ticker": "RNFT"}]} */ }