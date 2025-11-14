import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { EditTask } from "./EditTask";
import { useTask } from "../context/TaskContext";

export const Task = ({ task, taskId, columnId, index, deleteTask }) => {
  const [editMode, setEditMode] = useState(false);
  const { editTask } = useTask();
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        taskId,
        columnId,
        index,
      })
    );
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
  };
  const handleEditTask = (value) => {
    if (value == "") return;
    editTask(columnId, taskId, value);
    setEditMode(false);
  };
  return !editMode ? (
    <div
      key={task.id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDoubleClick={() => setEditMode(true)}
      draggable
      className="flex justify-between items-center bg-gray-100 text-gray-500 rounded-lg p-3"
    >
      <p className="text-wrap">{task.content}</p>
      <FontAwesomeIcon
        icon={faDeleteLeft}
        className="cursor-pointer"
        size="sm"
        onClick={() => deleteTask(columnId, taskId)}
      />
    </div>
  ) : (
    <EditTask
      taskId={taskId}
      columnId={columnId}
      prevValue={task.content}
      handleEditTask={handleEditTask}
    />
  );
};
