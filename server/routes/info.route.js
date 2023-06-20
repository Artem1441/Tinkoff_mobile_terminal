import { Router } from "express"
import InfoController from "../controllers/info.controller.js";

const router = new Router()
router.get("/get_stocks", InfoController.GetStocks);
router.get("/get_stocks_json", InfoController.GetStocksJSON);
router.post("/get_portfolio", InfoController.GetPortfolio);
router.post("/get_candles", InfoController.GetCandles);
router.post("/get_orders", InfoController.GetOrders);
router.post("/cancel_order", InfoController.CancelOrder);
router.post("/add_order", InfoController.AddOrder);
router.post("/test_token", InfoController.TestToken);
router.post("/is_open_market_for_stock", InfoController.IsOpenMarketForStock)
router.post("/get_share_info", InfoController.GetShareInfo)
router.post("/get_last_candle", InfoController.GetLastCandle)
router.post("/get_orderbook", InfoController.GetOrderbook)

export default router