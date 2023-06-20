const showPercent = (open: number, close: number) => {
    if (open < close) {
        return Math.round(((close / open) - 1) * 10000) / 100
    } else {
        return -1 * Math.round(((open / close) - 1) * 10000) / 100

    }
}

export default showPercent