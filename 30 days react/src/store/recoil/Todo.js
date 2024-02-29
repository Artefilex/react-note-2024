import { atom, selector } from "recoil";

export const todoListState = atom({
  key: "TodoList",
  default: [{ id: 1, title: "dkcmdvkls" }],
});

export const filterText = atom({
  key: "filterText",
  default: "",
});

export const filteredTodo = selector({
  key: "filterALLTodo",
  get: ({ get }) => {
    const list = get(todoListState);
    const filteredText = get(filterText);
    return list.filter((item) => item.title.includes(filteredText));
  },
});
