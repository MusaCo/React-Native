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
import AddScreen from "./components/main/Add";
import { Platform } from "react-native";
import SaveScreen from "./components/main/Save";
import SearchScreen from "./components/main/Search";
import apiKey from "./apiKey";
import firebase from "firebase";

export default function App({ navigation }) {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const [Loggedin, setLoggedin] = useState(false);
  const AppStack = createStackNavigator();
  let l = null;

  useEffect(() => {
    firebase.initializeApp(apiKey.firebaseConfig);
    console.log("firebase connected");
    // if (!firebase.app.length) {

    // }
  }, []);
  useEffect(() => {
    const log = async () => {
      if (Platform.OS === "web") {
        l = localStorage.getItem("accesstoken"); //
      } else if (Platform.OS === "android") {
        l = await SecureStore.getItemAsync("accesstoken");
      }
      if (l) {
        //alert(l);
        setLoggedin(true);
      }
    };
    log();
  }, []);

  if (!Loggedin) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppStack.Navigator initialRouteName="Landing">
            <AppStack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <AppStack.Screen
              name="Register"
              component={Register}
              navigation={navigation}
            />
            <AppStack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
              navigation={navigation}
            />
            <AppStack.Screen
              name="Add"
              component={AddScreen}
              navigation={navigation}
            />
            <AppStack.Screen
              name="Save"
              component={SaveScreen}
              navigation={navigation}
            />
            <AppStack.Screen
              name="Search"
              component={SearchScreen}
              navigation={navigation}
            />
          </AppStack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
  if (Loggedin) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppStack.Navigator initialRouteName="Main">
            <AppStack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
              navigation={navigation}
            />
            <AppStack.Screen
              name="Add"
              component={AddScreen}
              navigation={navigation}
            />
            <AppStack.Screen
              name="Save"
              component={SaveScreen}
              navigation={navigation}
            />
            <AppStack.Screen
              name="Search"
              component={SearchScreen}
              navigation={navigation}
            />
          </AppStack.Navigator>
        </NavigationContainer>
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
