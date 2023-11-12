import { RootStackParamList } from "../../../../App";
import { Text, View, StyleSheet } from "react-native";
import { useMemo, useState } from "react";
import useGetSubscribe from "../api/useGetSubscribe";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import type { StackNavigationProp } from "@react-navigation/stack";

const Subscribes = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [page, setPage] = useState<number>(1);

  const { subscribeList, subscribeListLoading, subscribeListError } =
    useGetSubscribe({ page });

  console.log(JSON.stringify(subscribeList));

  const renderFeedList = useMemo(() => {
    if (subscribeList?.count === 0) {
      return <Text>Subscribes Empty List</Text>;
    } else if (subscribeListLoading) {
      return <Text>Subscribes Loading</Text>;
    } else if (subscribeListError) {
      return <Text>Subscribes Error</Text>;
    } else {
      return (
        <View style={styles.wrapper}>
          <Text>Subscribes List</Text>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate("AddNewManga")}
          />
        </View>
      );
    }
  }, [navigation, subscribeList, subscribeListLoading, subscribeListError]);

  return <>{renderFeedList}</>;
};
export default Subscribes;

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    height: "100%",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
  },
});
