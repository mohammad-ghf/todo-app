import type { Dispatch, SetStateAction } from "react";
import type { Priority } from "../types/todo";

type TodoFormProps = {
  input: string;
  priority: Priority;
  setInput: Dispatch<SetStateAction<string>>;
  setPriority: Dispatch<SetStateAction<Priority>>;
  addTodo: () => void;
};

const TodoForm = ({
  addTodo,
  input,
  priority,
  setInput,
  setPriority,
}: TodoFormProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-8">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="flex-4 border-gray-500 outline-none border-2 p-2  placeholder-gray-500 text-black dark:text-white rounded-md"
        placeholder="Add Task"
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

      <button
        onClick={addTodo}
        className="flex-1 py-3 bg-gray-700 cursor-pointerbg-gray-500 dark:bg-purple-800 text-white cursor-pointer dark:hover:bg-purple-900 text-sm rounded-md"
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
