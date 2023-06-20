import { useState, memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux";
import sortStocksByPercent from "../helpers/sortStocksByPercent";
import StockItem from "./StockItem";

const StocksList = ({ navigation }: any) => {
    const stocks = useSelector((state: any) => state.DataReducerName.stocks);
    const [isShow, setIsShow] = useState(true)
    const [sortMethod, setSortMethod] = useState("DEFAULT")

    return (
        <View>
            <View style={styles.titleBlock}>
                <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                    <Text style={styles.title}>
                        Акции
                    </Text>
                </TouchableOpacity>
            </View>


            {isShow && <>
                <View style={styles.leftRight}>
                    <Text style={styles.text}>Сортировать по</Text>
                    {sortMethod === "DEFAULT"
                        ?
                        <TouchableOpacity onPress={() => setSortMethod("PERCENT")}><Text style={styles.text}>Размерам компании</Text></TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => setSortMethod("DEFAULT")}><Text style={styles.text}>Изменению за день</Text></TouchableOpacity>
                    }
                </View>

                {stocks &&
                    sortStocksByPercent(stocks, sortMethod).map((item: any) =>
                        <StockItem key={item.ticker} data={item} navigation={navigation} />
                    )
                }
            </>}
        </View>
    )
}

export default memo(StocksList)

const styles = StyleSheet.create({
    leftRight: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleBlock: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: "black"
    },
    text: {
        color: "black"
    }
})