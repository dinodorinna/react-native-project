import { Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect, useMemo, useState } from "react";
import useGetFeed from "../api/useGetFeed";
import { FAB } from "react-native-paper";
import ContentCard from "./contentCard";

const Feed = () => {
  const [page, setPage] = useState<number>(1);

  const { feedList, feedListLoading, feedListError, mutateFeedList } =
    useGetFeed({ page });

  useEffect(() => {
    console.log("update");
  }, []);

  const renderFeedList = useMemo(() => {
    if (!feedList || feedList?.count === 0) {
      return <Text>Feed Empty List</Text>;
    } else if (feedListError) {
      return <Text>Feed Error</Text>;
    } else {
      return (
        <FlatList
          refreshing={feedListLoading}
          onRefresh={() => mutateFeedList()}
          contentContainerStyle={styles.flatList}
          data={feedList.items}
          renderItem={({ item }) => (
            <ContentCard
              title={item?.manga?.title || ""}
              coverId={item?.manga?.coverId}
              chapter={item?.chapters}
            />
          )}
        />
      );
    }
  }, [feedList, feedListLoading, feedListError]);

  return <View style={styles.wrapper}>{renderFeedList}</View>;
};

export default Feed;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  flatList: {
    padding: 16,
    paddingTop: 0,
    gap: 16,
  },
});
