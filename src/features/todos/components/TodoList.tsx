import type { Priority, TodoType } from "../types/todo.types";
import Todo from "./Todo";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type TodoListProps = {
  todos: TodoType[];
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (
    id: number,
    title: string,
    description: string,
    priority: Priority,
  ) => void;
  moveTodo: (activeId: number, overId: number) => void;
};

const TodoList = ({
  completeTodo,
  deleteTodo,
  todos,
  editTodo,
  moveTodo,
}: TodoListProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    moveTodo(Number(active.id), Number(over.id));
  };

  const highTodos = todos.filter((todo) => todo.priority === "high");
  const mediumTodos = todos.filter((todo) => todo.priority === "medium");
  const lowTodos = todos.filter((todo) => todo.priority === "low");

  const renderGroup = (title: string, groupTodos: TodoType[]) => {
    if (groupTodos.length === 0) return null;

    return (
      <section className="mb-5">
        <h2 className="mb-2 text-sm font-semibold uppercase text-gray-700 dark:text-gray-300">
          {title}
        </h2>

        <SortableContext
          items={groupTodos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          {groupTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </SortableContext>
      </section>
    );
  };

  return (
    <div>
      {todos.length === 0 ? (
        <p className="mt-7 text-center text-black dark:text-white">
          todo is empty
        </p>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {renderGroup("High Priority", highTodos)}

          {renderGroup("Medium Priority", mediumTodos)}

          {renderGroup("Low Priority", lowTodos)}
        </DndContext>
      )}
    </div>
  );
};

export default TodoList;
