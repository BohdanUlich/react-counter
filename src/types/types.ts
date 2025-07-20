import { ThemeType } from "./constants";

// Counter types
export interface ActionItem {
  text: string;
  timestamp: number;
}

export interface CounterState {
  count: number;
  step: number | undefined;
  actions: ActionItem[];
}

export interface AnimationState {
  isAnimating: boolean;
  animationType: "increment" | "decrement" | "reset" | null;
}

// Theme types
export type Theme = ThemeType;

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme;
};
