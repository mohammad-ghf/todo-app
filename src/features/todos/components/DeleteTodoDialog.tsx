import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

type DeleteTodoProps = {
  onConfirm: () => void;
  title: string;
};

const DeleteTodoDialog = ({ onConfirm, title }: DeleteTodoProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button className="cursor-pointer" />}>
        <FaTrash />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>

          <DialogDescription>
            {" "}
            Are you sure you want to delete {title}?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="rounded-md border px-4 py-2 cursor-pointer"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTodoDialog;
