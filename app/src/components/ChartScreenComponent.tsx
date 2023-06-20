import { useIsFocused } from "@react-navigation/native"
import { useEffect, useRef, useState } from "react"
import TradingChart from "./TradingChart"
import { GetCandles, GetLastCandle, GetShareInfo } from "../core/api"
import { setCandleAction, setCurrentTimestampAction, setOrderPriceAction } from "../store/DataReducer"
import { useDispatch, useSelector } from "react-redux"
import { Alert } from "react-native"

const ChartScreenComponent = () => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    // const { token } = useSelector((state: any) => state.TokenReducerName);
    const { candle, candles, currentTimestamp } = useSelector((state: any) => state.DataReducerName);
    const [values, setValues]: any[] = useState([])
    const interval: any = useRef();

    const showError = (text: any) => Alert.alert(text)

    const resetInterval = () => {
        clearInterval(interval.current);
        interval.current = null;
    }

    useEffect(() => {
        // const ws = new WebSocket(`${API.Ws}/${currentTicker}`)
        // ws.onopen = () => { try { ws.send(JSON.stringify({ token, ticker: currentTicker })) } catch (err) { console.log(err) } };
        // ws.onmessage = (e) => {
        //     const obj = JSON.parse(e.data)
        //     if (obj.type === "candle") dispatch(setCandleAction(obj))
        // };

        GetLastCandle(showError)

        GetShareInfo(showError)
        GetCandles()


        if (isFocused) interval.current = setInterval(() => GetCandles(), 5000)
        if (!isFocused) resetInterval()

        return () => {
            dispatch(setOrderPriceAction(""))
            dispatch(setCandleAction({}))
            // ws.close()
        }
    }, [])

    useEffect(() => {
        const arr: any = []
        candles.map((candle: any) => {
            arr.push({ timestamp: new Date(candle.time).getTime(), high: candle.high, low: candle.low, open: candle.open, close: candle.close })
        })
        setValues(arr)
    }, [candles])

    useEffect(() => {
        const arr: any = []
        candles.map((candle: any) => {
            arr.push({ timestamp: new Date(candle.time).getTime(), high: candle.high, low: candle.low, open: candle.open, close: candle.close })
        })
        arr.push({ timestamp: candle.timestamp, high: candle.high, low: candle.low, open: candle.open, close: candle.close })
        if (candle.timestamp !== currentTimestamp) {
            dispatch(setCurrentTimestampAction(candle.timestamp))
            GetCandles()
        }
        setValues(arr)
    }, [candle])

    return (
        <>
            <TradingChart values={values} />
        </>
    )
}

export default ChartScreenComponent