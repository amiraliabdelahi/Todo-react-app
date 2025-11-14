import { useState } from "react";
import { useTask } from "../context/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Task } from "./Task";
import { CreateTask } from "./CreateTask";

export default function Column({ column }) {
  const { addTask, deleteColumn, deleteTask, moveTask } = useTask();
  const [isDragOver, setIsDragOver] = useState(false);

  // Handle drag over - must prevent default to allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    // Only set false if not dragging over child elements
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      // Get the drag data from the task
      const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
      const { taskId, columnId: sourceColumnId, index: sourceIndex } = dragData;

      // Only move if dropping in a different column
      if (sourceColumnId !== column.id) {
        // Calculate drop position (appends to end for simplicity)
        const destinationIndex = column.tasks.length;

        moveTask(
          sourceColumnId,
          column.id,
          sourceIndex,
          destinationIndex,
          taskId
        );
      }
    } catch (error) {
      console.error("Error processing drop:", error);
    }
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      key={column.id}
      className={`flex flex-col justify-between gap-3 bg-white rounded-lg p-6 duration-200 ${
        isDragOver && "opacity-50"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl">{column.title}</h2>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteColumn(column.id)}
          color="red"
          className="cursor-pointer"
        />
      </div>
      <section className="flex flex-col gap-3">
        {column.tasks.map((task, index) => (
          <Task
            index={index}
            task={task}
            taskId={task.id}
            columnId={column.id}
            deleteTask={deleteTask}
          />
        ))}
      </section>
      <CreateTask addTask={addTask} columnId={column.id} />
    </div>
  );
}
