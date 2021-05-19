import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import KeyInputActivity from "./Key_activity";
import TimeCounter from "./TimeCounter";
import Gyroscope from "./Gyroscope";

let timeCounter = new TimeCounter();

let auth_answer = "";

let loginActivity = new KeyInputActivity();
let passwordActivity = new KeyInputActivity();
let gyroscope = new Gyroscope();

export default function App() {
  const [countButton, setCountButton] = useState(0);
  const [countScreen, setCountScreen] = useState(0);
  const [swipeTimer, setSwipeTimer] = useState(0);
  const [log_pass, setLog_Pass] = useState("");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [gyroscopeData, setGyroscopeData] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  let start,
    end,
    endAll = 0;

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

  const signIn = async () => {
    endAll = new Date().getTime();

    login_password_check = {
      TypeJson: "Authentication",
      login: login,
      password: password,
    };
    try {
      fetch("http://172.16.34.61:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login_password_check),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("getJson");
          auth_answer = json;

          if (auth_answer.check === "Success") {
            gyroscope.flag = false;
            timeCounter.data_pack["AlphaMax"] = gyroscope.getMaximumAngle(
              gyroscope.alpha_stack
            );
            timeCounter.data_pack["AlphaMin"] = gyroscope.getMinimumAngle(
              gyroscope.alpha_stack
            );
            timeCounter.data_pack["BettaMax"] = gyroscope.getMaximumAngle(
              gyroscope.betta_stack
            );
            timeCounter.data_pack["BettaMin"] = gyroscope.getMinimumAngle(
              gyroscope.betta_stack
            );
            timeCounter.data_pack["GammaMax"] = gyroscope.getMaximumAngle(
              gyroscope.gamma_stack
            );
            timeCounter.data_pack["GammaMin"] = gyroscope.getMinimumAngle(
              gyroscope.gamma_stack
            );

            gyroscope.alpha_stack = [];
            gyroscope.betta_stack = [];
            gyroscope.gamma_stack = [];

            let loginAndPasswordTime =
              (endAll - timeCounter.timerValues["LoginFocus"]) / 1000;
            timeCounter.timerValues["LoginPasswordEnter"] =
              loginAndPasswordTime;
            timeCounter.data_pack["LoginPasswordEnter"] = loginAndPasswordTime;

            if (login == undefined || password == undefined) {
              setLog_Pass(" ");
            } else {
              logPlusPass.push(login);
              logPlusPass.push(password);
            }
            fetch("http://172.16.34.61:3000/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(timeCounter.data_pack),
            });
          } else if (auth_answer.check === "Error") {
            console.log(auth_answer.value);
            console.log("Error login!");
          } else {
            console.log("Errorrrr");
          }
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    } catch (error) {
      console.log(error);
    }

    setLogin("");
    setPassword("");
  };

  gyroscope._subscribe((gyroscopeNewData) => {
    setGyroscopeData(gyroscopeNewData.rotation);
    if (gyroscope.flag) {
      gyroscope.alpha_stack.push(gyroscope.state.data.alpha);
      gyroscope.betta_stack.push(gyroscope.state.data.beta);
      gyroscope.gamma_stack.push(gyroscope.state.data.gamma);
    }
  }, 1500);

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
        value={login}
        onChangeText={(text) => {
          loginActivity.onTextChange(text, login, "Login");
          setLogin(text);
          timeCounter.data_pack["LoginSymbPerSec"] =
            loginActivity.printSymbolsPerSecond();
          timeCounter.data_pack["LoginBackSpace"] = loginActivity.saveBackSpace;
        }}
        onFocus={(smth) => {
          timeCounter.onTextFocus("Login");
          gyroscope.flag = true;
        }}
        onBlur={() => {
          timeCounter.onTextBlur("Login");
        }}
      />
      <TextInput
        style={styles.entrySpace}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          passwordActivity.onTextChange(text, password, "Password");
          setPassword(text);
          timeCounter.data_pack["PasswordSymbPerSec"] =
            passwordActivity.printSymbolsPerSecond();
          timeCounter.data_pack["PasswordBackSpace"] =
            passwordActivity.saveBackSpace;
        }}
        onFocus={(smth) => {
          timeCounter.onTextFocus("Password");
          gyroscope.flag = true;
        }}
        onBlur={() => {
          timeCounter.onTextBlur("Password");
        }}
      />
      <Button title="Sign in" onPress={signIn} />

      <Text>SymbPerSec in login {loginActivity.printSymbolsPerSecond()}</Text>
      <Text>
        SymbPerSec in password {passwordActivity.printSymbolsPerSecond()}
      </Text>

      <Text>{`\nswipe time: ${swipeTimer}`}</Text>

      <Text>click on screen: {countScreen}</Text>

      <Text>click on Button: {countButton}</Text>

      <Text>
        x: {gyroscopeData.alpha.toFixed(5)}
        y: {gyroscopeData.beta.toFixed(5)}
        z: {gyroscopeData.gamma.toFixed(5)}
      </Text>

      {/* TODO: Change button to touchable opacity, so I'll be able to style it properly */}
      <Button
        color="#dea4eb"
        title="Change Text"
        onPress={() => setCountButton(countButton + 1)}
      />
    </View>
  );
}
