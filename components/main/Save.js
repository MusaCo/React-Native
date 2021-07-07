import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  Button,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchuser } from "../../redux/actions/index";
import firebase from "firebase";

function Save(props) {
  const [caption, setCaption] = useState(null);
  const { currentUser } = props;

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `files/${currentUser._id + Math.random().toString(36)}`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        uploadPost(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const uploadPost = (snapshot) => {
    fetch("https://musasocialapi.herokuapp.com/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
        desc: caption ? caption : " ",
        img: snapshot,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => console.log(error));
    props.navigation.popToTop();
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: props.route.params.image }}
        style={{ flex: 1 }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 20,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Lo Awhay</Text>
        </View>
      </ImageBackground>
      <TextInput
        placeholder="Write a Caption"
        onChangeText={(cap) => setCaption(cap)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}

function mapStateToProps(state) {
  return { currentUser: state.userState.currentUser };
}
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchuser: (AT) => fetchuser(AT) }, dispatch); //datwanyn awhash bkain
export default connect(mapStateToProps, mapDispatchProps)(Save);
