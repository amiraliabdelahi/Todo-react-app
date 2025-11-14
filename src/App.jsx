import Column from "./components/Column";
import CreateColumn from "./components/CreateColumn";
import { useTask } from "./context/TaskContext";
import "./index.css";
function App() {
  const { state, addColumn } = useTask();
  return (
    <div className="space-y-6 select-none">
      <CreateColumn addColumn={addColumn} />
      <hr className="opacity-10" />
      <main className="grid grid-cols-4 justify-center items-start gap-5">
        {state.columns.map((column) => (
          <Column column={column} />
        ))}
      </main>
    </div>
  );
}
export default App;
