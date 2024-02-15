import axios from "../axiosConfig";

export const getSpecialLocationData = async () => {
    try {
      const response = await axios.get("special-locations");
      const specialData = [...response.data.list];
      return specialData;
    } catch (error) {
      console.error("Error fetching special location data:", error);
      throw error;
    }
  };