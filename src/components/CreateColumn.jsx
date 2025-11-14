import { useEffect, useRef, useState } from "react";

export default function CreateColumn({ addColumn }) {
  const [value, setValue] = useState("");
  const handleAddColumn = (e) => {
    e.preventDefault();
    if (value == "") return;
    addColumn(value);
    setValue("");
  };
  return (
    <form className="flex gap-3 mx-auto bg-white rounded-md p-5 max-w-3xl w-fit">
      <input
        className="p-2 px-4 bg-gray-200 outline-none rounded-md"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your column name..."
      />
      <button
        className="p-2 px-4 rounded-md bg-purple-500 text-white cursor-pointer font-semibold"
        onClick={handleAddColumn}
      >
        Add Column
      </button>
    </form>
  );
}
