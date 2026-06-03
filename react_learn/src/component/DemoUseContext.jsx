import React, { createContext } from 'react'
import ChildA from './ChildA'
import { UserContext } from './Context/UserContext'
import { ThemeContext } from './Context/ThemeContext'


//Create, Provider, useContext

// export const data = createContext();
const DemoUseContext = () => {

  // const name = "Gaurav";
  // const city = "Pune";     
  
  const user = {
    name : "Gaurav",
    city : "Pune"

  }

  const Age = "21"; 

  return (
    <>
      {/* <data.Provider value={{user}}>
      <ChildA/>
      </data.Provider> */}

      <UserContext value={user}>
        <ThemeContext value={Age}>
          <ChildA/>
        </ThemeContext>
      </UserContext>
    </>
  )
}

export default DemoUseContext