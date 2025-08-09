import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { Todo } from "./Todo";
import { TodoEditForm } from "./TodoEditForm";
import { TodoForm } from "./TodoForm";
export const TodoWrapper = () => {
  const [todos,setTodos] = useLocalStorage("todos",[]);
  const addTask = (title) => {
    if(!title) return console.log("Write Something Buddy!")
    setTodos([
      ...todos,
      { id: uuidv4(), title, isEditing: false, checked: false },
    ]);
  };
  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const toggleChecked = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };
  const toggleEditDialog = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const updateTaskValue = (title, id) => {
    if(!title) return console.log("Write Something Buddy!")
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, isEditing: false } : todo
      )
    );
  };
  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <TodoForm addTask={addTask} />
      {todos.length > 0 && <p>{todos.length} task/tasks is remaining</p>}
      <main className="task-list">
        {todos.map((todo, index) => (
          <div key={index}>
            {todo.isEditing ? (
              <TodoEditForm todo={todo} updateTaskValue={updateTaskValue} />
            ) : (
              <Todo
                todo={todo}
                toggleEditDialog={toggleEditDialog}
                deleteTask={deleteTask}
                toggleChecked={toggleChecked}
              />
            )}
          </div>
        ))}
      </main>
    </div>
  );
};
