import { useState } from "react";
import { useTodos} from "../store/zustand/zustandStore";

function AddTodo() {
    // const {title , setTitle ,complated , setComplated , addTodo , resetTodoForm} = useTodosFull() 
    const [title , setTitle] = useState("")
    const [complated, setComplated] = useState(false)
    const addTodo = useTodos((state) => state.addTodo)
    const handleSubmit = e =>{
        e.preventDefault()
        addTodo({
            title,  complated
        })
        // resetTodoForm() 
        setTitle("")
        setComplated(false)
    }
  return <form onSubmit={handleSubmit}>
<label htmlFor="todo"> Todo </label>
 <input type="text" name="todo" value={title} onChange={(e)=> setTitle(e.target.value)} />
 <br />
 <label htmlFor="complated"> Complated </label>
 <input type="checkbox" name="complated" value={complated} onChange={(e)=> setComplated(e.target.checked)} />
{ complated ? "tamamlandı" : "bekliyor"}
<br />
 <button type="submit">ekle</button>
  </form>;
}

export default AddTodo;
