import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
export const CreateTask = ({ addTask, columnId }) => {
  const [value, setValue] = useState("");
  const handleAddTask = (e) => {
    e.preventDefault();
    if (value == "") return;
    const newTask = {
      id: `task-${Date.now()}`,
      content: value,
    };
    addTask(columnId, newTask);
    setValue("");
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-gray-200 rounded-lg p-3 cursor-pointer">
        <FontAwesomeIcon icon={faPlus} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adding Task</DialogTitle>
          <DialogDescription>
            Just type whatever you do in your day along and just click the
            button below
          </DialogDescription>
        </DialogHeader>
        <input
          className="p-3 bg-gray-200 outline-none rounded-md"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What you wanna do?"
        />
        <DialogFooter>
          <DialogClose asChild onClick={handleAddTask}>
            <button className="p-3 px-5 rounded-md bg-purple-500 text-white cursor-pointer font-semibold">
              Add Task
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
