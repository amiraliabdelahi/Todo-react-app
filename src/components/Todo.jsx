import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export const Todo = ({todo,toggleEditDialog,deleteTask,toggleChecked}) => {
  return (
    <div className="card">
      <div className="icons-container">
        <p onClick={() => toggleChecked(todo.id)} className={`${todo.checked ? "completed-title" : "title"}`}>{todo.title}</p>
        <FontAwesomeIcon onClick={() => toggleEditDialog(todo.id)} icon={faEdit} size="md" color="#4d4d4dff" />
      </div>
      <FontAwesomeIcon onClick={() => deleteTask(todo.id)} icon={faTrash} size="md" color="#e90000ff" />
    </div>
  )
}
