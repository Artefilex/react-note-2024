import  { useEffect, useState } from "react";
import useDebounce from "../helpers/useDebaunce";

function Debaunce() {
    const [value , setValue ] = useState("")
    const [data , setData] = useState([])
    const debouncedValue = useDebounce(value, 500);
      useEffect(()=>{
        if(debouncedValue){
             fetch(`https://fakestoreapi.com/${debouncedValue}`)
            .then(res=>res.json())
            .then(json=>setData(json))
        }
           
      },[debouncedValue])

console.log(data)

  return <div>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
  
    <div> Query Value =  {value }</div>
    {
        data.length > 0 && data.map((item) =>(
            <div key={item.id}>{item.title}</div>
        ))
    }
  </div>;
}

export default Debaunce;
