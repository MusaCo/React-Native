import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import Register from "./components/auth/Register";
import * as SecureStore from "expo-secure-store";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import MainScreen from "./components/Main";

export default function App() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const [Loggedin, setLoggedin] = useState(false);
  const Stack = createStackNavigator();
  let l = null;
  useEffect(() => {
    const log = async () => {
      l = localStorage.getItem("accesstoken"); //await SecureStore.getItemAsync("accesstoken");
      if (l) {
        //alert(l);
        setLoggedin(true);
      }
    };
    log();
  }, []);

  if (!Loggedin) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  if (Loggedin) {
    console.log(store.getState());
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
