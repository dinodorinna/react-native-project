import axios, { AxiosError } from "axios";
type PayloadProps = {
  username: string;
  password: string;
};

const apiLogin = async (payload: PayloadProps) => {
  try {
    const { data } = await axios.post("/login", payload);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError<{ code: number; message: string }, any>,
    };
  }
};
export default apiLogin;
