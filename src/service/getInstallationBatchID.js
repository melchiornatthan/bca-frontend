import axios from "../axiosConfig";

export const getInstallationBatchId = async () => {
  try {
    const response = await axios.get("getInstallationBatchId");
    const currentBatchId = parseInt(response.data.batchid, 10);
    return currentBatchId + 1;
  } catch (error) {
    console.error("Error fetching batch ID:", error);
    throw error;
  }
};