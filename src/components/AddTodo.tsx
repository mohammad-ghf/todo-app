import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Priority } from "@/types/todo";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type AddTodoPProps = {
  addTodo: (title: string, description: string, priority: Priority) => void;
  input: string;
  priority: Priority;
};

const AddTodo = ({ addTodo, input, priority }: AddTodoPProps) => {
  const [title, setTitle] = useState(input);
  const [description, setDescription] = useState("");
  const [todopriority, setTodopriority] = useState<Priority>(priority);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTitle(input);
    setTodopriority(priority);
  }, [input, priority]);

  const handleAddTodo = () => {
    if (!title.trim()) return false;

    addTodo(title, description, todopriority);

    return true;
  };

  return (
    <div className="">
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
            <DialogTitle>NewTodo</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Title</label>

            <input
              className="w-full rounded-md border px-3 py-2 outline-none"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              maxLength={15}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Description</label>

            <textarea
              className="w-full h-36 resize-none p-3 border mt-3"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
            ></textarea>
          </div>
          <div>
            <label htmlFor="">Priority</label>
            <select
              className="w-full rounded-md border px-3 py-2 mt-3"
              value={todopriority}
              onChange={(e) => setTodopriority(e.target.value as Priority)}
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
            <Button
              onClick={() => {
                const added = handleAddTodo();

                if (added) {
                  setOpen(false);
                  setDescription("");
                  setTitle("");
                }
              }}
            >
              {" "}
              Add Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTodo;
