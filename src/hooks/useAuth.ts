import { useQuery } from "@tanstack/react-query";
import authService from "../services/authService";
import { getToken } from "../utils/token";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  address: string | null;
  role: "USER" | "ADMIN";
}

export const useAuth = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: authService.getCurrentUser,
    enabled: !!getToken(),
  });

  return {
    user: data?.data as User | null,
    isLoading,
    error,
    refetch,
  };
};
