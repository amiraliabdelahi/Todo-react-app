import { useState } from "react";

export const EditTask = ({ columnId, taskId, prevValue, handleEditTask }) => {
  const [value, setValue] = useState("");
  const handleSave = (e) => {
    e.preventDefault();
    handleEditTask(value);
  };
  return (
    <form onSubmit={handleSave}>
      <input
        className="bg-purple-400 text-white rounded-md p-3 w-full"
        type="text"
        placeholder="Update the existing task..."
        defaultValue={prevValue}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit"></button>
    </form>
  );
};
