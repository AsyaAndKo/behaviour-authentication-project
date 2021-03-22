import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [countButton, setCountButton] = useState(0);
  const [countScreen, setCountScreen] = useState(0);
  const [swipeTimer, setSwipeTimer] = useState(0);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");

  let start, end;

  const styles = StyleSheet.create({
    default: {
      padding: 30,
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      flex: 1,
      justifyContent: "center",
    },
    entrySpace: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#000",
      fontSize: 15,
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
    },
    loginForm: {
      textAlign: "center",
      fontSize: 25,
    },
  });

  let logPlusPass = [];
  const signIn = () => {
    if (login == undefined || password == undefined) {
      setText(" ");
    } else {
      logPlusPass.push(login);
      logPlusPass.push(password);
      setText(`Email: ${logPlusPass[0]} \nPassword: ${logPlusPass[1]}`);
    }
  };

  return (
    <View
      style={styles.default}
      onTouchStart={() => {
        start = new Date().getTime();
      }}
      onTouchEnd={() => {
        setCountScreen(countScreen + 1);
        end = new Date().getTime();
        setSwipeTimer(end - start);
      }}
    >
      <Text style={styles.loginForm}>Login form</Text>
      <TextInput
        style={styles.entrySpace}
        placeholder="Login"
        onChangeText={(login) => setLogin(login)}
      />
      <TextInput
        style={styles.entrySpace}
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign in" onPress={signIn} />
      <Text>{text}</Text>

      <Text>{`\nswipe time: ${swipeTimer}`}</Text>

      <Text>click on screen: {countScreen}</Text>

      <Text>click on Button: {countButton}</Text>

      {/* TODO: Change button to touchable opacity, so I'll be able to style it properly */}
      <Button
        color="#dea4eb"
        title="Change Text"
        onPress={() => setCountButton(countButton + 1)}
      />
    </View>
  );
}
