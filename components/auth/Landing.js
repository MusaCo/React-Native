import React from "react";
import { Text, View, Button } from "react-native";

export default function Landing({ navigation }) {
  console.log("WE ARE IN LANDINGGGG");
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
