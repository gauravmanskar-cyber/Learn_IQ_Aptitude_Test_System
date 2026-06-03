import React, { useMemo, useState } from 'react'
import ChildComp from './ChildComp';

export const DemoUseDemo = () => {

    const[count,setcount] = useState(0);
    const[minus,setMinus] = useState(10);
    const havycall=useMemo(()=>{
        console.log("hevey called");

        let result=0;
        for(let i=0;i<100000000;i++){
            result += i;
        }
        return result;
    },[count])

  return (
    <>
         <p>{havycall}</p>
         <button onClick={()=>setcount((count)=>count+1)}>Add</button> {count}
         <button onClick={()=>setMinus((minus)=>minus - 1)}>Minus</button>{minus}
         <ChildComp havycall={havycall}/>

    </>
  )
}
