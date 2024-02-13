import axios from "../axiosConfig";

export const getProviderCount = async (setProviderCount, setDate) => {
  try {
    const response = await axios.get("providerCount");
    setProviderCount(response.data);
    setDate(new Date());
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};
