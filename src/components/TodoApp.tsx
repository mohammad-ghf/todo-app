import { useState } from "react";
import type { Priority } from "../features/todos/types/todo.types";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoForm from "../features/todos/components/TodoForm";
import TodoList from "../features/todos/components/TodoList";
import AddTodo from "@/features/todos/components/AddTodo";
import useTodos from "@/features/todos/hooks/useTodos";
import { TodoHeader } from "@/features/todos/components/TodoHeader";

const TodoApp = () => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");

  const {
    addTodo,
    completeTodo,
    deleteTodo,
    editTodo,
    filter,
    filteredTodos,
    moveTodo,
    search,
    setFilter,
    setSearch,
    taskCompleteQty,
    taskLeftQty,
    todos,
  } = useTodos();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-800 p-2">
      <div className="w-[90%] max-w-125 p-4 bg-mist-300 dark:bg-slate-900 shadow-md rounded-md">
        <TodoHeader
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <div>
          <TodoForm
            input={input}
            setInput={setInput}
            priority={priority}
            setPriority={setPriority}
            filter={filter}
            setFilter={setFilter}
          />

          <AddTodo addTodo={addTodo} input={input} priority={priority} onSuccess={() => setInput("")} />
        </div>

        <div>
          <h1 className="text-center text-black dark:text-white text-xl">
            todos
          </h1>
          <TodoList
            todos={filteredTodos}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            moveTodo={moveTodo}
          />
          <p className="text-black dark:text-white text-sm">
            {taskLeftQty} task left
          </p>
          <p className="text-black dark:text-white text-sm">
            {taskCompleteQty} task complete
          </p>
          <p className="text-black dark:text-white text-sm">
            {todos.length} all task
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
