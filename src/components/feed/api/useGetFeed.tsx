import useSWR from "swr";

type FeedProps = {
  page: number;
};

const SIZE = 10;

const useGetFeed = ({ page }: FeedProps) => {
  const { data, error, isLoading } = useSWR(
    `/manga/feed?page=${page}&size=${SIZE}`
  );
  return {
    feedList: data,
    feedListLoading: isLoading,
    feedListError: !data && error,
  };
};
export default useGetFeed;
