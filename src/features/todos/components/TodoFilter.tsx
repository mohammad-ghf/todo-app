import type { Dispatch, SetStateAction } from "react";
import type { Filter } from "../types/todo.types";

type TodoFilterProps ={
    filter: Filter;
    setFilter: Dispatch<SetStateAction<Filter>>;
}

const TodoFilter = ({filter,setFilter} : TodoFilterProps) => {
  return (
    <select
      onChange={(e) => setFilter(e.target.value as Filter)}
      value={filter}
      className="bg-gray-700 dark:bg-purple-800 dark:hover:bg-purple-900 text-white rounded-md cursor-pointer outline-none text-sm"
    >
      <option className="cursor-pointer" value="all">
        all
      </option>
      <option className="cursor-pointer" value="active">
        active
      </option>
      <option className="cursor-pointer" value="completed">
        completed
      </option>
    </select>
  );
};

export default TodoFilter;
