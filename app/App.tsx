import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { Provider } from "react-redux";
import store from './src/store/index';
import { useEffect, useState } from "react";
import getLocalStorage from "./src/helpers/getLocalStorage";
import SCREENS from "./src/constants/SCREENS";
import MainScreen from "./src/screens/MainScreen";
import StockScreen from "./src/screens/StockScreen";
// import removeLocalStorage from "./src/helpers/removeLocalStorage";
import HelpScreen from "./src/screens/HelpScreen";
import 'react-native-gesture-handler'
import SettingsScreen from "./src/screens/SettingsScreen";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// removeLocalStorage({ key: "token" });

const Stack = createStackNavigator();


const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isToken, setIsToken] = useState(false);


  useEffect(() => {
    const load = async () => {
      const token = await getLocalStorage({ key: "token" });
      setIsToken(token ? true : false)
    }

    load().then(() => {
      setIsReady(true)
    })

  }, [])


  if (!isReady) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ color: "black" }}>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>

        <NavigationContainer>
          <Stack.Navigator initialRouteName={isToken ? SCREENS.MainScreen : SCREENS.WelcomeScreen}>
            <Stack.Screen name={SCREENS.WelcomeScreen} component={WelcomeScreen} options={{ title: "Токен" }} />
            <Stack.Screen name={SCREENS.MainScreen} component={MainScreen} options={({ navigation, route }) => ({ title: "Главная", headerLeft: () => null, headerRight: () => <TouchableOpacity onPress={() => navigation.navigate(SCREENS.SettingsScreen)}><MaterialIcons name="settings" size={28} color="black" /></TouchableOpacity> })} />
            <Stack.Screen name={SCREENS.StockScreen} component={StockScreen} options={{ title: "Акция" }} />
            <Stack.Screen name={SCREENS.HelpScreen} component={HelpScreen} options={{ title: "Помощь" }} />
            <Stack.Screen name={SCREENS.SettingsScreen} component={SettingsScreen} options={{ title: "Настройки" }} />
          </Stack.Navigator>
        </NavigationContainer>

      </Provider>
    </SafeAreaView>
  )
}

export default App

// options = {({ navigation }) => ({
//   title: "Токен",
//   headerRight: () =>
//     <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate(SCREENS.HelpScreen)}>
//       <Text style={{ color: "black" }}>Помощь</Text>
//     </TouchableOpacity>
// })}

{/* <Stack.Navigator initialRouteName={isToken ? SCREENS.MainScreen : SCREENS.WelcomeScreen} screenOptions={{ headerShown: false }}> */ }