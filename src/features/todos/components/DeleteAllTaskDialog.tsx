import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

type deleteAllTaskProps = {
  deleteAllTask: () => void;
};

const DeleteAllTaskDialog = ({ deleteAllTask }: deleteAllTaskProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button className="bg-gray-700 dark:bg-purple-800  text-white px-4 py-2 my-3 cursor-pointer active:scale-95 rounded-md" />
        }
      >
        Delete All Task
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete all</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete all tasks?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={deleteAllTask} className="cursor-pointer">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAllTaskDialog;

{
  /* <button
  onClick={deleteAllTask}
  className="bg-gray-700 dark:bg-purple-800  text-white px-4 py-2 my-3 cursor-pointer active:scale-95 rounded-md"
>
  Delete All Task
</button>; */
}
