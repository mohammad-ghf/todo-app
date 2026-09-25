import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Priority } from "@/features/todos/types/todo.types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { todoSchema } from "../schemas/todo.schema";
import * as yup from "yup";

type FormErrors = {
  title?: string;
  description?: string;
};

type AddTodoProps = {
  addTodo: (title: string, description: string, priority: Priority) => void;
  input: string;
  priority: Priority;
  onSuccess: () => void;
};

const AddTodo = ({ addTodo, input, priority, onSuccess }: AddTodoProps) => {
  const [title, setTitle] = useState(input);
  const [description, setDescription] = useState("");
  const [todoPriority, setTodoPriority] = useState<Priority>("medium");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open) return;

    setTitle(input);
    setTodoPriority(priority);
    setDescription("");
    setErrors({});
  }, [open, input, priority]);

  const handleAddTodo = async () => {
    try {
      await todoSchema.validate(
        {
          title,
          description,
        },
        {
          abortEarly: false,
        },
      );

      setErrors({});
      addTodo(title, description, todoPriority);
      setTitle("");
      setDescription("");
      setOpen(false);
      onSuccess();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formErrors: FormErrors = {};

        error.inner.forEach((validationError) => {
          if (validationError.path) {
            formErrors[validationError.path as keyof FormErrors] =
              validationError.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button className="w-full py-3 mb-6 bg-gray-700 dark:bg-purple-800 text-white cursor-pointer dark:hover:bg-purple-900 text-sm rounded-md"></button>
        }
      >
        Add Todo
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>NewTask</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <label htmlFor="todo-title">Title *</label>

          <input
            id="todo-title"
            className={`w-full rounded-md border px-3 py-2 outline-none ${
              errors.title
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-300"
            }`}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
          />

          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="todo-description">Description</label>

          <textarea
            id="todo-description"
            className="w-full h-36 resize-none p-3 border mt-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="todo-priority">Priority</label>
          <select
            id="todo-priority"
            className="w-full rounded-md border px-3 py-2 mt-3"
            value={todoPriority}
            onChange={(e) => setTodoPriority(e.target.value as Priority)}
          >
            <option className="dark:text-black" value="low">
              Low
            </option>
            <option className="dark:text-black" value="medium">
              Medium
            </option>
            <option className="dark:text-black" value="high">
              High
            </option>
          </select>
        </div>

        <div>
          <Button className="cursor-pointer w-full" onClick={handleAddTodo}>
            {" "}
            Add Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodo;
