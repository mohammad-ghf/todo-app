import { useMemo, useState } from "react";
import type {
  Filter,
  Priority,
  priorityFilter,
  TodoType,
} from "../types/todo.types";
import useLocalStorage from "@/hooks/useLocalStorage";

const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<TodoType[]>("todos", []);
  const [filter, setFilter] = useState<Filter>("all");
  const [priorityFilter, setPriorityFilter] = useState<priorityFilter>("all");
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

    setTodos((prev) => {
      const newTodos = [...prev, newTodo];

      return [
        ...newTodos.filter((todo) => todo.priority === "high"),
        ...newTodos.filter((todo) => todo.priority === "medium"),
        ...newTodos.filter((todo) => todo.priority === "low"),
      ];
    });
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
    setTodos((prev) => {
      const updatedTodos = prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: title.trim(),
              description: description.trim(),
              priority,
            }
          : todo,
      );

      return [
        ...updatedTodos.filter((todo) => todo.priority === "high"),
        ...updatedTodos.filter((todo) => todo.priority === "medium"),
        ...updatedTodos.filter((todo) => todo.priority === "low"),
      ];
    });
  };

  const moveTodo = (activeId: number, overId: number) => {
    setTodos((prev) => {
      const oldIndex = prev.findIndex((todo) => todo.id === activeId);
      const newIndex = prev.findIndex((todo) => todo.id === overId);

      if (oldIndex === -1 || newIndex === -1) {
        return prev;
      }

      const activeTodo = prev[oldIndex];
      const overTodo = prev[newIndex];

      if (!activeTodo || !overTodo) {
        return prev;
      }

      if (activeTodo.priority !== overTodo.priority) {
        return prev;
      }

      const newTodos = [...prev];

      const [movedTodo] = newTodos.splice(oldIndex, 1);

      if (!movedTodo) {
        return prev;
      }

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

      if (priorityFilter === "low") {
        return todo.priority === "low";
      }
      if (priorityFilter === "medium") {
        return todo.priority === "medium";
      }
      if (priorityFilter === "high") {
        return todo.priority === "high";
      }

      return true;
    });
  }, [todos, filter, priorityFilter ,search]);

  const taskLeftQty = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const taskCompleteQty = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const deleteAllTask = () => {
    setTodos([])
  }

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    search,
    setSearch,
    addTodo,
    completeTodo,
    deleteTodo,
    editTodo,
    moveTodo,
    taskLeftQty,
    taskCompleteQty,
    deleteAllTask
  };
};

export default useTodos;
