import axios from "../axiosConfig";

export const getInstallationById = async (int_id, setData) => {
  try {
    const response = await axios.get(`installationsById/${int_id}`);
    setData(response.data[0]);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};
