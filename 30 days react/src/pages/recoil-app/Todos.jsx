import { useRecoilValue } from "recoil";
import { filteredTodo } from "../../store/recoil/Todo";
import AddTodo from "./AddTodo";

function Todos() {
  const filteredTodos = useRecoilValue(filteredTodo);
  return (
    <div>
      <AddTodo />
      {filteredTodos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}

export default Todos;
