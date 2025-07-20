import { FC, ReactNode } from "react";

// Component for theme selection button
interface ThemeButtonProps {
  onClick: () => void;
  children: ReactNode;
}

const ThemeButton: FC<ThemeButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full justify-center p-2.5 text-sm text-secondary hover:text-border"
    >
      {children}
    </button>
  );
};

export default ThemeButton;
