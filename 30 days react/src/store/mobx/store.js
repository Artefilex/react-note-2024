import {makeAutoObservable} from "mobx"

class Todo {
   id = Math.random()
    title = "";
    complated= false;
    constructor(title){
        makeAutoObservable(this)
       this.title = title 
    }

}
class TodoStore {
    todos = [];
  
    constructor() {
      makeAutoObservable(this);
    }
    toogleComplated (id) {
      this.todos.find((todo)=>{
        if(todo.id === id){
          todo.complated = !todo.complated
        }
      })
  }

      addTodo(title) {
        this.todos = [...this.todos ,new Todo(title)]
      }
    
  
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    }
  }
  
  const stores = new TodoStore();

  
export default  stores

