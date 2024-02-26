import { useTodos } from "../store/zustand/zustandStore";
import AddTodo from "./AddTodo";

function Todos() {
  const todos = useTodos((state)=> state.todos)
 console.log(todos)
  const removeTodo = useTodos((state) => state.removeTodo)
  return <div>{
    todos.length === 0 && (
        <div> todos boş </div>
    ) }
      {
        todos.map((todo, index) =>(
             <div key={index}> 
             {todo.title}
             {todo.complated ? "tamamlandı" : "bekliyor"}
             <button onClick={()=> removeTodo(index)}>sil</button>
             </div>
        ))
    }
    <AddTodo/>
    
    </div>;
}

export default Todos;
