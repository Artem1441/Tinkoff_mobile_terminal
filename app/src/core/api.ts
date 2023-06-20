import axios from "axios";
import API from "../constants/API";
import store from "../store";
import { setCandlesAction, setOrderbookAction, setOrderPriceAction, setOrderQuantityAction, setOrdersAction, setPortfolioAction, setShareInfoAction, setStocksAction, setStocksJSONAction, setTradingStatusAction } from "../store/DataReducer";

export const TestToken = async () => {
    const state = store.getState();
    const { token } = state.TokenReducerName

    try {
        const res = await axios.post(`${API.Api}/test_token`, { token }).then(res => {
            return res.data
        })
        return res
    }
    catch (err) {
        console.log(err)
    }

}

export const GetStocks = async () => {
    await axios.get(`${API.Api}/get_stocks`).then(res => {
        store.dispatch(setStocksAction(res.data))
    })

    await axios.get(`${API.Api}/get_stocks_json`).then(res => {
        store.dispatch(setStocksJSONAction(res.data))
    })
}

export const GetPortfolio = async (ErrorAction: any) => {
    const state = store.getState();
    const { token, accountId } = state.TokenReducerName

    await axios.post(`${API.Api}/get_portfolio`, { token, accountId }).then(res => {
        if (res.data.status) {
            store.dispatch(setPortfolioAction(res.data.result))
        } else {
            ErrorAction(res.data.message)
            console.log(res.data.message, res.data.result)
        }
    })
}

export const GetCandles = async () => {
    const state = store.getState();
    const { token } = state.TokenReducerName
    const { currentTicker } = state.DataReducerName

    await axios.post(`${API.Api}/get_candles`, { token, ticker: currentTicker }).then(res => {
        store.dispatch(setCandlesAction(res.data.result))
    })
}

export const AddOrder = async (direction: any, ErrorAction: any) => {
    const state = store.getState();
    const { token, accountId } = state.TokenReducerName
    const { currentTicker, orderPrice, orderQuantity } = state.DataReducerName

    await axios.post(`${API.Api}/add_order`, { token, accountId, ticker: currentTicker, price: orderPrice, quantity: orderQuantity, direction }).then((res) => {
        if (res.data.status) {
            GetOrders(ErrorAction)
            store.dispatch(setOrderPriceAction(""))
            store.dispatch(setOrderQuantityAction(""))
        } else {
            ErrorAction(res.data.message)
            console.log(res.data.message, res.data.result)
        }
    })
}

export const GetOrders = async (ErrorAction: any) => {
    const state = store.getState();
    const { token, accountId } = state.TokenReducerName

    await axios.post(`${API.Api}/get_orders`, { token, accountId }).then(res => {
        if (res.data.status) {
            store.dispatch(setOrdersAction(res.data.result))
        } else {
            ErrorAction(res.data.message)
            console.log(res.data.message, res.data.result)
        }
    })

}

export const CancelOrder = async (orderId: any, ErrorAction: any) => {
    const state = store.getState();
    const { token, accountId } = state.TokenReducerName
    await axios.post(`${API.Api}/cancel_order`, { token, accountId, orderId }).then((res) => {
        if (res.data.status) {
            GetOrders(ErrorAction)
        } else {
            ErrorAction(res.data.message)
            console.log(res.data.message, res.data.result)
        }
    })
}

export const IsOpenMarketForStock = async (ErrorAction: any) => {
    const state = store.getState();
    const { token } = state.TokenReducerName
    const { currentTicker } = state.DataReducerName
    await axios.post(`${API.Api}/is_open_market_for_stock`, { token, ticker: currentTicker }).then((res) => {
        if (res.data.status) {
            store.dispatch(setTradingStatusAction(res.data.result))
        } else {
            ErrorAction(res.data.message)
            console.log(res.data.message, res.data.result)
        }
    })
}

export const GetShareInfo = async (ErrorAction: any) => {
    const state = store.getState();
    const { token } = state.TokenReducerName
    const { currentTicker } = state.DataReducerName
    await axios.post(`${API.Api}/get_share_info`, { token, ticker: currentTicker }).then((res) => {
        if (res.data.status) {
            store.dispatch(setShareInfoAction(res.data.result))
        } else {
            ErrorAction(res.data.message)
            console.log(res.data.message, res.data.result)
        }
    })
}

export const GetLastCandle = async (ErrorAction: any) => {
    const state = store.getState();
    const { token } = state.TokenReducerName
    const { currentTicker } = state.DataReducerName
    await axios.post(`${API.Api}/get_last_candle`, { token, ticker: currentTicker }).then((res) => {
        if (res.data.status) {
            console.log(res.data.result)
            // store.dispatch(setShareInfoAction(res.data.result))
        } else {
            ErrorAction(res.data.message)
            console.log(res.data.message, res.data.result)
        }
    })
}

export const GetOrderbook = async (ErrorAction: any) => {
    const state = store.getState();
    const { token } = state.TokenReducerName
    const { currentTicker } = state.DataReducerName
    await axios.post(`${API.Api}/get_orderbook`, { token, ticker: currentTicker }).then((res) => {
        if (res.data.status) {
            store.dispatch(setOrderbookAction({ asks: res.data.result.asks.reverse(), bids: res.data.result.bids }))
        } else {
            ErrorAction(res.data.message)
            console.log(res.data.message, res.data.result)
        }
    })
}