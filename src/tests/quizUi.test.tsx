import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Quiz from "../pages/Quiz";

vi.mock("../services/countriesApi", () => ({
  fetchCountries: vi.fn(),
}));

vi.mock("../data/questionGenerator", () => ({
  generateQuestions: vi.fn(),
  calculateScore: vi.fn(),
}));

vi.mock("../utils/audio", () => ({
  playCorrectSound: vi.fn(),
  playIncorrectSound: vi.fn(),
  playTimeoutSound: vi.fn(),
}));

vi.mock("../hooks/useTimer", () => ({
  useTimer: () => ({ secondsLeft: 15, progress: 100 }),
}));

function createCountries() {
  return [
    {
      name: { common: "Colombia", official: "Republic of Colombia" },
      capital: ["Bogotá"],
      region: "Americas",
      flags: { svg: "flag.svg" },
      population: 1,
    },
  ];
}

const fetchCountriesMock = vi.mocked(await import("../services/countriesApi")).fetchCountries;
const questionGeneratorMock = vi.mocked(await import("../data/questionGenerator"));

describe("Quiz UI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows loading state and then renders the quiz", async () => {
    fetchCountriesMock.mockResolvedValue(createCountries() as never);
    questionGeneratorMock.generateQuestions.mockReturnValue([
      {
        id: 1,
        country: createCountries()[0],
        question: "Pregunta 1",
        correctAnswer: "Colombia",
        options: ["Colombia", "Perú", "Chile", "Brasil"],
        userAnswer: null,
        isAnswered: false,
      },
    ] as never);
    questionGeneratorMock.calculateScore.mockReturnValue(0);

    const router = createMemoryRouter([{ path: "/quiz", element: <Quiz /> }], {
      initialEntries: ["/quiz"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Cargando quiz...")).toBeTruthy();
    await waitFor(() => expect(screen.getByText("Quiz")).toBeTruthy());
  });

  it("shows error state when the API fails", async () => {
    fetchCountriesMock.mockRejectedValue(new Error("Fallo API"));
    questionGeneratorMock.generateQuestions.mockReturnValue([] as never);
    questionGeneratorMock.calculateScore.mockReturnValue(0);

    const router = createMemoryRouter([{ path: "/quiz", element: <Quiz /> }], {
      initialEntries: ["/quiz"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => expect(screen.getByText("Fallo API")).toBeTruthy());
  });

  it("shows a hint when user clicks 'Siguiente' without answering", async () => {
    fetchCountriesMock.mockResolvedValue(createCountries() as never);
    questionGeneratorMock.generateQuestions.mockReturnValue([
      {
        id: 1,
        country: createCountries()[0],
        question: "Pregunta 1",
        correctAnswer: "Colombia",
        options: ["Colombia", "Perú", "Chile", "Brasil"],
        userAnswer: null,
        isAnswered: false,
      },
    ] as never);
    questionGeneratorMock.calculateScore.mockReturnValue(0);

    const router = createMemoryRouter([{ path: "/quiz", element: <Quiz /> }], {
      initialEntries: ["/quiz"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => expect(screen.getByText("Quiz")).toBeTruthy());
    fireEvent.click(screen.getByRole("button", { name: "Ver resultado" }));
    expect(screen.getByText("Selecciona una opción para poder continuar.")).toBeTruthy();
  });

  it("lets the user answer and then go to the next question", async () => {
    fetchCountriesMock.mockResolvedValue(createCountries() as never);
    questionGeneratorMock.generateQuestions.mockReturnValue([
      {
        id: 1,
        country: createCountries()[0],
        question: "Pregunta 1",
        correctAnswer: "Colombia",
        options: ["Colombia", "Perú", "Chile", "Brasil"],
        userAnswer: null,
        isAnswered: false,
      },
      {
        id: 2,
        country: createCountries()[0],
        question: "Pregunta 2",
        correctAnswer: "Colombia",
        options: ["Colombia", "Perú", "Chile", "Brasil"],
        userAnswer: null,
        isAnswered: false,
      },
    ] as never);
    questionGeneratorMock.calculateScore.mockReturnValue(1);

    const router = createMemoryRouter(
      [
        { path: "/quiz", element: <Quiz /> },
        { path: "/result", element: <div>RESULT</div> },
      ],
      { initialEntries: ["/quiz"] },
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => expect(screen.getByText("Quiz")).toBeTruthy());
    expect(screen.getByText("Pregunta 1")).toBeTruthy();

    fireEvent.click(screen.getByText("Colombia"));
    await waitFor(() =>
      expect(screen.getByText("¡Correcto! Puedes continuar.")).toBeTruthy(),
    );

    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    await waitFor(() => expect(screen.getByText("Pregunta 2")).toBeTruthy());
  });
});
