import axios from "../axiosConfig";

export const getAtmById = async (int_id, setData) => {
  try {
    const response = await axios.get(`atmById/${int_id}`);
    setData(response.data[0]);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};
