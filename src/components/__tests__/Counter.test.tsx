import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../Counter";
import { COUNTER_DEFAULTS, COUNTER_MIN_VALUE, STORAGE_KEYS } from "../../types";

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock console.error to test localStorage error handling
const mockConsoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

describe("Counter Component", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  it("increments counter when increment button is clicked", async () => {
    render(<Counter />);

    // Get all buttons and find increment button by class
    const allButtons = screen.getAllByRole("button");
    const incrementButton = allButtons.find((btn) =>
      btn.className.includes("right-0")
    );

    await userEvent.click(incrementButton!);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("respects minimum value constraint", async () => {
    const savedState = { count: COUNTER_MIN_VALUE, step: 1, actions: [] };
    mockLocalStorage.setItem(
      STORAGE_KEYS.COUNTER_STATE,
      JSON.stringify(savedState)
    );

    render(<Counter />);

    const allButtons = screen.getAllByRole("button");
    const decrementButton = allButtons.find((btn) =>
      btn.className.includes("left-0")
    );

    await userEvent.click(decrementButton!);

    expect(screen.getByText(COUNTER_MIN_VALUE.toString())).toBeInTheDocument();
  });

  it("disables decrement button when at minimum value", () => {
    const savedState = { count: COUNTER_MIN_VALUE, step: 1, actions: [] };
    mockLocalStorage.setItem(
      STORAGE_KEYS.COUNTER_STATE,
      JSON.stringify(savedState)
    );

    render(<Counter />);

    const allButtons = screen.getAllByRole("button");
    const decrementButtons = allButtons.filter((btn) =>
      btn.className.includes("left-0")
    );

    decrementButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("resets counter to default value when reset button is clicked", async () => {
    const savedState = { count: 10, step: 2, actions: [] };
    mockLocalStorage.setItem(
      STORAGE_KEYS.COUNTER_STATE,
      JSON.stringify(savedState)
    );

    render(<Counter />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    await userEvent.click(resetButton);

    expect(
      screen.getByText(COUNTER_DEFAULTS.COUNT.toString())
    ).toBeInTheDocument();
  });

  it("updates step value when input changes", async () => {
    render(<Counter />);

    const stepInput = screen.getByLabelText(/set count/i);
    await userEvent.clear(stepInput);
    await userEvent.type(stepInput, "5");

    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
  });

  it("handles invalid step input by filtering non-numeric characters", async () => {
    render(<Counter />);

    const stepInput = screen.getByLabelText(/set count/i);
    await userEvent.clear(stepInput);
    await userEvent.type(stepInput, "abc123def");

    expect(screen.getByDisplayValue("123")).toBeInTheDocument();
  });

  it("uses custom step value for increment/decrement", async () => {
    render(<Counter />);

    // Set step to 5
    const stepInput = screen.getByLabelText(/set count/i);
    await userEvent.clear(stepInput);
    await userEvent.type(stepInput, "5");

    // Increment
    const allButtons = screen.getAllByRole("button");
    const incrementButton = allButtons.find((btn) =>
      btn.className.includes("right-0")
    );
    await userEvent.click(incrementButton!);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("persists state to localStorage on state changes", async () => {
    render(<Counter />);

    const allButtons = screen.getAllByRole("button");
    const incrementButton = allButtons.find((btn) =>
      btn.className.includes("right-0")
    );
    await userEvent.click(incrementButton!);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.COUNTER_STATE,
      expect.stringContaining('"count":1')
    );
  });

  it("adds action items when performing operations", async () => {
    render(<Counter />);

    const allButtons = screen.getAllByRole("button");
    const incrementButton = allButtons.find((btn) =>
      btn.className.includes("right-0")
    );
    await userEvent.click(incrementButton!);

    const savedState = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);
    expect(savedState.actions).toHaveLength(1);
    expect(savedState.actions[0].text).toBe("Incremented by 1");
    expect(savedState.actions[0].timestamp).toEqual(expect.any(Number));
  });

  it("applies animation classes during operations", async () => {
    render(<Counter />);

    const counterDisplay = screen.getByText("0");
    const allButtons = screen.getAllByRole("button");
    const incrementButton = allButtons.find((btn) =>
      btn.className.includes("right-0")
    );

    await userEvent.click(incrementButton!);

    // Animation should be applied temporarily
    await waitFor(() => {
      expect(counterDisplay).toHaveClass("animate-pulse", "scale-110");
    });

    // Animation should be removed after timeout
    await waitFor(
      () => {
        expect(counterDisplay).not.toHaveClass("animate-pulse", "scale-110");
      },
      { timeout: 500 }
    );
  });
});
