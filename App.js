import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import Register from "./components/auth/Register";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const [Loggedin, setLoggedin] = useState(false);
  const Stack = createStackNavigator();
  let l = null;
  useEffect(() => {
    const log = async () => {
      l = await SecureStore.getItemAsync("accesstoken");
      if (l) {
        alert(l);
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
    return <Text> yooo </Text>;
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
