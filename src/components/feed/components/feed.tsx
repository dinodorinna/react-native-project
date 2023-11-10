import { Text, View } from "react-native";
import { useMemo, useState } from "react";
import useGetFeed from "../api/useGetFeed";

const Feed = () => {
  const [page, setPage] = useState<number>(1);

  const { feedList, feedListLoading, feedListError } = useGetFeed({ page });

  console.log({ feedList, feedListLoading });
  console.log(JSON.stringify(feedList));

  const renderFeedList = useMemo(() => {
    if (!feedList || feedList?.count === 0) {
      return <Text>Feed Empty List</Text>;
    } else if (feedListLoading) {
      return <Text>Feed Loading</Text>;
    } else if (feedListError) {
      return <Text>Feed Error</Text>;
    } else {
      return feedList?.items?.map((item: any) => (
        <View key={item?.manga.id}>
          <Text>{item?.manga.title || ""}</Text>
        </View>
      ));
    }
  }, [feedList, feedListLoading, feedListError]);

  return <>{renderFeedList}</>;
};

export default Feed;
