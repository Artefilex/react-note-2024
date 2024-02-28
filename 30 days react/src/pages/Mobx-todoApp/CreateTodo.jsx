import { useState} from "react";
import store from "../../store/mobx/store";
import { observer } from "mobx-react";

const CreateTodo = observer(() => {
  const [title, setTitle] = useState("");
 console.log(store.todos)
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