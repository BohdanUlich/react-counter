import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CounterInput } from "../CounterInput";

const mockOnSetCount = jest.fn();

const defaultProps = {
  currentCount: 5,
  onSetCount: mockOnSetCount,
};

describe("CounterInput Component", () => {
  beforeEach(() => {
    mockOnSetCount.mockClear();
  });

  it("renders with label and input field", () => {
    render(<CounterInput {...defaultProps} />);

    expect(screen.getByLabelText(/set count/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
  });

  it("displays correct current count value", () => {
    render(<CounterInput currentCount={10} onSetCount={mockOnSetCount} />);

    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
  });

  it("displays empty string when currentCount is undefined", () => {
    render(
      <CounterInput currentCount={undefined} onSetCount={mockOnSetCount} />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
  });

  it("displays placeholder text", () => {
    render(<CounterInput {...defaultProps} />);

    expect(screen.getByPlaceholderText("Enter count")).toBeInTheDocument();
  });

  it("calls onSetCount when input value changes", async () => {
    render(<CounterInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "123");

    // onSetCount should be called for each character typed
    expect(mockOnSetCount).toHaveBeenCalled();
  });

  it("has correct input attributes", () => {
    render(<CounterInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "custom-count");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "Enter count");
  });

  it("applies correct CSS classes to input", () => {
    render(<CounterInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(
      "text-center",
      "bg-secondary",
      "border-none",
      "max-w-[150px]"
    );
  });

  it("label is associated with input field", () => {
    render(<CounterInput {...defaultProps} />);

    const label = screen.getByText(/set count/i);
    const input = screen.getByRole("textbox");

    expect(label).toHaveAttribute("for", "custom-count");
    expect(input).toHaveAttribute("id", "custom-count");
  });

  it("renders container with proper structure", () => {
    render(<CounterInput {...defaultProps} />);

    // Test that both label and input are rendered in a container
    expect(screen.getByLabelText(/set count/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("handles backspace and deletion", async () => {
    render(<CounterInput currentCount={123} onSetCount={mockOnSetCount} />);

    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.keyboard("{Backspace}");

    expect(mockOnSetCount).toHaveBeenCalled();
  });

  it("maintains focus when interacting with input", async () => {
    render(<CounterInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    await userEvent.click(input);

    expect(input).toHaveFocus();
  });

  it("renders with correct label styling", () => {
    render(<CounterInput {...defaultProps} />);

    const label = screen.getByText(/set count/i);
    expect(label).toHaveClass("text-sm");
  });
});
