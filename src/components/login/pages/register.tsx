import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { RootStackParamList } from "../../../../App";
import { useState } from "react";
import { Button, Dialog, Divider, Portal, Snackbar } from "react-native-paper";
import apiRegister from "../api/apiRegister";
import apiLogin from "../api/apiLogin";

const Register = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Register">) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState({
    errorModal: false,
    successNoti: false,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View
        style={(styles.container, { display: "flex", alignItems: "center" })}
      >
        <Text style={styles.titleText}>Register</Text>
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
        loading={loadingRegister}
        disabled={!username || !password}
        mode="contained"
        onPress={async () => {
          setLoadingRegister(true);
          const { data, error } = await apiRegister({ username, password });
          if (error) {
            if (error.response?.data.code === 1001) {
              setErrorMessage(error.response?.data?.message);
              setVisible((prev) => ({ ...prev, errorModal: true }));
            }
          }
          if (data) {
            setVisible((prev) => ({ ...prev, successNoti: true }));
          }

          setLoadingRegister(false);
        }}
      >
        Register
      </Button>

      <Portal>
        <Dialog
          visible={visible.errorModal}
          onDismiss={() =>
            setVisible((prev) => ({ ...prev, errorModal: false }))
          }
        >
          <Dialog.Title>{errorMessage}</Dialog.Title>
          <Dialog.Actions>
            <Button
              onPress={() =>
                setVisible((prev) => ({ ...prev, errorModal: false }))
              }
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={visible.successNoti}
        onDismiss={() =>
          setVisible((prev) => ({ ...prev, successNoti: false }))
        }
        action={{
          label: "Go to Login",
          onPress: () => {
            navigation.navigate("Login");
          },
        }}
      >
        Registered.
      </Snackbar>
    </View>
  );
};
export default Register;

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
