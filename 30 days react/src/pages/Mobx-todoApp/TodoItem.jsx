import { useContext } from "react";
import { TodoStoreContext } from "../../store/mobx/store";
import { observer } from "mobx-react-lite";
const TodoItem = observer(({ todo }) => {
  const store = useContext(TodoStoreContext);

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => todo.toggleCompleted()}
      />
      <span>{todo.title}</span>
      <button onClick={() => store.removeTodo(todo.id)}>Remove</button>
    </li>
  );
});

export default TodoItem;