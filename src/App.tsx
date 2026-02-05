import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home/HomePage";
import ProductListPage from "./pages/Products/ProductListPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "products",
          element: <ProductListPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
