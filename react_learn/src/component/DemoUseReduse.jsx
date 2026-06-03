import React, { useReducer } from 'react'

const DemoUseReduse = () => {

    const intialState = {
        count:0
    }

    const redeucerfn = (state,action)=>{
        console.log(state,"state");
        console.log(action,"action");

        switch(action.type){
            case "Increment":
                return {count : state.count + 1}
            case "Decrement":
                return {count : state.count - 1}
            case "Reset":
                return {count : 0}
            default :
            return state

        }

    }
    const[state,dispatch] = useReducer(redeucerfn,intialState);
  return (
    <>
        <button onClick={()=>dispatch({type:"Increment"})}>Increment</button>
        <button onClick={()=>dispatch({type:"Decrement"})}>Decrement</button>
        <button onClick={()=>dispatch({type:"Reset"})}>Reset</button>
        {state.count}
    </>
  )
}

export default DemoUseReduse