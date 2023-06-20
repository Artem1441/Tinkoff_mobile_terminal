import { memo } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native"
import { useSelector } from "react-redux";

const IsClosedMarket = () => {
    const { tradingStatus } = useSelector((state: any) => state.DataReducerName);

    return (
        <>
            {tradingStatus !== 5 ?
                <View style={styles.container}>
                    {/* <Text style={styles.text}>Биржа закрыта до лучших времён</Text> */}
                    <Text style={styles.text}>Биржа закрыта</Text>
                </View>
                :
                null
            }
        </>
    )
}

export default memo(IsClosedMarket)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 20
    },
    text: {
        fontSize: 16,
        color: "#808e9b",
        fontWeight: "500"
    }
})