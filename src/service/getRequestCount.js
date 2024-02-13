import axios from "../axiosConfig";

export const getRequestCount = async (setReqCount) => {
  try {
    const response = await axios.get("requestsCount");
    setReqCount(response.data);
  } catch (error) {
    console.error("Error fetching request counts:", error.message);
  }
};
