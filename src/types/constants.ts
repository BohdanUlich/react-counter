import { ThemeProviderState } from "./types";

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export const THEME_INITIAL_STATE: ThemeProviderState = {
  theme: ThemeType.SYSTEM,
  setTheme: () => null,
  resolvedTheme: ThemeType.SYSTEM,
};

export const STORAGE_KEYS = {
  COUNTER_STATE: "counter-state",
  UI_THEME: "ui-theme",
} as const;

export const COUNTER_MIN_VALUE = 0;
export const COUNTER_MAX_VALUE = 100;

export const COUNTER_DEFAULTS = {
  COUNT: 0,
  STEP: 1,
  MAX_ACTIONS: 5,
  ANIMATION_DURATION: 300,
  MIN_VALUE: COUNTER_MIN_VALUE,
  MAX_VALUE: COUNTER_MAX_VALUE,
} as const;
