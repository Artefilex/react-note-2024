import { useState, useContext } from "react";
import { TodoStoreContext } from "../../store/mobx/store";
import { observer } from "mobx-react";

const CreateTodo = observer(() => {
  const [title, setTitle] = useState("");
  const store = useContext(TodoStoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      store.addTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
});

export default CreateTodo;