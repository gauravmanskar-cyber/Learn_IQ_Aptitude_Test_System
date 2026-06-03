import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import DemoUseState from './component/DemoUseState'
import DemoUseEffect from './component/DemoUseEffect'
import DemoUseRef from './component/DemoUseRef'
import { DemoUseDemo } from './component/DemoUseMemo'
import ChildComp from './component/ChildComp'
import { DemoUseCallback } from './component/DemoUseCallback'
import DemoUseContext from './component/DemoUseContext'
import DemoUseReduse from './component/DemoUseReduse'
import DemoUseReduce2 from './component/DemoUseReduce2'
import UseCounter from './component/UseCounter'
import { ChildX } from './component/ChildX'
import ChildY from './component/ChildY'

function App() {


  return (
    <>
      {/* <DemoUseState/> */}
      {/* <DemoUseEffect/> */}
      {/* <DemoUseRef/> */}
      {/* <DemoUseDemo/> */}
      {/* <DemoUseCallback/> */}
      {/* <DemoUseContext/> */}
      {/* <DemoUseReduse/> */}
      {/* <DemoUseReduce2/> */}

      {/* Custom Hook */}

      {/* <UseCounter/> */}
      <ChildX/><br/>
      <ChildY/>
    
    </>
  )
}

export default App
