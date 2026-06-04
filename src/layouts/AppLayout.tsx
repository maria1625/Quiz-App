import { Outlet, Link } from "react-router-dom";

import ThemeToggle from "../components/ui/ThemeToggle";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900">

      {/* Header */}
     <header className="bg-white dark:bg-slate-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

      <Link
      to="/"
      className="text-2xl font-bold text-blue-600"
    >
      🌎 Country Quiz
      </Link>

      <ThemeToggle />

       </div>
    </header>

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 shadow-inner">
        <div className="text-gray-600 dark:text-gray-300">
          Country Quiz © 2026
        </div>
      </footer>

    </div>
  );
}

export default AppLayout;