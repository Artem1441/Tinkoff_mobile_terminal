import { Dimensions, Image, StyleSheet } from "react-native"
import { Text, View, Linking, TouchableOpacity, ScrollView } from "react-native"

const HelpScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Всю документацию вы можете скачать:</Text>
                </View>

                <TouchableOpacity onPress={() => Linking.openURL('https://drive.google.com/drive/folders/1-6MuWQtTyDrS7qtlQG3vdWKSwYZ9of6b')}>
                    <Text style={styles.link}>
                        Ссылка на документацию
                    </Text>
                </TouchableOpacity>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        1. Для начала перейдите на сайт Тинькофф:
                    </Text>
                </View>

                <TouchableOpacity onPress={() => Linking.openURL('https://www.tinkoff.ru/invest/settings/api/')}>
                    <Text style={styles.link}>
                        Ссылка на сайт Тинькофф
                    </Text>
                </TouchableOpacity>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        2. Получите токен согласно картинке:
                    </Text>
                </View>

                <View style={styles.imgContainer}>
                    <Image source={require("../assets/images/img1.jpg")} style={styles.image} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        3. Укажите "Полный доступ" и выберите портфель:
                    </Text>
                </View>

                <View style={styles.imgContainer}>
                    <Image source={require("../assets/images/img2.jpg")} style={styles.image} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        4. Скопируйте токен и вставьте его
                    </Text>
                </View>

                <View style={styles.textContainer} />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Также вы можете обратиться к разработчикам:
                    </Text>
                </View>

                <TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.link}>
                            askozlov_14@edu.hse.ru
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default HelpScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    link: {
        marginVertical: 8,
        fontSize: 16,
        color: "blue"
    },
    imgContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        margin: 10
    },
    image: {
        width: Dimensions.get("screen").width * 0.8, height: Dimensions.get("screen").width * 1.5,
    },
    textContainer: {
        marginTop: 12,
        marginBottom: 4,
    },
    text: {
        color: "black"
    }
})