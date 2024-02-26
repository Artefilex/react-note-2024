import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  decrement: () => {
    set((state) => ({ count: state.count - 1 }));
  },
  clear: () => {
    set({ count: 0 });
  },
}));
export const useTodos = create((set) => ({
  todos: [{ title: "todo1", complated: false }],
  addTodo: (item) =>
    set((state) => ({
      todos: [...state.todos, item],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((_, key) => key !== id),
    })),
}));

export const useTodosFull = create((set) => ({
  todos: [{ title: "todo1", complated: false }],
  title: "",
  complated: false,

  setTitle: title => set(() => ({
      title
    })),
  setComplated: complated => set(() => ({
     complated
    })),
  resetTodoForm: () =>  set(() => ({
      title: "",
      complated: false,
    })),
  addTodo: item =>  set((state) => ({
      todos: [...state.todos, item],
     
    })),
 
  removeTodo: (id) => set((state) => ({
      todos: state.todos.filter((_, key) => key !== id),
    })),
}));
