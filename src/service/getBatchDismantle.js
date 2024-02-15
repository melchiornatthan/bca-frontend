import axios from "../axiosConfig";

export const getBatchDismantle = async (batchid, setData) => {
  try {
    const response = await axios.get(`getBatchDismantle/${batchid}`);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};
