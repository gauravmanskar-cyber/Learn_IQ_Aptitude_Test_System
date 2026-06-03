import React, { useReducer } from 'react'

const DemoUseReduce2 = () => {
    const intialState = {
        name:"",
        email:"",
        password:""
     }

     const reducer = (state,action)=>{
            switch(action.type){
                case "Update_Form":
                    return {...state,
                        [action.payload.field]:action.payload.value}
                case "Reset_Form":
                    return intialState
                default: 
                return state
            }
     }

    const[state,dispatch] = useReducer(reducer,intialState)

    const handleChange = (e)=>{
            dispatch({
                type:"Update_Form",
                payload:{
                    field:e.target.name,
                    value:e.target.value

                }
            })
    }

    const handleClick = ()=>{
        dispatch({
            type:"Reset_Form"
        })

    }
  return (
    <>
       <input type='text' placeholder='Enter name...' name='name' value={state.name}  onChange={handleChange}/>
       <input type='email' placeholder='Enter name...' name='email' value={state.email} onChange={handleChange}/>
       <input type='password' placeholder='Enter name...' name='password' value={state.password} onChange={handleChange}/>
       <button onClick={handleClick}>Reset</button>

    </>
  )
}

export default DemoUseReduce2