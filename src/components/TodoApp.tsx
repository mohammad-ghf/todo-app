import { useState } from "react";
import type { Filter, Priority, TodoType } from "../types/todo";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Theme from "./Theme";

function TodoApp() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [todos, setTodos] = useLocalStorage<TodoType[]>("todos", []);
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: TodoType = {
      id: Date.now(),
      title: input,
      completed: false,
      priority: priority,
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
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  const taskLeftQty = todos.filter((todo) => !todo.completed).length;
  const taskcompleteQty = todos.filter((todo) => todo.completed).length;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-800 p-2">
      <div className="w-[90%] max-w-125 p-4 bg-mist-300 dark:bg-slate-900 shadow-md rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-black dark:text-white text-3xl">TODOS</h1>
          <div className="flex items-center gap-3.5">
            <select
              onChange={(e) => setFilter(e.target.value as Filter)}
              value={filter}
              className="bg-gray-700 dark:bg-purple-900 text-white p-1"
            >
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
            </select>
            <Theme darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
        <TodoForm
          input={input}
          setInput={setInput}
          priority={priority}
          setPriority={setPriority}
          addTodo={addTodo}
        />

        <div>
          <h1 className="text-center text-black dark:text-white text-xl">
            todos
          </h1>
          <TodoList
            todos={filteredTodos}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
          <p className="text-black dark:text-white text-sm">{taskLeftQty} task left</p>
          <p className="text-black dark:text-white text-sm">{taskcompleteQty} task complete</p>
          <p className="text-black dark:text-white text-sm">{todos.length} all task</p>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
