import { useEffect, type Dispatch, type SetStateAction } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

type themeProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};
const Theme = ({ darkMode, setDarkMode }: themeProps) => {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);    
  }, [darkMode]);
  return (
    <div className="text-xl">
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="text-black dark:text-white cursor-pointer"
      >
        {darkMode ? <MdSunny /> : <FaMoon />}
      </button>
    </div>
  );
};

export default Theme;
