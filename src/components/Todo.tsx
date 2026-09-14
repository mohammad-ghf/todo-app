import { FaCheckCircle, FaTrash, FaRegCircle } from "react-icons/fa";
import { MdDragHandle } from "react-icons/md";
import type { Priority, TodoType } from "../types/todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoDescription from "./TodoDescription";
import EditTodoModal from "./EditTodoModal";

type TodoProp = {
  todo: TodoType;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (
    id: number,
    title: string,
    description: string,
    priority: Priority,
  ) => void;
};

const Todo = ({ todo, completeTodo, deleteTodo, editTodo }: TodoProp) => {

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="my-3 flex w-full items-center gap-2 rounded-md bg-gray-400 p-2 dark:bg-purple-900"
    >
      <div
        {...attributes}
        {...listeners}
        className="touch-none shrink-0 cursor-grab p-3 text-xl text-black active:cursor-grabbing dark:text-white"
      >
        <MdDragHandle />
      </div>

      <div className="min-w-0 flex-1">
        <div>
          <div
            className={`wrap-break-word text-sm text-black md:text-base dark:text-white ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.description.length === 0 ? (
              <p>{todo.title}</p>
            ) : (
              <TodoDescription
                title={todo.title}
                description={todo.description}
                todoId={todo.id}
              />
            )}
          </div>
        </div>

        <p className="text-xs text-gray-700 dark:text-gray-300">
          priority: {todo.priority}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-lg md:gap-3 md:text-xl">
        {!todo.completed && <EditTodoModal todo={todo} editTodo={editTodo} />}

        <button
          onClick={() => completeTodo(todo.id)}
          className="cursor-pointer text-black dark:text-white"
        >
          {todo.completed ? <FaCheckCircle /> : <FaRegCircle />}
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="cursor-pointer text-black dark:text-white"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Todo;
