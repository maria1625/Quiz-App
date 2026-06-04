import { NavLink, Outlet } from "react-router-dom";
import { DarkModeToggle } from "../components/DarkModeToggle";

export default function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white text-gray-900 dark:from-gray-950 dark:to-gray-900 dark:text-gray-100">
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-500/10" />
      <div className="pointer-events-none absolute -right-40 top-24 h-80 w-80 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/10" />

      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/70 backdrop-blur dark:border-gray-800 dark:bg-gray-950/50">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-xl">🌎</span>
            <span className="text-lg font-extrabold tracking-tight text-blue-700 dark:text-blue-300">
              Country Quiz
            </span>
          </NavLink>

          <nav className="ml-auto flex flex-wrap items-center justify-end gap-2 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  "rounded-xl px-3 py-2 font-semibold transition",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-white dark:text-gray-200 dark:hover:bg-gray-900/60",
                ].join(" ")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/quiz"
              className={({ isActive }) =>
                [
                  "rounded-xl px-3 py-2 font-semibold transition",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-white dark:text-gray-200 dark:hover:bg-gray-900/60",
                ].join(" ")
              }
            >
              Quiz
            </NavLink>
            <DarkModeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
