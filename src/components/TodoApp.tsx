import { useState } from "react";
import type { Filter, Priority, TodoType } from "../types/todo";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Theme from "./Theme";
import AddTodo from "./AddTodo";
import { FaSearch } from "react-icons/fa";

const TodoApp = () => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [todos, setTodos] = useLocalStorage<TodoType[]>("todos", []);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const addTodo = (title: string, description: string, priority: Priority) => {
    if (!input.trim()) return;
    const newTodo: TodoType = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      description,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const completeTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, title: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "active") {
      return !todo.completed && matchesSearch;
    }

    if (filter === "completed") {
      return todo.completed && matchesSearch;
    }

    return matchesSearch;
  });

  const taskLeftQty = todos.filter((todo) => !todo.completed).length;
  const taskcompleteQty = todos.filter((todo) => todo.completed).length;

  const moveTodo = (oldIndex: number, newIndex: number) => {
    setTodos((prev) => {
      const newTodos = [...prev];
      const [moveTodo] = newTodos.splice(oldIndex, 1);
      newTodos.splice(newIndex, 0, moveTodo);

      return newTodos;
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-800 p-2">
      <div className="w-[90%] max-w-125 p-4 bg-mist-300 dark:bg-slate-900 shadow-md rounded-md">
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
        <div>
          <TodoForm
            input={input}
            setInput={setInput}
            priority={priority}
            setPriority={setPriority}
            filter={filter}
            setFilter={setFilter}
          />

          <AddTodo addTodo={addTodo} input={input} priority={priority} />
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
            {taskcompleteQty} task complete
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
