import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import type { Priority } from "../types/todo";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragHandle } from "react-icons/md";

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
      className="my-4 flex flex-row justify-betwee items-center md:items-center gap-2 bg-gray-400 dark:bg-purple-900 p-2 rounded-md relative"
    >
      <div
        {...attributes}
        {...listeners}
        className="text-2xl dark:text-white text-black cursor-pointer p-3"
      >
        <MdDragHandle />
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-between w-full">
        <div
          className={`text-black dark:text-white flex-2 ${todo.completed ? "line-through" : ""}`}
        >
          <p>{todo.title}</p>

          <p className="text-sm">priority : {todo.priority}</p>
        </div>

        <div className="flex items-center gap-2 text-xl cursor-pointer text-white transition duration-600">
          <div className="flex">
            {isEditing ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border text-black dark:text-white outline-none p-1 mr-3 max-w-44"
              />
            ) : (
              ""
            )}
            {isEditing ? (
              <button
                className="text-black dark:text-white cursor-pointer"
                onClick={handleEdit}
              >
                <FaSave />
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)}>
                {" "}
                <MdEdit className="text-black dark:text-white" />
              </button>
            )}
          </div>

          <div
            onClick={() => completeTodo(todo.id)}
            className="text-black dark:text-white px-1"
          >
            {todo.completed ? <FaCheckCircle /> : <FaRegCircle />}
          </div>
          <FaTrash
            onClick={() => deleteTodo(todo.id)}
            className="text-black dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
