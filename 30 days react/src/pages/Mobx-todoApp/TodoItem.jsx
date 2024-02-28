
import store from "../../store/mobx/store";
import { observer } from "mobx-react-lite";
const TodoItem = observer(({ todo }) => {

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => store.toogleComplated(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => store.removeTodo(todo.id)}>Remove</button>
    </li>
  );
});

export default TodoItem;