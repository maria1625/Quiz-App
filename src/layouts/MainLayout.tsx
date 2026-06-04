import { Link, Outlet } from "react-router-dom";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { HighScore } from "../components/HighScore";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-blue-600 text-lg">
            Country Quiz
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-4 text-sm">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/quiz" className="hover:underline">
              Quiz
            </Link>
            <DarkModeToggle />
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6 flex justify-end">
          <HighScore />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
