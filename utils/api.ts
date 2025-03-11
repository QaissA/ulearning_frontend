import axios from "axios";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const registerUser = async (data: RegisterUser) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, data);
  return response.data;
};
