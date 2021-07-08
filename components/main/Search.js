import React, { useRef, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Search(props) {
  const ref = useRef(" ");
  const [users, setusers] = useState(null);
  const fetchUser = (search) => {
    fetch(`http://localhost:8800/users/search/${search}`)
      .then((result) => result.json())
      .then((data) => setusers(data));
  };
  //console.log(ref.current.value);
  return (
    <View>
      <TextInput
        ref={ref}
        placeholder="Type To Search"
        onChangeText={(search) => {
          search && fetchUser(search);
        }}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { username: item.username })
            }
          >
            <Text>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
