import { useState } from 'react'

export const TodoEditForm = ({todo,updateTaskValue}) => {
  const [value,setValue] = useState(todo.title)
  return (
    <div className='todo-edit-form'>
      <input type="text" placeholder='Update the existing task...' defaultValue={value} onChange={(e) => setValue(e.target.value)}/>
      <button onClick={() => updateTaskValue(value,todo.id)}>Update Task</button>
    </div>
  )
}
