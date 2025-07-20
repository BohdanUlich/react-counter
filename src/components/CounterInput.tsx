import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface CounterInputProps {
  currentCount: number | undefined;
  onSetCount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CounterInput = ({
  currentCount,
  onSetCount,
}: CounterInputProps) => {
  return (
    <div className="text-center flex flex-col items-center gap-2">
      <Label htmlFor="custom-count" className="text-sm">
        Set count
      </Label>
      <Input
        id="custom-count"
        value={currentCount ?? ""}
        type="text"
        onChange={(e) => onSetCount(e)}
        placeholder="Enter count"
        className="text-center bg-secondary border-none max-w-[150px]"
      />
    </div>
  );
};
