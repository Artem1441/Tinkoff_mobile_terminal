import express from "express"
import cors from "cors"
import http from "http"
import ws from "ws"
import InfoRoute from "./routes/info.route.js"
import { ApiGetApi } from "./core/operations.js"
import { SubscriptionInterval } from "tinkoff-invest-api/cjs/generated/marketdata.js"
import shares from "./data/SHARES.json" assert { "type": "json" }
import { Helpers } from "tinkoff-invest-api"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", InfoRoute)

const server = http.Server(app);
const webSocketServer = new ws.Server({ server });

const defaultToken = env.TOKEN
const api = ApiGetApi({ token: defaultToken })

for (const [key] of Object.entries(shares)) {
    const figi = shares[key].figi

    api.stream.market.candles({ instruments: [{ figi, interval: SubscriptionInterval.SUBSCRIPTION_INTERVAL_ONE_MINUTE }], waitingClose: false }, (candle) => {
        candle = { open: Helpers.toNumber(candle.open), close: Helpers.toNumber(candle.close), high: Helpers.toNumber(candle.high), low: Helpers.toNumber(candle.low), timestamp: new Date(candle.time).getTime() }
        webSocketServer.clients.forEach(client => {
            if (client.ticker === key) client.send(JSON.stringify({ type: "candle", ...candle }))
        })
    });

    api.stream.market.orderBook({ instruments: [{ figi, depth: 10 }] }, (orderbook) => {
        webSocketServer.clients.forEach(client => {
            if (client.ticker === key) client.send(JSON.stringify({ type: "orderbook", ...orderbook }))
        })
    })
}

webSocketServer.on('connection', (ws, req) => {
    const arr = req.url.split('/').slice(1)
    const ticker = arr[0]
    ws.ticker = ticker

    ws.on("error", e => console.log(e));
});

server.listen(8080, () => { })