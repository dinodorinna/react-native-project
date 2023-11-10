import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { useEffect, useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feed from "../components/feed";
import Subscribes from "../components/subscribes";

const Food = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Food">) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "feed",
      title: "Feed",
      focusedIcon: "bookmark-box-multiple",
      unfocusedIcon: "bookmark-box-multiple-outline",
    },
    {
      key: "subscribed",
      title: "Subscribed",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: Feed,
    subscribed: Subscribes,
  });

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (!token) {
        navigation.replace("Login");
      }
    });
  }, []);

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
export default Food;
