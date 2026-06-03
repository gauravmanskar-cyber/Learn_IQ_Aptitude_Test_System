
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Home } from './components/Home'
import { Navbar } from './components/Navbar'
import { SignIn } from './components/SignIn'

function App() {
 

  return (
    <>
      <div className="bg-[url(/src/assets/Image.png)] bg-cover bg-center bg-no-repeat min-h-screen w-full"> 
        <Navbar/>
        <Home/>
        <About/>
        <Contact/>
        <Routes>
          <Route path='/signin' element={<SignIn/>}/>
          {/* <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/> */}
        </Routes>
      </div>
    </>
  )
}

export default App
