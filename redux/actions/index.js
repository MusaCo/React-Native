import * as SecureStore from "expo-secure-store";
import { USER_STATE_CHANGE } from "../constants/index";

export const fetchuser = () => {
  const accessToken = localStorage.getItem("accesstoken");
  return (dispatch) => {
    fetch("https://musasocialapi.herokuapp.com/auth/login", {
      method: "GET",
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (accessToken) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: data.message.user });
        }
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
