import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { filterText, todoListState } from "../../store/recoil/Todo";

function AddTodo() {
  const [textTodo, setTextTodo] = useState("");
  const [filterTodoText, setFilterTodoText] = useRecoilState(filterText);
  const filterChange = (e) => {
    setFilterTodoText(e.target.value);
  };

  const setTodoList = useSetRecoilState(todoListState);
  const addTodo = () => {
    setTodoList((prevTodo) => [
      ...prevTodo,
      {
        id: Math.random(),
        title: textTodo,
        isComplate: false,
      },
    ]);
    setTextTodo("");
  };
  const onChange = ({ target: { value } }) => {
    setTextTodo(value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={filterTodoText}
          onChange={filterChange}
          placeholder="Search ..."
        />
      </div>
      <input type="text" value={textTodo} onChange={onChange} />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default AddTodo;
