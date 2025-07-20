import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import { Counter } from "./components/Counter";
import { ThemeType } from "./types";

function App() {
  return (
    <ThemeProvider defaultTheme={ThemeType.SYSTEM} storageKey="counter-theme">
      <div className="relative min-h-screen">
        <ThemeToggle />
        <Counter />
      </div>
    </ThemeProvider>
  );
}

export default App;
