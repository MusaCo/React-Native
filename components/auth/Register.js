import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Register() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [accesstoken, setaccesstoken] = useState(null);

  const onSignUp = async () => {
    fetch("https://musasocialapi.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setaccesstoken(json.accesstoken);
      })
      .catch((error) => console.log(error));
    console.log(accesstoken ? true : false);
    if (accesstoken) {
      await SecureStore.setItemAsync("accesstoken", accesstoken);
    }
  };
  console.log(accesstoken);
  return (
    <View>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setemail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setpassword(password)}
      />
      <Button title="Submit" onPress={() => onSignUp()} />
    </View>
  );
}

// export class Register extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             email: '',
//             password: '',
//             name: ''
//         }
//         this.onSignUp = this.onSignUp.bind(this)
//     }

//     const onSignUp = async () => {
//         let accesstoken = "";
//         const{name, email, password} = this.state;

//         accesstoken = fetch('https://musasocialapi.herokuapp.com/auth/login', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: email,
//             password: password
//          })
//         }).then((response) => response.json())
//         .then((json) => {return json})
//         .catch((error) => console.log(error))
//         console.log(accesstoken.accesstoken)

//     }

//     render() {
//         return (
//             <View>
//                 <TextInput placeholder="name" onChangeText={(name) => this.setState({ name: name})}/>
//                 <TextInput placeholder="email" onChangeText={(email) => this.setState({ email: email})}/>
//                 <TextInput placeholder="password" secureTextEntry={true} onChangeText={(password) => this.setState({ password: password})}/>
//                 <Button title="Submit" onPress={() => this.onSignUp()}/>
//             </View>
//         )
//     }
// }

// export default Register
