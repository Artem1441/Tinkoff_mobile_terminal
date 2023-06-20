const getStockInfoByTicker = (stocks: any, stock: any) => {
    let res = {...stocks.filter((item: any) => item.figi === stock.figi)[0], ...stock}
    // it'll be a mistake untill you add all tickers
    return res
}

export default getStockInfoByTicker