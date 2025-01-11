import axios from "axios";

const API_BASE_URL = "https://elysian-feast.onrender.com/user"; // Replace with your API base URL

export const fetchAllUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/all`);
  return response.data.users;
};

export const addUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/create`, userData);
  return response.data.newUser;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_BASE_URL}/update/${id}`, userData);
  return response.data.updatedUser;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
  return response.data.message;
};
