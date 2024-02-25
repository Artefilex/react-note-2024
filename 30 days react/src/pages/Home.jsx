

import { NavLink } from "react-router-dom";

function Home() {
    
  return <>
  <NavLink to={"/about"}> Home</NavLink>
  <NavLink to={"/products"}> Products</NavLink>
  </>;
}

export default Home;
