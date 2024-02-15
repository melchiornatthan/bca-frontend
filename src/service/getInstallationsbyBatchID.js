
import axios from "../axiosConfig";

export const getInstallationsbyBatchID = async (batchid, setData) => {
  try {
    const response = await axios.get(`getInstallationsbyBatchID/${batchid}`);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching installation data:", error);
  }
};
