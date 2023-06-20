import { Helpers, RealAccount, TinkoffInvestApi } from 'tinkoff-invest-api';
import { CandleInterval } from 'tinkoff-invest-api/cjs/generated/marketdata.js';
import { OrderDirection, OrderType } from 'tinkoff-invest-api/cjs/generated/orders.js';

export const ApiGetApi = ({ token }) => {
    const api = new TinkoffInvestApi({ token })
    return api
}

export const ApiGetAccounts = async ({ token }) => {
    const api = ApiGetApi({ token })
    const { accounts } = await api.users.getAccounts({});
    return accounts
}

export const ApiGetAccount = async ({ token, accountId }) => {
    const api = ApiGetApi({token})
    const account = new RealAccount(api, accountId)
    return account
}

export const ApiGetPortfolio = async ({ token, accountId }) => {
    const api = ApiGetApi({ token })
    const portfolio = await api.operations.getPortfolio({ accountId });
    return portfolio
}

export const ApiGetCandles = async ({ token, figi }) => {
    const api = ApiGetApi({ token })
    const { candles } = await api.marketdata.getCandles({
        figi,
        interval: CandleInterval.CANDLE_INTERVAL_1_MIN,
        ...Helpers.fromTo('-24h'),
    });
    return candles
}

export const ApiAddOrder = async ({ token, accountId, figi, quantity, price, direction }) => {
    const account = await ApiGetAccount({ token, accountId })
    const numbers = "0123456789"
    let orderId
    for (let i = 0; i < 11; i++) orderId += numbers.charAt(Math.floor(Math.random() * numbers.length))

    const order = await account.postOrder({
        figi,
        quantity,
        price: Helpers.toQuotation(price),
        direction: direction === "BUY" ? OrderDirection.ORDER_DIRECTION_BUY : OrderDirection.ORDER_DIRECTION_SELL,
        orderType: OrderType.ORDER_TYPE_LIMIT,
        orderId,
    });

    return order
}

export const ApiGetOrders = async ({ token, accountId }) => {
    const account = await ApiGetAccount({ token, accountId })
    const { orders } = await account.getOrders();
    return orders
}

export const ApiCancelOrder = async ({ token, accountId, orderId }) => {
    const account = await ApiGetAccount({ token, accountId })
    account.cancelOrder(orderId)
}

export const ApiGetTradeStatus = async ({ token, figi }) => {
    const api = ApiGetApi({ token })
    const tradingStatus = await api.marketdata.getTradingStatus({ figi })
    return tradingStatus
}

export const ApiGetShareInfo = async ({ token, ticker }) => {
    const api = ApiGetApi({ token })
    let shareInfo
    const shares = await api.instruments.shares({ instrument_status: 1 })
    shares.instruments.forEach(share => { if (share.ticker === ticker) shareInfo = share })
    return shareInfo
}