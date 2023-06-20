import { useIsFocused } from "@react-navigation/native"
import { useEffect, useRef } from "react"
import { Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import API from "../constants/API"
import { GetOrderbook, GetOrders, GetPortfolio, GetShareInfo, IsOpenMarketForStock } from "../core/api"
import { setOrderbookAction, setOrderQuantityAction, setShareInfoAction } from "../store/DataReducer"
import IsClosedMarket from "./IsClosedMarket"
import OrdersList from "./OrdersList"
import PortfolioOneStock from "./PortfolioOneStock"
import TradingOrder from "./TradingOrder"
import TradingOrderbook from "./TradingOrderbook"

const OrderbookScreenComponent = ({ isWork }: any) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    // const { token } = useSelector((state: any) => state.TokenReducerName);
    // const { currentTicker } = useSelector((state: any) => state.DataReducerName.currentTicker);
    const interval: any = useRef();
    const interval2: any = useRef();

    const showError = (text: any) => Alert.alert(text)

    const makeRequests = () => {
        GetOrders(showError)
        IsOpenMarketForStock(showError)
        GetPortfolio(showError)
    }

    const resetInterval = () => {
        clearInterval(interval.current);
        clearInterval(interval2.current)
        interval.current = null;
        interval2.current = null;
    }

    useEffect(() => {
        // const ws = new WebSocket(`${API.Ws}/${currentTicker}`);
        // ws.onopen = () => { try { ws.send(JSON.stringify({ token, ticker: currentTicker })) } catch (err) { console.log(err) } };
        // ws.onmessage = (e) => {
        //     const obj = JSON.parse(e.data)
        //     if (obj.type === "orderbook") dispatch(setOrderbookAction({ asks: obj.asks.reverse(), bids: obj.bids }))
        // };

        GetShareInfo(showError)
        makeRequests()

        if (isFocused) {
            interval.current = setInterval(() => makeRequests(), 5000)
            interval2.current = setInterval(() => GetOrderbook(showError), 2000)
        }
        if (!isFocused) resetInterval()

        return () => {
            dispatch(setOrderQuantityAction(""))
            dispatch(setOrderbookAction({ asks: [], bids: [] }))
            dispatch(setShareInfoAction({}))
            // ws.close()
        }
    }, [isFocused])

    return (
        <>{isWork
            ?
            <>

                <TradingOrderbook />
                <TradingOrder />
                <OrdersList isAll={false} />
                <PortfolioOneStock />
            </>
            : <>
                <IsClosedMarket />
            </>}
        </>
    )
}

export default OrderbookScreenComponent