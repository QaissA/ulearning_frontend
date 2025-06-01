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

// Create an Axios instance with default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Replace with your token retrieval logic
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (data: RegisterUser) => {
  const response = await apiClient.post(`/login`, data);
  return response.data;
};

export const loginUser = async (data: LoginUser): Promise<LoginResponse> => {
  const response = await apiClient.post(`/login/signin`, data);
  const { token } = response.data;

  // Store the token in localStorage
  if (token) {
    localStorage.setItem("authToken", token);
  }

  return response.data;
};

interface FetchStudentsParams {
  page?: number;
  limit?: number;
}

export async function fetchStudents(params: FetchStudentsParams = {}): Promise<Students[]> {
  const { page = 1, limit = 10 } = params;
  const res = await apiClient.get(`/users`, {
    params: { page, limit }
  });
  return res.data;
}

export interface FetchNotesParams {
  page?: number;
  limit?: number;
}

export const fetchNotes = async (params: FetchNotesParams = {}) => {
  const { page = 1, limit = 10 } = params;
  const res = await apiClient.get(`/notes`, {
    params: { page, limit }
  });
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
  const res = await apiClient.get(`/classes`);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};

export interface FetchAttendanceParams {
  userId: number;
  page?: number;
  limit?: number;
}

export const fetchAttendance = async ({ userId, page = 1, limit = 10 }: FetchAttendanceParams) => {
  const res = await apiClient.get(`/attendance/user/${userId}`, {
    params: { page, limit },
  });
  return res.data;
};

export interface FetchAttendanceByDateParams {
  date: string;
  page?: number;
  limit?: number;
}

export const fetchAttendanceByDate = async ({ date, page = 1, limit = 10 }: FetchAttendanceByDateParams) => {
  const res = await apiClient.get(`/attendance/date`, {
    params: { date, page, limit },
  });
  return res.data;
};
