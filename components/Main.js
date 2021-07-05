//import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchuser } from "../redux/actions/index";
import React, { Component } from "react";

class Main extends Component {
  componentDidMount() {
    this.props.fetchuser();
    console.log("heyy");
  }
  render() {
    console.log(this.props);
    const { currentUser, fetchuser } = this.props;
    if (currentUser == undefined) {
      console.log("main nottttttt running woooooooo hoooooooooooo");
      return (
        <View>
          <Text>hghjhgjhkjhkj</Text>
        </View>
      );
    }
    console.log(currentUser);
    return (
      <View>
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          {currentUser.username}
          yooorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrsdsdfsdsdfsdddd
        </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.userState.currentUser };
}

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchuser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
