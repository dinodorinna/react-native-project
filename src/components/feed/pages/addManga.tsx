import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import apiAddManga from "../api/apiAddManga";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";

const AddManga = () => {
  const [title, setTitle] = useState<string>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [loadingAddManga, setLoadingAddManga] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter your Manga title"
      />
      <TextInput
        style={styles.input}
        onChangeText={setSourceUrl}
        value={sourceUrl}
        placeholder="Enter your Manga source url"
      />
      <Button
        loading={loadingAddManga}
        disabled={!title || !sourceUrl}
        mode="contained"
        onPress={async () => {
          setLoadingAddManga(true);
          const { data, error } = await apiAddManga({
            title,
            url: sourceUrl,
            corverId: "",
          });
          if (error) {
            console.error("error", error);
          }
          if (data) {
            console.info("pass", data);
            navigation.goBack();
          }
          setLoadingAddManga(false);
        }}
      >
        Add
      </Button>
    </View>
  );
};
export default AddManga;

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    height: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
});
