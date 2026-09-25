import Theme from "@/components/Theme";
import type { Dispatch, SetStateAction } from "react";

type TodoHeaderProps = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    darkMode: boolean;
    setDarkMode:Dispatch<SetStateAction<boolean>>

}

export const TodoHeader = ({darkMode,setDarkMode} : TodoHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-black dark:text-white text-3xl">TODOS</h1>
      <div className="flex items-center gap-3.5">
        <Theme darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};
