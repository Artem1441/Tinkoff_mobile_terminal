import { Helpers, RealAccount, TinkoffInvestApi } from 'tinkoff-invest-api';
import { CandleInterval } from 'tinkoff-invest-api/cjs/generated/marketdata.js';
import { OrderDirection, OrderType } from 'tinkoff-invest-api/cjs/generated/orders.js';

export const ApiGetApi = ({ token }) => {
    // token = "t.j6uu1EQUZgSA5Y2WwNGkqfpNPUZyovGifaeq_a1AYF8OmWv6SlsSTKeEkRnc6B0Lx64ZJOtyosr9iLkKvfryfg" // for all
    // token = "t.8GJwYs7z_2VacBB12_DLqtlvmV_MAoCu7l-gApJUO13G9W8B0a-Fm9sEEFubdE4t-KNGwSud0W7hF7llycOF9Q" // for only one
    const api = new TinkoffInvestApi({ token })
    return api
}

export const ApiGetAccounts = async ({ token }) => {
    try {
        const api = ApiGetApi({ token })
        const { accounts } = await api.users.getAccounts({});
        return accounts
    } catch (err) {
        return null
    }
}

export const ApiGetAccount = async ({ token, accountId }) => {
    try {
        const api = ApiGetApi({ token })
        const account = new RealAccount(api, accountId)
        return account
    } catch (err) {
        return null
    }
}

export const ApiGetPortfolio = async ({ token, accountId }) => {
    try {
        const api = ApiGetApi({ token })
        const portfolio = await api.operations.getPortfolio({ accountId });
        return portfolio
    } catch (err) {
        return null
    }
}

export const ApiGetCandles = async ({ token, figi }) => {
    try {
        const api = ApiGetApi({ token })
        const { candles } = await api.marketdata.getCandles({
            figi,
            interval: CandleInterval.CANDLE_INTERVAL_1_MIN,
            ...Helpers.fromTo('-24h'),
        });
        return candles
    } catch (err) {
        return null
    }
}

export const ApiAddOrder = async ({ token, accountId, figi, quantity, price, direction }) => {
    try {
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
    } catch (err) {
        return null
    }
}

export const ApiGetOrders = async ({ token, accountId }) => {
    try {
        const account = await ApiGetAccount({ token, accountId })
        const { orders } = await account.getOrders();

        return orders
    } catch (err) {
        return null
    }
}

export const ApiCancelOrder = async ({ token, accountId, orderId }) => {
    try {
        const account = await ApiGetAccount({ token, accountId })
        account.cancelOrder(orderId)
    } catch (err) {
        return null
    }
}

export const ApiGetTradeStatus = async ({ token, figi }) => {
    try {
        const api = ApiGetApi({ token })
        const tradingStatus = await api.marketdata.getTradingStatus({ figi })
        return tradingStatus
    } catch (err) {
        return null
    }
}

export const ApiGetShareInfo = async ({ token, ticker }) => {
    try {
        const api = ApiGetApi({ token })
        // const share = await api.instruments.shareBy({ idType: InstrumentIdType.INSTRUMENT_ID_TYPE_FIGI, classCode: "TQBR" })
        let shareInfo
        const shares = await api.instruments.shares({ instrument_status: 1 })
        shares.instruments.forEach(share => { if (share.ticker === ticker) shareInfo = share })
        return shareInfo
    } catch (err) {
        return null
    }
}

export const ApiGetLastCandle = async ({ token, figi }) => {
    try {
        const api = ApiGetApi({ token })
        const { candles } = await api.marketdata.getCandles({
            figi, interval: CandleInterval.CANDLE_INTERVAL_1_MIN,
            ...Helpers.fromTo('-1m'),
        });
        return candles[0]
    } catch (err) {
        return null
    }
}

export const ApiGetOrderbook = async ({ token, figi }) => {
    try {
        const api = ApiGetApi({ token })
        const orderbook = await api.marketdata.getOrderBook({figi, depth: 10});
        return orderbook
    } catch (err) {
        return null
    }
}