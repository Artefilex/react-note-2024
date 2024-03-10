// import { NavLink } from "react-router-dom";
// import Counter from "./Counter";
import Debaunce from "./Debaunce";
// import Todos from "./zustand/Todos";
//  import Todo from "./Mobx-todoApp/Todo"
// import Todos from "./recoil-app/Todos";

import Rtk from "./Rtk";

function Home() {
  return (
    <>
      <Rtk />
      <Debaunce />
      {/* <Todos/> */}
      {/* <Todos/>  */}
      {/* <Todo/>  */}
      {/* <Counter/> */}
      {/* <NavLink to={"/about"}> Home</NavLink> */}
      {/* <NavLink to={"/products"}> Products</NavLink> */}
    </>
  );
}

export default Home;
