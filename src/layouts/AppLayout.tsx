import { Outlet, Link } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            🌎 Country Quiz
          </Link>

        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          Country Quiz © 2026
        </div>
      </footer>

    </div>
  );
}

export default AppLayout;