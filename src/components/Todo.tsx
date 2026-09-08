import { useState } from "react";
import { FaCheckCircle, FaTrash, FaRegCircle, FaSave } from "react-icons/fa";
import { MdEdit, MdDragHandle } from "react-icons/md";
import type { Priority } from "../types/todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TodoProp = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    priority: Priority;
  };
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
};

const Task = ({ todo, completeTodo, deleteTodo, editTodo }: TodoProp) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEdit = () => {
    if (!editTitle.trim()) return;

    editTodo(todo.id, editTitle);
    setIsEditing(false);
  };

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
      <button
        {...attributes}
        {...listeners}
        className="shrink-0 cursor-grab p-1 text-xl text-black active:cursor-grabbing dark:text-white"
      >
        <MdDragHandle />
      </button>

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <div className="flex w-full items-center gap-2">
            <input
              autoFocus
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-sm text-black outline-none dark:bg-slate-800 dark:text-white"
            />

            <button
              onClick={handleEdit}
              className="shrink-0 cursor-pointer text-lg text-black dark:text-white"
            >
              <FaSave />
            </button>
          </div>
        ) : (
          <>
            <p
              className={`wrap-break-word text-sm text-black md:text-base dark:text-white ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </p>

            <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">
              priority: {todo.priority}
            </p>
          </>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2 text-lg md:gap-3 md:text-xl">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-black dark:text-white"
          >
            <MdEdit />
          </button>
        )}

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

export default Task;
