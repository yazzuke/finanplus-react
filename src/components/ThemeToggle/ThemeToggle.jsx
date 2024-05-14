import React, { createContext, useContext, useState } from 'react';
import { useTheme } from 'next-themes';
import  MoonIcon  from "../../assets/moon.png";
import  SunIcon  from "../../assets/sun.png";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); 
  };

  

  return (
    <button className="flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors" onClick={toggleTheme}>
      <img src={theme === 'light' ? MoonIcon : SunIcon} alt="Toggle theme" className="w-6 ml-2 mr-2" />
      {theme === 'light' ? '' : ''}
    </button>
  );
}

export default ThemeSwitcher;