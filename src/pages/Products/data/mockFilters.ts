import type { FilterOptions } from "../types/product.types";

export const mockFilterOptions: FilterOptions = {
  categories: [
    { id: "cat1", name: "Categories1", count: 6 },
    { id: "cat2", name: "Categories2", count: 10 },
    { id: "cat3", name: "Categories3", count: 4 },
    { id: "cat4", name: "Categories4", count: 4 },
    { id: "cat5", name: "Categories5", count: 3 },
  ],
  manufacturers: [
    { id: "calvin-klein", name: "Calvin Klein", count: 6 },
    { id: "chanel", name: "Chanel", count: 10 },
    { id: "christian-dior", name: "Christian Dior", count: 4 },
    { id: "ferragamo", name: "Ferragamo", count: 4 },
    { id: "hermes", name: "Hermes", count: 10 },
    { id: "louis-vuitton", name: "Louis Vuitton", count: 8 },
    { id: "tommy-hilfiger", name: "Tommy Hilfiger", count: 7 },
    { id: "versace", name: "Versace", count: 6 },
  ],
  colors: [
    { id: "black", name: "Black", count: 6 },
    { id: "blue", name: "Blue", count: 10 },
    { id: "brown", name: "Brown", count: 4 },
    { id: "green", name: "Green", count: 4 },
    { id: "pink", name: "Pink", count: 7 },
    { id: "white", name: "White", count: 8 },
    { id: "yellow", name: "Yellow", count: 5 },
  ],
  tags: [
    "Creams",
    "Eyebrow Pencil",
    "Eyeliner",
    "Eye Shadow",
    "Lotions",
    "Mascara",
    "Oils",
    "Powders",
    "Shampoos",
  ],
  priceRange: {
    min: 0,
    max: 500,
  },
};
