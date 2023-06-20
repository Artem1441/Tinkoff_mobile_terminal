import { memo } from "react";
import { Image, StyleSheet, Text } from "react-native"
import { View } from "react-native"
import { useSelector } from "react-redux";

const StockTop = () => {
    const { stocksJSON, currentTicker } = useSelector((state: any) => state.DataReducerName);

    return (
        <>
            <View style={styles.block}>
                <View style={styles.blockLeft}>
                    {stocksJSON[currentTicker] ? <>
                        <Image source={{ uri: stocksJSON[currentTicker].img }} style={styles.image} />
                        <View style={styles.blockText}>
                            <Text style={styles.name}>{stocksJSON[currentTicker].name}</Text>
                            <Text style={{ color: "black" }}>{currentTicker}</Text>
                        </View>
                    </> : null}
                </View>
                {/* <View>
                    <Text style={styles.price}>{lastPrice ? lastPrice : "-"}</Text>
                </View> */}
            </View>
        </>
    )
}

export default memo(StockTop)

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 4
    },
    blockLeft: {
        flexDirection: "row"
    },
    blockText: {
        justifyContent: "space-around"
    },
    image: {
        width: 40, height: 40, borderRadius: 50, marginRight: 10
    },
    price: {
        fontSize: 18,
        fontWeight: "500",
        color: "black"
    },
    name: {
        fontSize: 16,
        fontWeight: "500",
        color: "black"
    }
})