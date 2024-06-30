import _axios from "./axios";

export const getRoles = async () => {
  try {
    const response = await _axios.get("/api/role");
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error.message);
    throw error;
  }
}