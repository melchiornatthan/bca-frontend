import axios from "../axiosConfig";

export const getRelocationsbyBatchID = async (batchid, setData) => {
  try {
    const response = await axios.get(`getBatchRelocation/${batchid}`);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching relocation data:", error);
  }
};
