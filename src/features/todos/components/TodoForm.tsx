import type { Dispatch, SetStateAction } from "react";
import type { Filter, Priority } from "../types/todo.types";
import TodoFilter from "./TodoFilter";

type TodoFormProps = {
  input: string;
  priority: Priority;
  setInput: Dispatch<SetStateAction<string>>;
  setPriority: Dispatch<SetStateAction<Priority>>;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

const TodoForm = ({
  input,
  priority,
  setInput,
  setPriority,
  filter,
  setFilter,
}: TodoFormProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-8 mb-3.5">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="flex-1 border-gray-500 outline-none border-2 p-2  placeholder-gray-500 text-black dark:text-white rounded-md"
        placeholder="Add Task Name"
      />

      <select
        className="bg-gray-700 dark:bg-purple-800 text-white cursor-pointer py-3 dark:hover:bg-purple-900 text-sm rounded-md outline-none"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <TodoFilter filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default TodoForm;
