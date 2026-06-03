import React, { useCallback, useState } from 'react'
import { Child2 } from './Child2';

export const DemoUseCallback = () => {
    const[count,setCount] = useState(0);
    const[minus,setMinus] = useState(10);


    const handleClick = useCallback (()=>{
        console.log("child compo call");

    },[minus])
  return (
  <>
     
     <button onClick={()=>setCount((count)=>count+1)}>incremet</button>{count}
     <button onClick={()=>setMinus((minus)=>minus-1)}>Minus</button>{minus}
     <Child2 handleClick={handleClick}/>

  </>
  )
}
