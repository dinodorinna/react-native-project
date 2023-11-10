import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { RootStackParamList } from "../../../../App";
import { useEffect, useState } from "react";
import { Button, Dialog, Divider, Portal } from "react-native-paper";
import apiRegister from "../api/apiRegister";
import apiLogin from "../api/apiLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visibleAlert, setVisibleAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        navigation.replace("Food");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={(styles.container, { display: "flex", alignItems: "center" })}
      >
        <Text style={styles.titleText}>Welcome To Manga Notify</Text>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Enter your username."
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password."
      />
      <Button
        loading={loadingLogin}
        disabled={!username || !password}
        mode="contained"
        onPress={async () => {
          setLoadingLogin(true);
          const { data, error } = await apiLogin({ username, password });
          if (error) {
            if (error.response?.data.code === 1002) {
              setErrorMessage(error.response?.data?.message);
              setVisibleAlert(true);
            } else {
              setErrorMessage(error?.response?.data?.message || "");
              setVisibleAlert(true);
            }
          }

          if (data) {
            setErrorMessage("Login Success");
            setVisibleAlert(true);
            navigation.replace("Food");
            storeData(data?.token);
            axios.defaults.headers["Authorization"] = "Bearer " + data?.token;
          }
          setLoadingLogin(false);
        }}
      >
        Login
      </Button>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <Divider style={{ width: "100%" }} />
        <Text style={{ marginRight: 8, marginLeft: 8 }}>Or</Text>
        <Divider style={{ width: "100%" }} />
      </View>

      <Button
        mode="elevated"
        onPress={async () => {
          navigation.navigate("Register");
        }}
      >
        Register
      </Button>

      <Portal>
        <Dialog visible={visibleAlert} onDismiss={() => setVisibleAlert(false)}>
          <Dialog.Title>{errorMessage}</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setVisibleAlert(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
});
