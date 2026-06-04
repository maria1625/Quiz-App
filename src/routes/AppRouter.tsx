import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import NotFoundPage from "../pages/NotFoundPage";

export const appRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/result", element: <Result /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
