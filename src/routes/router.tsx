import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/Home/HomePage";
import QuizPage from "../pages/Quiz/QuizPage";
import ResultsPage from "../pages/Results/ResultsPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/quiz",
        element: <QuizPage />,
      },
      {
        path: "/results",
        element: <ResultsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);