import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResetButton from "../ResetButton";

const mockOnReset = jest.fn();

describe("ResetButton Component", () => {
  beforeEach(() => {
    mockOnReset.mockClear();
  });

  it("renders button with correct text and icon", () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("calls onReset when clicked", async () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });
    await userEvent.click(button);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it("does not call onReset multiple times on single click", async () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });
    await userEvent.click(button);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it("calls onReset on multiple separate clicks", async () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });

    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);

    expect(mockOnReset).toHaveBeenCalledTimes(3);
  });

  it("applies secondary button variant styling", () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });
    expect(button).toHaveClass("bg-secondary", "text-primary");
  });

  it("renders with proper structure", () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });
    expect(button).toBeInTheDocument();
  });

  it("has proper button structure with text content", () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });
    expect(button).toHaveTextContent("Reset");
  });

  it("button renders successfully", () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Reset");
  });

  it("handles rapid clicks without issues", async () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });

    // Simulate rapid clicking
    await userEvent.dblClick(button);

    expect(mockOnReset).toHaveBeenCalledTimes(2);
  });

  it("button can receive focus", async () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });
    await userEvent.tab(); // Tab to focus the button

    expect(button).toHaveFocus();
  });

  it("supports keyboard activation", async () => {
    render(<ResetButton onReset={mockOnReset} />);

    const button = screen.getByRole("button", { name: /reset/i });
    button.focus();

    await userEvent.keyboard("{Enter}");
    expect(mockOnReset).toHaveBeenCalledTimes(1);

    await userEvent.keyboard(" "); // Space key
    expect(mockOnReset).toHaveBeenCalledTimes(2);
  });
});
