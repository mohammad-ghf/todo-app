import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import type { Priority } from "../types/todo";
import { useState } from "react";

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

  return (
    <div className="my-4 flex flex-col md:flex-row justify-between gap-2 bg-gray-400 dark:bg-purple-900 p-2 rounded-md relative">
      <div
        className={`text-black dark:text-white ${todo.completed ? "line-through" : ""}`}
      >
        {todo.title}

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
  );
};

export default Task;
