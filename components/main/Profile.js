import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Image, Button } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { follow, unfollow, fetchuser } from "../../redux/actions/index";
import { bindActionCreators } from "redux";

function Profile(props) {
  const [posts, setposts] = useState(null);
  const [user, setuser] = useState(null);
  const [currentuser, setcurrentuser] = useState(null);

  useEffect(() => {
    fetchCurrentUserData();
    if (props.route.params?.username) {
      if (props.route.params?.username !== props.currentUser.username) {
        fetchUserData();
        fetchUserPosts(props.route.params.username);
      } else if (props.route.params?.username === props.currentUser.username) {
        setuser(currentuser);
      }
    } else if (props.route.params?.username === undefined) {
      fetchCurrentUserPosts();
      setuser(props.currentUser);
    }
  }, [props.route.params?.username]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("tabPress", (e) => {
      fetchCurrentUserPosts();
      setuser(props.currentUser);
    });
    return unsubscribe;
  }, [props.navigation]);

  const fetchUserData = async () => {
    try {
      const d = await axios.get(
        `https://musasocialapi.herokuapp.com/users?username=${props.route.params?.username}`
      );
      setuser(d.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCurrentUserData = async () => {
    try {
      const d = await axios.get(
        `https://musasocialapi.herokuapp.com/users?username=${props.currentUser.username}`
      );
      setcurrentuser(d.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCurrentUserPosts = () => {
    fetch(
      `https://musasocialapi.herokuapp.com/post/profile/${props.currentUser.username}`
    )
      .then((posts) => posts.json())
      .then((data) => setposts(data));
  };

  const fetchUserPosts = (username) => {
    fetch(`https://musasocialapi.herokuapp.com/post/profile/${username}`)
      .then((posts) => posts.json())
      .then((data) => setposts(data));
  };

  const follow = () => {
    console.log(user._id);
    console.log(props.currentUser._id);
    fetch("https://musasocialapi.herokuapp.com/users/" + user._id + "/follow", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: props.currentUser._id,
      }),
    })
      .then((data) => fetchCurrentUserData())
      .catch((error) => console.log(error));
  };

  const unfollow = () => {
    console.log(user._id);
    console.log(props.currentUser._id);
    fetch(
      "https://musasocialapi.herokuapp.com/users/" + user._id + "/unfollow",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: props.currentUser._id,
        }),
      }
    )
      .then((data) => fetchCurrentUserData())
      .catch((error) => console.log(error));
  };

  console.log(currentuser);
  console.log(currentuser?._id);
  console.log(user?._id);
  console.log(currentuser?.followings.includes(user?._id));
  return (
    <View style={style.container}>
      <View style={style.containerInfo}>
        <Text>{user ? user.username : props.currentUser.username}</Text>
        <Text>{user ? user.email : props.currentUser.email}</Text>
        {user?._id !== currentuser?._id ? (
          <View>
            {currentuser?.followings.includes(user?._id) === true ? (
              <Button title="UNFOLLOW" onPress={() => unfollow()} />
            ) : (
              <Button title="FOLLOW" onPress={() => follow()} />
            )}
          </View>
        ) : null}
      </View>

      {posts && (
        <View style={style.containerGallery}>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={posts}
            renderItem={({ item }) =>
              item.img && (
                <View style={style.containerImage}>
                  <Image source={{ uri: item.img }} style={style.image} />
                </View>
              )
            }
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, marginTop: 10 },
  containerImage: {
    flex: 1 / 3,
  },
  containerInfo: {
    marginTop: 10,
  },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    height: 100,
    width: 100,
  },
});

function mapStateToProps(state) {
  return { currentUser: state.userState.currentUser };
}

// const mapDispatchProps = (dispatch) =>
//   bindActionCreators({ fetchuser }, dispatch);

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { follow: (id) => follow(id), fetchuser: (AT) => fetchuser(AT) },
    dispatch
  ); //datwanyn awhash bkain

export default connect(mapStateToProps, mapDispatchProps)(Profile);
