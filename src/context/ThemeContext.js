import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();
const defaultTheme = localStorage.getItem("theme") || "firstTheme";

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "firstTheme" ? "secondTheme" : "firstTheme"));
  };

  const values = {
    theme,
    toggleTheme,
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used withing a ThemeProvider");
  }
  return context;
};
