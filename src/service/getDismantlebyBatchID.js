import axios from "../axiosConfig";

export const getDismantleDataByBatchID = async (batchid, setData) => {
  try {
    const response = await axios.get(`getDismantlebyBatchID/${batchid}`);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};
