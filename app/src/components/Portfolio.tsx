import { useState, memo, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import { useSelector } from 'react-redux';
import getStockInfoByTicker from "../helpers/getStockInfoByTicker";
import StockItemPortfolio from "./StockItemPortfolio";

const Portfolio = ({ navigation }: any) => {
    const { stocks, portfolio } = useSelector((state: any) => state.DataReducerName);
    const [isShow, setIsShow] = useState(false)

    // useEffect(() => {
    //     console.log("portfolio")
    // }, [portfolio])

    // useEffect(() => {
    //     console.log(stocks[0])
    // }, [stocks])

    return (
        <View>
            <View style={styles.titleBlock}>
                <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                    <Text style={styles.title}>
                        Портфель
                    </Text>
                </TouchableOpacity>
            </View>

            {(isShow && portfolio) &&
                <>
                    {portfolio.totalAmountCurrencies && <>
                        {portfolio.positions.map((item: any, i: number) => <StockItemPortfolio key={i} data={getStockInfoByTicker(stocks, item)} navigation={navigation} />)}

                        <View style={styles.container}>
                            <Image source={{ uri: "https://invest-brands.cdn-tinkoff.ru/rublex160.png" }} style={styles.image} />
                            <Text style={{ color: "black" }}>Рубль {portfolio.totalAmountCurrencies}&#8381;</Text>
                        </View>
                    </>}
                </>}
            <View>

            </View>
        </View>
    )
}

export default memo(Portfolio)


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 3,
        borderTopColor: "#808e9b",
        borderTopWidth: 0.5,
    },
    image: {
        width: 44, height: 44, borderRadius: 50, marginRight: 10
    },
    titleBlock: {
        marginTop: 30,
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        color: "black"
    }
})