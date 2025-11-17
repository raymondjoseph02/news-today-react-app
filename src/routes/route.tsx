import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import Home from "../pages/Home";
import NewsDetail from "../pages/NewsDetail";

export const route = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/top-stories",
        element: <Home />,
      },
      {
        path: "/word",
        element: <Home />,
      },
      {
        path: "/business",
        element: <Home />,
      },
      {
        path: "/technology",
        element: <Home />,
      },
      {
        path: "/art",
        element: <Home />,
      },
      {
        path: "/news/:slug",
        element: <NewsDetail />,
      },
    ],
  },
]);
