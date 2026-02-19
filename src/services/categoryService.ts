import api from "./api";

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

const categoryService = {
  getCategories: async (): Promise<CategoriesResponse> => {
    const response = await api.get<CategoriesResponse>("/categories");
    return response.data;
  },
};

export default categoryService;
