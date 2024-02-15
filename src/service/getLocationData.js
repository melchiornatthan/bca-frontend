import axios from "../axiosConfig";

export const getLocationData = async () => {
    try {
      const response = await axios.get("locations");
      return response.data.list;
    } catch (error) {
      console.error("Error fetching location data:", error);
      throw error;
    }
  };