import _axios  from "./axios";

export const getAquaStat = async () => {
  try {
    const response = await _axios.get("/api/aquastats/getData");
    return response.data;
  } catch (error) {
    console.error("Error fetching Aqua Statistics", error.message);
    throw error;
  }
};

export const getRealtime = async () => {
  try {
    const response = await _axios.get("/api/realtime");
    return response.data;
  } catch (error) {
    console.error("Error fetching Realtime Data", error.message);
    throw error;
  }
};