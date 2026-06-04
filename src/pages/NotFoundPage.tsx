import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
      <div className="w-full rounded-3xl border border-gray-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur dark:border-gray-800 dark:bg-gray-950/40 sm:p-10">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Error</p>
        <h1 className="mt-2 text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          404
        </h1>
        <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
          Página no encontrada
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-gray-600 dark:text-gray-300">
          La página que intentas visitar no existe o fue movida.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate("/", { replace: true })}
            className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
          >
            Volver al inicio
          </button>
          <button
            type="button"
            onClick={() => navigate("/quiz")}
            className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-100 dark:hover:bg-gray-900 sm:w-auto"
          >
            Ir al quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
