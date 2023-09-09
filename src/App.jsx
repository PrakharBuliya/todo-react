import { useRef, useState } from "react";
import Item from "./Item";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        { text: e.target.value, completed: false, id: Date.now() },
      ]);

      inputRef.current.value = "";
    }
  };

  const handleCompleted = (id) => {
    const updatedList = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedList);
  };

  const handleDelete = (id) => {
    const filter = todos.filter((e) => e.id !== id);
    setTodos(filter);
  };

  const handleUpdateText = (id, text) => {
    const updatedList = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    setTodos(updatedList);
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <input type="text" onKeyPress={handleKeyPress} ref={inputRef} />
      {todos.map((e) => (
        <Item
          {...e}
          key={e.id}
          updateCompleted={handleCompleted}
          deleteTodo={handleDelete}
          updateText={handleUpdateText}
        />
      ))}
    </div>
  );
}

export default App;
