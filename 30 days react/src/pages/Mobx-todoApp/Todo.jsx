import { useContext } from "react";
import { observer } from "mobx-react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";
import { TodoStoreContext } from "../../store/mobx/store";

const Todo = observer(() => {
  const store = useContext(TodoStoreContext);
  return (
    <div style={{ margin: "20px" }}>
      <h1>Todo App using MobX+React</h1>
      <CreateTodo />
      <ul>
        {store.todos.map((todo ,index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>
    </div>
  );
});

export default Todo;