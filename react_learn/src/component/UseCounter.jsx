import React, { useState } from 'react'


const useCounter = (initialState=100,step=2) => {
    const[count,setCount] = useState(initialState);
     const handleIncrement = ()=>{
        setCount((count)=>count+step)
     }

     const handleDecrement = ()=>{
        setCount((count)=>count-step)
     }
  return {count,handleIncrement,handleDecrement}
}

export default useCounter