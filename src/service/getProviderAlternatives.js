import axios from "../axiosConfig";

export const getProviderAlternatives = async (areaId, setProvData) => {
  try {
    const response = await axios.get(`getProvidersbyArea/${areaId}`);
    setProvData([
      ...response.data.list,
      { provider: { id: 5, provider: "Telkomsel (M2M)" } },
    ]);
    console.log(response.data.list);
  } catch (error) {
    console.error("Error fetching Provider data:", error);
  }
};
