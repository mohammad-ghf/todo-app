import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Priority, TodoType } from "@/types/todo";
import * as yup from "yup";
import { todoSchema } from "./Schema";
import { Button } from "./ui/button";
import { MdEdit } from "react-icons/md";

type EditTodoModalProps = {
  todo: TodoType;
  editTodo: (
    id: number,
    title: string,
    description: string,
    priority: Priority,
  ) => void;
};

const EditTodoModal = ({ editTodo, todo }: EditTodoModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(todo.title);
      setDescription(todo.description);
      setPriority(todo.priority);
      setTitleError("");
    }
  }, [open, todo]);

  const handleEditTodo = async () => {
    try {
      await todoSchema.validate({
        title,
        description,
      });

      setTitleError("");

      editTodo(todo.id, title, description, priority);

      setOpen(false);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setTitleError(error.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="cursor-pointer text-black dark:text-white"
          />
        }
      >
        {" "}
        <MdEdit />{" "}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Edit Todo</DialogHeader>

        <div>
          <label htmlFor="edit-title">Title</label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) {
                setTitleError("");
              }
            }}
            className={`w-full rounded-md border px-3 py-2 outline-none ${
              titleError
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-300"
            }`}
          />

          {titleError && <p className="text-xs text-red-500">{titleError}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="edit-description">Description</label>

          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-36 w-full resize-none rounded-md border p-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="edit-priority">Priority</label>

          <select
            id="edit-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full rounded-md border px-3 py-2 dark:bg-[#171717]"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <Button className="cursor-pointer" onClick={handleEditTodo}>Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;
