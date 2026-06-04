import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">

      <h1 className="text-8xl font-bold text-red-500 mb-4">
        404
      </h1>

      <h2 className="text-3xl font-semibold mb-4">
        Página no encontrada
      </h2>

      <p className="text-gray-600 max-w-md mb-8">
        La página que intentas visitar no existe o fue movida.
      </p>

      <button
        onClick={() => navigate("/")}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-lg
          font-semibold
          transition
        "
      >
        Volver al inicio
      </button>

    </div>
  );
}

export default NotFoundPage;