import react, { useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import {decrement,increment,Increment} from "./counter/action";

function App() {
  const num=useSelector(state => state.num);
  const dispatch=useDispatch();
function handleClick(n)
{console.log("handleClick",n);
  dispatch(decrement(n));
  
}
function handle()
{
  dispatch(increment());
}
const [n,setStar]=useState(0);
const handleCh=(e)=>{
n=e.target.value;
console.log(n);
}
  return (
    <div><h1>{num}</h1>
    <input type="text" onChange={(e) => setStar(e.target.value)}></input>
    <button onClick={() => handleClick(n)}>Click -</button>
    <button onClick={handle}>Click +</button>
    </div>
  );
}

export default App;
