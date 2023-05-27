import React, { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import {BsSun} from "react-icons/bs"

const Navbar = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed w-full p-4 flex top-0 justify-between items-center bg-neutral-300 dark:bg-neutral-900 drop-shadow-sm transition-all duration-500">
      <div className="dark:text-neutral-200 font-black text-3xl select-none transition-all duration-500">
        Notes
      </div>

      {theme === "dark" ? (
        <div
          className="p-3 bg-neutral-200 dark:bg-neutral-700 dark:hover:text-yellow-400 rounded-2xl transition-all duration-500"
          onClick={handleThemeSwitch}
        >
          <BsSun
            size={32}
            weight="bold"
            className="text-neutral-800 dark:hover:text-yellow-400 dark:text-neutral-200 transition-all duration-500"
          />
        </div>
      ) : (
        <div
          className="p-3 bg-neutral-200 dark:bg-neutral-700 hover:text-sky-800 transition-all duration-500 rounded-2xl"
          onClick={handleThemeSwitch}
        >
          <FaRegMoon
            size={32}
            weight="bold"
            className="text-neutral-800 dark:text-neutral-200 hover:text-sky-800 transition-all duration-500"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
