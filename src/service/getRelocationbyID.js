import axios from "../axiosConfig";

export const getRelocationById = async (id, setData) => {
  try {
    const response = await axios.get(`relocations/${id}`);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching relocation data:", error);
  }
};