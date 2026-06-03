import React, { useEffect, useRef, useState } from 'react'

// useref  Object return karta hain aur usme current naam ki property hoti hain  

const DemoUseRef = () => {
    // const currentRef = useRef(0);

    // const clickHandle = ()=>{
    //     currentRef.current += 1;
    //     console.log(currentRef.current)
    // }

        // Accesing DOM Element

        // const inputRef = useRef();
        // const[name,setName] = useState("Gaurav");
        // const handleReset = ()=>{
        //     setName("")
        //     inputRef.current.focus();
        // }
        // const handleColor = ()=>{
        //     inputRef.current.style.color ="red";
        // }
        
        //Tracking previous state
        // const[count,setcount] = useState(0);
        // const Prevcount = useRef();
        // useEffect(()=>{
        //     Prevcount.current = count;
        // },[count])


        //Storing setTimeout or setInterval Refrences
        // const [count, setcount] = useState(0);
        // let timerRef = useRef(null);

        // const startTimer = ()=>{
        //     timerRef.current = window.setInterval(()=>{
        //         setcount((count)=>count+1);
        //     },1000) 

        // }

        // const stopTimer = ()=>{
        //     if(timerRef.current){
        //         clearInterval(timerRef.current)
        //         timerRef.current = null;
        //     }

        // }



  return (
   <>
     <h1>{currentRef.current}</h1>
     <button onClick={clickHandle}>update</button>

     {/* Accesing DOM Element */}
    {/* <input ref={inputRef} type='text' placeholder='type something...' value={name} onChange={(e)=>setName(e.target.value)} />
     <button onClick={handleReset}>Reset</button>
     <button onClick={handleColor}>change color</button> */}


     {/* Tracking previous state */}
     {/* <h1>count: {count}</h1>
     <h1>Prev count: {Prevcount.current}</h1>
     <button onClick={()=>setcount(count + 1)}>increment</button> */}

     
     {/* Storing setTimeout or setInterval Refrences */}

        {/* <h1>Timer: {count}</h1>
        <button onClick={startTimer}>start</button>
        <button onClick={stopTimer}>End</button>
        */}

   </>
  )
}

export default DemoUseRef