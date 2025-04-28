import { axiosInstance } from "./axiosInstance";
const fetchData = async () => {
  try {
    const res = await axiosInstance.get(
      `/transaction?userId=${localStorage.getItem("userId")}`
    );
    return res.data.data;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};
export default fetchData;
