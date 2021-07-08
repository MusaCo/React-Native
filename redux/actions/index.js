import { FOLLOW, UNFOLLOW, USER_STATE_CHANGE } from "../constants/index";
import { Platform } from "react-native";

let accessToken = null;

export const fetchuser = (AT = "") => {
  if (AT !== "") {
    return (dispatch) => {
      fetch("https://musasocialapi.herokuapp.com/auth/login", {
        method: "GET",
        headers: {
          authorization: "Bearer " + AT,
        },
      })
        .then((result) => result.json())
        .then((data) => {
          if (data) {
            dispatch({
              type: USER_STATE_CHANGE,
              currentUser: data.message.user,
            });
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          alert(error);
        });
    };
  } else {
    // if (Platform.OS === "web") {
    //   accessToken = localStorage.getItem("accesstoken");
    // }
    accessToken = localStorage.getItem("accesstoken");
    return (dispatch) => {
      fetch("https://musasocialapi.herokuapp.com/auth/login", {
        method: "GET",
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
        .then((result) => result.json())
        .then((data) => {
          if (data) {
            dispatch({
              type: USER_STATE_CHANGE,
              currentUser: data.message.user,
            });
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          alert(error);
        });
    };
  }
};
export const follow = (id) => {
  return (dispatch) => {
    dispatch({
      type: FOLLOW,
      id: id,
    });
  };
};

export const unfollow = (id) => {
  return (dispatch) => {
    dispatch({
      type: UNFOLLOW,
      id: id,
    });
  };
};

// export function fetchUser() {
//   // const accessToken = await SecureStore.getItemAsync("accesstoken");

//   (dispatch) => {
//     if (accessToken) {
//       fetch("https://musasocialapi.herokuapp.com/auth/login", {
//         method: "GET",
//         headers: {
//           authorization: "Bearer " + accessToken,
//         },
//       })
//         .then((result) => result.json())
//         .then((data) => {
//           if (data) {
//             localStorage.setItem("user", JSON.stringify(data.message.user));
//             console.log(data.message.user);
//             dispatch({
//               type: USER_STATE_CHANGE,
//               currentUser: { currentUser: data.message.user },
//             });
//           } else {
//             console.log("user does not exist");
//           }
//         });
//     }
//   };
// }

// .then((result) => {
//   result.json();
// })
// .then((res) => {
//   console.log(res);
// })
// .then((result) => {
//   console.log(result);
//   // return (dispatch) => {
//   //   dispatch({
//   //     type: USER_STATE_CHANGE,
//   //     currentUser: { hey: result.message.user },
//   //   });
//   // };
// });
