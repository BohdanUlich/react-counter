import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CounterControls } from "../CounterControls";

const mockOnIncrement = jest.fn();
const mockOnDecrement = jest.fn();

const defaultProps = {
  iconSize: 10,
  buttonSize: "iconLarge" as const,
  onIncrement: mockOnIncrement,
  onDecrement: mockOnDecrement,
  canIncrement: true,
  canDecrement: true,
  isMobile: false,
};

describe("CounterControls Component", () => {
  beforeEach(() => {
    mockOnIncrement.mockClear();
    mockOnDecrement.mockClear();
  });

  it("renders increment and decrement buttons", () => {
    render(<CounterControls {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);

    // Find buttons by their position classes
    const decrementButton = buttons.find((btn) =>
      btn.className.includes("left-0")
    );
    const incrementButton = buttons.find((btn) =>
      btn.className.includes("right-0")
    );

    expect(decrementButton).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
  });

  it("calls onIncrement when increment button is clicked", async () => {
    render(<CounterControls {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    const incrementButton = buttons.find((btn) =>
      btn.className.includes("right-0")
    );

    await userEvent.click(incrementButton!);

    expect(mockOnIncrement).toHaveBeenCalledTimes(1);
  });

  it("calls onDecrement when decrement button is clicked", async () => {
    render(<CounterControls {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    const decrementButton = buttons.find((btn) =>
      btn.className.includes("left-0")
    );

    await userEvent.click(decrementButton!);

    expect(mockOnDecrement).toHaveBeenCalledTimes(1);
  });

  it("disables increment button when canIncrement is false", () => {
    render(<CounterControls {...defaultProps} canIncrement={false} />);

    const buttons = screen.getAllByRole("button");
    const incrementButton = buttons.find((btn) =>
      btn.className.includes("right-0")
    );

    expect(incrementButton).toBeDisabled();
  });

  it("disables decrement button when canDecrement is false", () => {
    render(<CounterControls {...defaultProps} canDecrement={false} />);

    const buttons = screen.getAllByRole("button");
    const decrementButton = buttons.find((btn) =>
      btn.className.includes("left-0")
    );

    expect(decrementButton).toBeDisabled();
  });

  it("does not call onIncrement when increment button is disabled", async () => {
    render(<CounterControls {...defaultProps} canIncrement={false} />);

    const buttons = screen.getAllByRole("button");
    const incrementButton = buttons.find((btn) =>
      btn.className.includes("right-0")
    );

    await userEvent.click(incrementButton!);

    expect(mockOnIncrement).not.toHaveBeenCalled();
  });

  it("does not call onDecrement when decrement button is disabled", async () => {
    render(<CounterControls {...defaultProps} canDecrement={false} />);

    const buttons = screen.getAllByRole("button");
    const decrementButton = buttons.find((btn) =>
      btn.className.includes("left-0")
    );

    await userEvent.click(decrementButton!);

    expect(mockOnDecrement).not.toHaveBeenCalled();
  });

  it("renders correctly for mobile layout", () => {
    render(<CounterControls {...defaultProps} isMobile={true} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("renders correctly for desktop layout", () => {
    render(<CounterControls {...defaultProps} isMobile={false} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("applies correct button size variant", () => {
    render(<CounterControls {...defaultProps} buttonSize="iconMedium" />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveClass("h-16", "w-16"); // iconMedium size
    });
  });

  it("applies correct positioning classes for mobile layout", () => {
    render(<CounterControls {...defaultProps} isMobile={true} />);

    const buttons = screen.getAllByRole("button");
    const decrementButton = buttons.find((btn) =>
      btn.className.includes("left-0")
    );
    const incrementButton = buttons.find((btn) =>
      btn.className.includes("right-0")
    );

    expect(decrementButton).toHaveClass("-top-12");
    expect(incrementButton).toHaveClass("-top-12");
  });

  it("applies correct positioning classes for desktop layout", () => {
    render(<CounterControls {...defaultProps} isMobile={false} />);

    const buttons = screen.getAllByRole("button");
    const decrementButton = buttons.find((btn) =>
      btn.className.includes("left-0")
    );
    const incrementButton = buttons.find((btn) =>
      btn.className.includes("right-0")
    );

    expect(decrementButton).toHaveClass("top-1/2", "-translate-y-1/2");
    expect(incrementButton).toHaveClass("top-1/2", "-translate-y-1/2");
  });

  it("applies outline button variant", () => {
    render(<CounterControls {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveClass("border", "border-primary", "bg-transparent");
    });
  });

  it("positions buttons absolutely with correct left/right alignment", () => {
    render(<CounterControls {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    const decrementButton = buttons.find((btn) =>
      btn.className.includes("left-0")
    );
    const incrementButton = buttons.find((btn) =>
      btn.className.includes("right-0")
    );

    expect(decrementButton).toHaveClass("absolute", "left-0");
    expect(incrementButton).toHaveClass("absolute", "right-0");
  });
});
