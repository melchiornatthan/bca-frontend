import axios from "../axiosConfig";

export const getBatchInstallations = async (batchid, setInstallationData) => {
  try {
    const response = await axios.get(`getBatchInstallations/${batchid}`);
    setInstallationData(response.data);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};
