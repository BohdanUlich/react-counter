import { FC, useState, ReactNode } from "react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Monitor } from "lucide-react";
import ThemeButton from "./ThemeButton";
import { ThemeType } from "../types";

// Theme options data
interface ThemeOption {
  theme: ThemeType;
  icon: ReactNode;
}

const themeOptions: ThemeOption[] = [
  { theme: ThemeType.LIGHT, icon: <Sun className="h-4 w-4" /> },
  { theme: ThemeType.DARK, icon: <Moon className="h-4 w-4" /> },
  { theme: ThemeType.SYSTEM, icon: "Auto" },
];

const ThemeToggle: FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const getThemeIcon = () => {
    // When system theme is selected, show the icon of the resolved theme
    const displayTheme = theme === ThemeType.SYSTEM ? resolvedTheme : theme;

    switch (displayTheme) {
      case ThemeType.LIGHT:
        return <Sun className="h-4 w-4" />;
      case ThemeType.DARK:
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        <Button
          variant="default"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-primary"
          size="iconSmall"
        >
          {getThemeIcon()}
        </Button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <div className="absolute right-[-3px] top-0 bg-primary rounded-[50px] shadow-lg z-50">
              <div className="py-1">
                {themeOptions.map((option) => (
                  <ThemeButton
                    key={option.theme}
                    onClick={() => {
                      setTheme(option.theme);
                      setIsOpen(false);
                    }}
                  >
                    {option.icon}
                  </ThemeButton>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
