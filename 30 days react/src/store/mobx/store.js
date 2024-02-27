import {makeAutoObservable} from "mobx"
import { createContext } from "react";
class Todo {
    title = "";
    complated= false;
    constructor(title){
        makeAutoObservable(this)
       this.title = title 
    }
    toogleComplated () {
        this.complated = !this.complated
    }


}
class TodoStore {
    todos = [];
  
    constructor() {
      makeAutoObservable(this);
    }
  
    addTodo(title) {
      this.todos.push(new Todo(title));
    }
  
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    }
  }
  
  export const todoStore = new TodoStore();
  export const TodoStoreContext = createContext(todoStore);


