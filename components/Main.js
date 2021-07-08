//import React, { useEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchuser } from "../redux/actions/index";
import React, { Component } from "react";
import FeedScreen from "./main/Feed";
import AddScreen from "./main/Add";
import ProfileScreen from "./main/Profile";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import SearchScreen from "./main/Search";

class Main extends Component {
  componentDidMount() {
    let at = null;
    const h = async () => {
      at = await SecureStore.getItemAsync("accesstoken");
      this.props.fetchuser(at);
    };
    if (Platform.OS === "android") {
      h();
    } else {
      this.props.fetchuser();
    }
  }
  render() {
    const emptyComponent = () => {
      return null;
    };
    // const delat = async () => {
    //   await SecureStore.deleteItemAsync("accesstoken");
    //   console.log("deleted");
    // };
    // if (Platform.OS === "android") {
    //   delat();
    // }

    const Tab = createMaterialBottomTabNavigator();
    const { currentUser } = this.props;
    if (currentUser === undefined || currentUser === null) {
      return (
        <SafeAreaView>
          <Text>hghjhgjhkjhkj</Text>
        </SafeAreaView>
      );
    }

    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="AddPage"
          component={emptyComponent}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.userState.currentUser };
}

// const mapDispatchProps = (dispatch) =>
//   bindActionCreators({ fetchuser }, dispatch);

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchuser: (AT) => fetchuser(AT) }, dispatch); //datwanyn awhash bkain

export default connect(mapStateToProps, mapDispatchProps)(Main);
