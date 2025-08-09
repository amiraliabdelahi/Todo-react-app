import { useEffect, useRef, useState } from "react"

export const TodoForm = ({addTask}) => {
  const [value,setValue] = useState("")
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current?.focus()
  },[])
  const handleAddTask = (e) => {
    e.preventDefault()
    addTask(value);
    inputRef.current?.focus()
    setValue("");
  }
  return (
    <form className='todo-form'>
      <input ref={inputRef} type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="What you wanna do?"/>
      <button onClick={handleAddTask}>Add Task</button>
    </form>
  )
}
