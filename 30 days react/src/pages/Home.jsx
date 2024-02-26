

import { NavLink } from "react-router-dom";
import Counter from "./Counter";
import Todos from "./Todos";

function Home() {
    
  return <>
  <Todos/>
  <Counter/>
  <NavLink to={"/about"}> Home</NavLink>
  <NavLink to={"/products"}> Products</NavLink>
  </>;
}

export default Home;
