import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaTrash } from "react-icons/fa";

type DeleteTodoProps = {
  onConfirm: () => void;
};

const DeleteTodoDialog = ({ onConfirm }: DeleteTodoProps) => {
  return (
    <Dialog>
      <DialogTrigger render={<button className="cursor-pointer" />}>
        <FaTrash />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>

          <DialogDescription>
            {" "}
            Are you sure you want to delete this task?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <button
            type="button"
            onClick={onConfirm}
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
