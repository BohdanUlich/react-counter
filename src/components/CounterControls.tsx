import { Button, ButtonProps } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface CounterControlsProps {
  iconSize: number;
  buttonSize: ButtonProps["size"];
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
  isMobile: boolean;
}

export const CounterControls = ({
  iconSize,
  buttonSize,
  onIncrement,
  onDecrement,
  canIncrement,
  canDecrement,
  isMobile,
}: CounterControlsProps) => {
  const iconClasses = `h-${iconSize} w-${iconSize}`;
  const containerClasses = isMobile ? "flex md:hidden" : "hidden md:flex";
  const buttonClasses = `absolute ${
    isMobile ? "-top-12" : "top-1/2 -translate-y-1/2"
  }`;

  return (
    <div className={containerClasses}>
      <Button
        variant="outline"
        size={buttonSize}
        onClick={onDecrement}
        disabled={!canDecrement}
        className={`left-0 ${buttonClasses}`}
      >
        <Minus className={iconClasses} />
      </Button>

      <Button
        variant="outline"
        size={buttonSize}
        onClick={onIncrement}
        disabled={!canIncrement}
        className={`right-0 ${buttonClasses}`}
      >
        <Plus className={iconClasses} />
      </Button>
    </div>
  );
};
