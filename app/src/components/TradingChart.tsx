import { memo } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native"
import { CandlestickChart } from 'react-native-wagmi-charts';

const TradingChart = ({ values }: any) => {
    return (
        <View>
            {values.length > 1 ?
                <CandlestickChart.Provider data={values}>
                    <CandlestickChart width={Dimensions.get("screen").width - 22}>
                        <View style={styles.container}>
                            <CandlestickChart.Candles positiveColor="green" negativeColor="red" />
                        </View>
                        <CandlestickChart.Crosshair />
                        <View style={styles.textContainer}>
                            <View style={styles.textContainerInside}>
                                <Text style={{ color: "black" }}>Открытие - </Text>
                                <CandlestickChart.PriceText type="open" precision={100} />
                            </View>
                            <View style={styles.textContainerInside}>
                                <Text style={{ color: "black" }}>Закрытие - </Text>
                                <CandlestickChart.PriceText type="close" />
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.textContainerInside}>
                                <Text style={{ color: "black" }}>Минимум - </Text>
                                <CandlestickChart.PriceText type="low" />
                            </View>
                            <View style={styles.textContainerInside}>
                                <Text style={{ color: "black" }}>Максимум - </Text>
                                <CandlestickChart.PriceText type="high" />
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <View style={{ ...styles.textContainerInside, width: Dimensions.get("screen").width }}>
                                <CandlestickChart.DatetimeText />
                            </View>
                        </View>

                    </CandlestickChart>
                </CandlestickChart.Provider>
                : <Text style={{ color: "black" }}>Loading...</Text>}
        </View>
    )
}

export default memo(TradingChart)

const styles = StyleSheet.create({
    textContainer: {
        paddingVertical: 3,
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    textContainerInside: {
        width: Dimensions.get("screen").width * 0.5,
        flexDirection: "row"
    },
    container: {
        borderTopWidth: 0.5,
        borderTopColor: "rgba(0,0,0, 0.2)",
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(0,0,0, 0.2)",
    },
});

{/* purple */ }