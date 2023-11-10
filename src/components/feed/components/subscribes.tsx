import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { Text } from "react-native";
import { useMemo, useState } from "react";
import useGetSubscribe from "../api/useGetSubscribe";

const Subscribes = () => {
  const [page, setPage] = useState<number>(1);

  const { subscribeList, subscribeListLoading, subscribeListError } =
    useGetSubscribe({ page });

  // console.log({ subscribeList });

  const renderFeedList = useMemo(() => {
    if (subscribeList?.count === 0) {
      return <Text>Subscribes Empty List</Text>;
    } else if (subscribeListLoading) {
      return <Text>Subscribes Loading</Text>;
    } else if (subscribeListError) {
      return <Text>Subscribes Error</Text>;
    } else {
      return <Text>Subscribes List</Text>;
    }
  }, []);

  return <>{renderFeedList}</>;
};
export default Subscribes;
