import React, { useContext } from 'react'
// import {data} from './DemoUseContext'
import { UserContext } from './Context/UserContext'
import { ThemeContext } from './Context/ThemeContext';

const ChlildC = () => {
    // const user= useContext(data);
    const user = useContext(UserContext);
    const theme = useContext(ThemeContext)
  return (
   <>
     {/* <h1>My name is {user.name} and city is{user.city}</h1> */}

     <h2>My name is {user.name} and city is {user.city}</h2>
     <h3>my age is {theme}</h3>

   </>
  )
}

export default ChlildC