import { createContext, useContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

const TaskContext = createContext();

const initialState = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "1", content: "Learn React" },
        { id: "2", content: "Build Task Clone" },
      ],
    },
    {
      id: "doing",
      title: "Doing",
      tasks: [{ id: "3", content: "Design Components" }],
    },
    {
      id: "done",
      title: "Done",
      tasks: [{ id: "4", content: "Setup Project" }],
    },
  ],
};

export const TaskProvider = ({ children }) => {
  const [state, setState] = useLocalStorage("task-app", initialState);

  const addColumn = (title) => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title,
      tasks: [],
    };
    setState((prevState) => ({
      ...prevState,
      columns: [...prevState.columns, newColumn],
    }));
  };

  const deleteColumn = (columnId) => {
    setState((prevState) => ({
      ...prevState,
      columns: prevState.columns.filter((column) => column.id !== columnId),
    }));
  };

  const addTask = (columnId, task) => {
    setState((prevState) => ({
      ...prevState,
      columns: prevState.columns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, task] }
          : column
      ),
    }));
  };

  const deleteTask = (columnId, taskId) => {
    setState((prevState) => ({
      ...prevState,
      columns: prevState.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          : column
      ),
    }));
  };

  const editTask = (columnId, taskId, newTask) => {
    setState((prevState) => ({
      ...prevState,
      columns: prevState.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id == taskId ? { ...task, content: newTask } : task
              ),
            }
          : column
      ),
    }));
  };

  const moveTask = (
    sourceColumnId,
    destinationColumnId,
    sourceIndex,
    destinationIndex,
    taskId
  ) => {
    setState((prevState) => {
      const sourceColumn = prevState.columns.find(
        (col) => col.id === sourceColumnId
      );
      const destinationColumn = prevState.columns.find(
        (col) => col.id === destinationColumnId
      );

      if (!sourceColumn || !destinationColumn) return prevState;

      const task = sourceColumn.tasks.find((t) => t.id === taskId);
      if (!task) return prevState;

      // Remove from source
      const newSourceTasks = [...sourceColumn.tasks];
      newSourceTasks.splice(sourceIndex, 1);

      // Add to destination
      const newDestinationTasks = [...destinationColumn.tasks];
      newDestinationTasks.splice(destinationIndex, 0, task);

      return {
        ...prevState,
        columns: prevState.columns.map((column) => {
          if (column.id === sourceColumnId) {
            return { ...column, tasks: newSourceTasks };
          }
          if (column.id === destinationColumnId) {
            return { ...column, tasks: newDestinationTasks };
          }
          return column;
        }),
      };
    });
  };

  const value = {
    state,
    addColumn,
    deleteColumn,
    addTask,
    deleteTask,
    editTask,
    moveTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
