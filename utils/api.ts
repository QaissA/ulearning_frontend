import { Students } from "@/app/(modules)/students/columns";
import axios from "axios";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

interface Role {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  role: Role;
  adress: string;
  isDeleted: boolean;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface LoginUser {
  email: string;
  password: string;
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const registerUser = async (data: RegisterUser) => {
  const response = await axios.post(`${API_BASE_URL}/login`, data);
  return response.data;
};

export const loginUser = async (data: LoginUser): Promise<LoginResponse> => {
  const response = await axios.post(`${API_BASE_URL}/login/signin`, data);
  return response.data;
}

export async function fetchStudents(): Promise<Students[]> {
  const res = await axios.get(`${API_BASE_URL}/users/role/STUDENT`);
  return res.data;
}

export const fetchNotes = async () => {
  const res = await axios.get(`${API_BASE_URL}/notes`);
  return res.data;
};

export interface Class {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  users: any[];
}

export const fetchClasses = async (): Promise<Class[]> => {
  const res = await axios.get(`${API_BASE_URL}/classes`);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/users/${id}`);
};
