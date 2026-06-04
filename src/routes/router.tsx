import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import HomePage from '../pages/Home'
import NotFoundPage from '../pages/NotFound'
import QuizPage from '../pages/Quiz'
import ResultsPage from '../pages/Results'
import { paths } from './paths'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: paths.home, element: <HomePage /> },
      { path: paths.quiz, element: <QuizPage /> },
      { path: paths.results, element: <ResultsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
