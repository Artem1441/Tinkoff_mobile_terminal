import { useState, memo } from "react"
import { StyleSheet, Text, TouchableOpacity, View, } from "react-native"
import OrdersList from "./OrdersList"

const Orders = () => {
    const [isShow, setIsShow] = useState(false)
    return (
        <>
            <View style={styles.titleBlock}>
                <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                    <Text style={styles.title}>
                        Заявки
                    </Text>
                </TouchableOpacity>

                {(isShow) &&
                    <OrdersList isAll={true} />
                }
            </View>
        </>
    )
}

export default memo(Orders)

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