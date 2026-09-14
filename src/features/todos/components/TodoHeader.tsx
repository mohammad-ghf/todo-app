import Theme from "@/components/Theme";
import type { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";

type TodoHeaderProps = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    darkMode: boolean;
    setDarkMode:Dispatch<SetStateAction<boolean>>

}

export const TodoHeader = ({darkMode,search,setDarkMode,setSearch} : TodoHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-black dark:text-white text-3xl">TODOS</h1>
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-2 relative">
          <input
            type="search"
            placeholder="Search"
            className="dark:border-white border-black border outline-none px-2 py-1 rounded-md w-56"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute right-3" />
        </div>
        <Theme darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};
