import { useState , useContext } from "react";

// Components Imports
import { ThemeContext } from "../context/Contexts";

export function ThemeProvider({children}){
    const [theme , setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light') ? 'dark' : 'light')
    };

    const value = {
        theme,
        toggleTheme,
        isDark : theme === 'dark'
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
 
// Custom Hook
export function useTheme(){
  const context = useContext(ThemeContext)
  if(!context){
    throw new Error(`useTheme must be within a Provider`)
  }
  return context;
}

