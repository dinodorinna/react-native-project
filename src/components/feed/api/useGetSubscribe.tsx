import useSWR from "swr";

type SubscribeProps = {
  page: number;
};

const SIZE = 10;

const useGetSubscribe = ({ page }: SubscribeProps) => {
  const { data, error, isLoading } = useSWR(`/manga?page=${page}&size=${SIZE}`);
  return {
    subscribeList: data,
    subscribeListLoading: isLoading,
    subscribeListError: !data && error,
  };
};
export default useGetSubscribe;
