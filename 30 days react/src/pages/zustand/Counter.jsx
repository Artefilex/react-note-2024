import { useCounterStore } from "../../store/zustand/zustandStore";

function Counter() {
  const {count,increment, clear , decrement} = useCounterStore((state) => state);
  
  return (
    <div>
      <h1> {count} </h1>
      <div>
        <button onClick={increment}> + </button>
        <button onClick={decrement}> - </button>
        <button onClick={clear}>cleare</button>
      </div>
    </div>
  );
}

export default Counter;
