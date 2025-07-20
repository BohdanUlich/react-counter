import { FC } from "react";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: FC<ResetButtonProps> = ({ onReset }) => {
  return (
    <div className="text-center">
      <Button onClick={onReset} variant="secondary">
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </Button>
    </div>
  );
};

export default ResetButton;
