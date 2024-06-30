import _axios from "./axios";

export const getUsers = async () => {
  try {
    const response = await _axios.get("/api/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

export const updateRole = async (id,role) => {
  try {
    const response = await _axios.put("/api/user/role",
      { id : id, role : role },
    );
    return response.data;
  } catch (error) {
    console.error("Error update role for user:", error.message);
    throw error;
  }
}

export const updateUser = async (id, userData) => {
  try {
    const response = await _axios.put(`/api/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

export const deleteUsers = async (ids) => {
  try {
    const response = await _axios.delete("/api/user", {
      data: { ids },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting users:", error.message);
    throw error;
  }
};
