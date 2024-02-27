import { useEffect } from "react";
import {  useTodosFull } from "../store/zustand/zustandStore";
import AddTodo from "./AddTodo";

function Todos() {
  const todos = useTodosFull((state)=> state.todos)
  const updateTodoWithData = useTodosFull((state)=> state.updateTodoWithData)
 useEffect(()=>{
  
   updateTodoWithData()
 },[updateTodoWithData])
 

  const removeTodo = useTodosFull((state) => state.removeTodo)
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
