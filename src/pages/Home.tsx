import { useState } from "react";
import type { Priority } from "@/features/todos/types/todo.types";
import useLocalStorage from "@/hooks/useLocalStorage";
import TodoForm from "../features/todos/components/TodoForm";
import TodoList from "../features/todos/components/TodoList";
import AddTodo from "@/features/todos/components/AddTodo";
import useTodos from "@/features/todos/hooks/useTodos";
import { TodoHeader } from "@/features/todos/components/TodoHeader";
const Home = () => {
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
    priorityFilter,
    setPriorityFilter,
    moveTodo,
    search,
    setFilter,
    setSearch,
    taskCompleteQty,
    taskLeftQty,
    todos,
    deleteAllTask,
  } = useTodos();
  return (
    <div>
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
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
            />

            <AddTodo
              addTodo={addTodo}
              input={input}
              priority={priority}
              onSuccess={() => setInput("")}
            />
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

            {todos.length === 0 ? (
              ""
            ) : (
              <button
                onClick={deleteAllTask}
                className="bg-gray-700 dark:bg-purple-800  text-white px-4 py-2 my-3 cursor-pointer active:scale-95 rounded-md"
              >
                Delete All Task
              </button>
            )}
            
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
    </div>
  );
};

export default Home;
