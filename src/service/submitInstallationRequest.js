import axios from "../axiosConfig";

export const submitInstallationRequest = async (requestData) => {
    try {
      const response = await axios.post("installation-request", requestData);
      return response.data;
    } catch (error) {
      console.error("Error submitting installation request:", error);
      throw error;
    }
  };