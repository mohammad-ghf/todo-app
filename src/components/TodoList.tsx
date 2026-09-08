import type { TodoType } from "../types/todo";
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
  editTodo: (id: number, title: string) => void;
  moveTodo: (oldIndex: number, newIndex: number) => void;
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

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);

    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    moveTodo(oldIndex, newIndex);
  };

  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-black dark:text-white text-center mt-7">
          todo is empty
        </p>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={todos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default TodoList;
