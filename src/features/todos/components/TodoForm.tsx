import type { Dispatch, SetStateAction } from "react";
import type { Filter, priorityFilter } from "../types/todo.types";
import { FaSearch } from "react-icons/fa";

type TodoFormProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  priorityFilter: priorityFilter;
  setPriorityFilter: Dispatch<SetStateAction<priorityFilter>>;
};

const TodoForm = ({
  search,
  setSearch,
  priorityFilter,
  setPriorityFilter,
  filter,
  setFilter,
}: TodoFormProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-8 mb-3.5">
      <div className="flex flex-1 items-center relative">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 border-gray-500 outline-none border-2 p-2  placeholder-gray-500 text-black dark:text-white rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute right-3" />
      </div>

      <div className="flex gap-1">
        <select
          className="bg-gray-700 dark:bg-purple-800 text-white cursor-pointer py-3 px-1 dark:hover:bg-purple-900 text-sm rounded-md outline-none"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as priorityFilter)}
        >
          <option value="all">all</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <select
          onChange={(e) => setFilter(e.target.value as Filter)}
          value={filter}
          className="bg-gray-700 dark:bg-purple-800 dark:hover:bg-purple-900 text-white rounded-md cursor-pointer outline-none text-sm py-3 px-1"
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
      </div>
    </div>
  );
};

export default TodoForm;
