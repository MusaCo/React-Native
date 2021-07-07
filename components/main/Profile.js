import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";

function Profile(props) {
  const [posts, setposts] = useState(null);
  useEffect(() => {
    fetch(
      `https://musasocialapi.herokuapp.com/post/profile/${props.currentUser.username}`
    )
      .then((posts) => posts.json())
      .then((data) => setposts(data));
  }, []);

  console.log(posts);
  return (
    <View style={style.container}>
      <View style={style.containerInfo}>
        <Text>{props.currentUser.username}</Text>
        <Text>{props.currentUser.email}</Text>
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

export default connect(mapStateToProps, null)(Profile);
