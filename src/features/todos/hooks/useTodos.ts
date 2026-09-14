import { useMemo, useState } from "react";
import type { Filter, Priority, TodoType } from "../types/todo.types";
import useLocalStorage from "@/hooks/useLocalStorage";

const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<TodoType[]>("todos", []);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const addTodo = (title: string, description: string, priority: Priority) => {
    if (!title.trim()) return;

    const newTodo: TodoType = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      priority,
      description: description.trim(),
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const completeTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (
    id: number,
    title: string,
    description: string,
    priority: Priority,
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: title,
              description: description.trim(),
              priority,
            }
          : todo,
      ),
    );
  };

  const moveTodo = (activeId: number, overId: number) => {
    setTodos((prev) => {
      const oldIndex = prev.findIndex((todo) => todo.id === activeId);
      const newIndex = prev.findIndex((todo) => todo.id === overId);

      if(oldIndex === -1 || newIndex === -1) {
        return prev
      }
      
      const newTodos = [...prev];

      const [movedTodo] = newTodos.splice(oldIndex, 1);

      if (!movedTodo) return prev;

      newTodos.splice(newIndex, 0, movedTodo);

      return newTodos;
    });
  };

  const filteredTodos = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(normalizedSearch);

      if (!matchesSearch) return false;

      if (filter === "active") {
        return !todo.completed;
      }

      if (filter === "completed") {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filter, search]);

  const taskLeftQty = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const taskCompleteQty = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    search,
    setSearch,
    addTodo,
    completeTodo,
    deleteTodo,
    editTodo,
    moveTodo,
    taskLeftQty,
    taskCompleteQty,
  };
};

export default useTodos;
