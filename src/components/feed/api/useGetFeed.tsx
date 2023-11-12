import useSWR from "swr";

type FeedProps = {
  page: number;
};

const SIZE = 10;

const useGetFeed = ({ page }: FeedProps) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/manga/feed?page=${page}&size=${SIZE}`
  );
  return {
    feedList: data,
    feedListLoading: isLoading,
    feedListError: !data && error,
    mutateFeedList: mutate,
  };
};
export default useGetFeed;
