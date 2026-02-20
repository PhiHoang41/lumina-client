import api from "./api";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  address: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

const authService = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/auth/register", data);
    return response.data;
  },
};

export default authService;
