import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="x-button-post">
      <span className="hidden xl:inline">
        {theme === "dark" ? "Light theme" : "Dark theme"}
      </span>
      <span className="xl:hidden">{theme === "dark" ? "L" : "D"}</span>
    </button>
  );
}
