import axios, { AxiosError } from "axios";
type PayloadProps = {
  title: string;
  url: string;
  corverId: string;
};

const apiAddManga = async (payload: PayloadProps) => {
  try {
    const { data } = await axios.post("/manga", payload);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError<{ code: number; message: string }, any>,
    };
  }
};
export default apiAddManga;
