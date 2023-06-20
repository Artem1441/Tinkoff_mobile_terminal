const sortByPercent = (stock1: any, stock2: any) => {
    return (stock2.close / stock2.open) - (stock1.close / stock1.open);
}

const sortStocksByPercent = (stocks: any, method: any) => {
    if (method === "DEFAULT") {
        return stocks
    }
    if (method === "PERCENT") {
        const copy = JSON.parse(JSON.stringify(stocks))
        return copy.sort(sortByPercent)
    }
}

export default sortStocksByPercent