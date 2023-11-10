import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.baseURL = "https://manga-api.manneaber.xyz/_api";

AsyncStorage.getItem("token").then(
  (token) => (axios.defaults.headers["Authorization"] = "Bearer " + token)
);

export const fetcher = (url: string) =>
  axios.get(url).then((data) => data.data);
