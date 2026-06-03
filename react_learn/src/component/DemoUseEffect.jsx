import React, { useEffect, useState } from 'react'

const DemoUseEffect = () => {
    // const[count,setcount] = useState(0)
    // const[number,setnumber] = useState(10)

    // useEffect(()=>{
    //     console.log("useeffect execute...")
    // },[number])

    // cleanup function

    // const[count,setcount] = useState(0);

    // useEffect(()=>{
    //     const interval = setInterval(() => {
    //         setcount((prev)=>prev+1)
    //     },1000);
    //     return ()=>{clearInterval(interval)}
    // },[])
    
    // optimizing performance

    const[searchTerm,setsearchTerm] = useState("");
    const[debouncedTerm,setdebouncedTerm] = useState("");

    useEffect(()=>{
      //api call
      const timeout = setTimeout(()=>{
        setdebouncedTerm(searchTerm);
      },1000)
      return ()=>{clearTimeout(timeout)}
    },[searchTerm])



  return ( 
    <>
       {/* <h1>{count}</h1>
       <h1>{number}</h1>
       <button onClick={()=>setcount(count+1)}>increment</button>
       <button onClick={()=>setnumber(number-1)}>decrement</button> */}

       {/* cleanup function */}
       {/* <h1>Timer: {count}</h1> */}


       {/* optimizing performance */}
       <input type='text'
              value={searchTerm}
              onChange={(e)=>setsearchTerm(e.target.value)}
              placeholder='search...'
              />
          <p>{debouncedTerm}</p>    




    </>
  )
}

export default DemoUseEffect