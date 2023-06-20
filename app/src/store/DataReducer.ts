import { IAction } from "./IAction"

const SET_CURRENT_TICKER = "SET_CURRENT_TICKER"
const SET_STOCKS = "SET_STOCKS"
const SET_PORTFOLIO = "SET_PORTFOLIO"
const SET_PORTFOLIO_ONE_STOCK = "SET_PORTFOLIO_ONE_STOCK"
const SET_ORDERBOOK = "SET_ORDERBOOK"
const SET_CANDLE = "SET_CANDLE"
const SET_CANDLES = "SET_CANDLES"
const SET_CURRENT_TIMESTAMP = "SET_CURRENT_TIMESTAMP"
const SET_STOCKS_JSON = "SET_STOCKS_OBJ"
const SET_ORDER_PRICE = "SET_ORDER_PRICE"
const SET_ORDER_QUANTITY = "SET_ORDER_QUANTITY"
const SET_ORDERS = "SET_ORDERS"
const SET_TRADING_STATUS = "SET_TRADING_STATUS"
const SET_SHARE_INFO = ""

const defaultState = {
    currentTicker: "",
    stocks: [],
    stocksJSON: {},
    portfolio: {},
    portfolioOneStock: {},
    orderbook: { asks: [], bids: [] },
    candle: {},
    candles: [],
    currentTimestamp: null,
    orderPrice: "",
    orderQuantity: "",
    orders: [],
    lastPrice: 0,
    tradingStatus: 0,
    shareInfo: {}
};

const DataReducer = (state = defaultState, action: IAction) => {
    switch (action.type) {
        case SET_CURRENT_TICKER: {
            return {
                ...state,
                currentTicker: action.payload,
            };
        }
        case SET_STOCKS: {
            return {
                ...state,
                stocks: action.payload,
            };
        }
        case SET_STOCKS_JSON: {
            return {
                ...state,
                stocksJSON: action.payload,
            };
        }
        case SET_PORTFOLIO: {
            return {
                ...state,
                portfolio: action.payload,
            };
        }
        case SET_PORTFOLIO_ONE_STOCK: {
            return {
                ...state,
                portfolioOneStock: action.payload,
            };
        }
        case SET_ORDERBOOK: {
            return {
                ...state,
                orderbook: action.payload,
            };
        }
        case SET_CANDLE: {
            return {
                ...state,
                candle: action.payload,
                lastPrice: action.payload.close
            };
        }
        case SET_CANDLES: {
            return {
                ...state,
                candles: action.payload,
            };
        }
        case SET_CURRENT_TIMESTAMP: {
            return {
                ...state,
                currentTimestamp: action.payload,
            };
        }
        case SET_ORDER_PRICE: {
            return {
                ...state,
                orderPrice: action.payload,
            };
        }
        case SET_ORDER_QUANTITY: {
            return {
                ...state,
                orderQuantity: action.payload,
            };
        }
        case SET_ORDERS: {
            return {
                ...state,
                orders: action.payload,
            };
        }
        case SET_TRADING_STATUS: {
            return {
                ...state,
                tradingStatus: action.payload,
            };
        }
        case SET_SHARE_INFO: {
            return {
                ...state,
                shareInfo: action.payload,
            };
        }
        default:
            return state;
    }
}

export default DataReducer;


export const setCurrentTickerAction = (str: string) => ({
    type: SET_CURRENT_TICKER,
    payload: str,
});

export const setStocksAction = (arr: []) => ({
    type: SET_STOCKS,
    payload: arr,
});

export const setStocksJSONAction = (obj: {}) => ({
    type: SET_STOCKS_JSON,
    payload: obj,
});

export const setPortfolioAction = (obj: {}) => ({
    type: SET_PORTFOLIO,
    payload: obj,
});

export const setPortfolioOneStockAction = (obj: {}) => ({
    type: SET_PORTFOLIO_ONE_STOCK,
    payload: obj,
});

export const setOrderbookAction = (obj: {}) => ({
    type: SET_ORDERBOOK,
    payload: obj,
});

export const setCandleAction = (obj: {}) => ({
    type: SET_CANDLE,
    payload: obj,
});

export const setCandlesAction = (arr: []) => ({
    type: SET_CANDLES,
    payload: arr,
});

export const setCurrentTimestampAction = (number: number) => ({
    type: SET_CURRENT_TIMESTAMP,
    payload: number,
});

export const setOrderPriceAction = (str: string) => ({
    type: SET_ORDER_PRICE,
    payload: str,
});

export const setOrderQuantityAction = (str: string) => ({
    type: SET_ORDER_QUANTITY,
    payload: str,
});

export const setOrdersAction = (arr: []) => ({
    type: SET_ORDERS,
    payload: arr,
});

export const setTradingStatusAction = (number: number) => ({
    type: SET_TRADING_STATUS,
    payload: number,
});

export const setShareInfoAction = (obj:{}) => ({
    type: SET_SHARE_INFO,
    payload: obj,
});