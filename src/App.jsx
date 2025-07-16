import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import { ToastContainer } from 'react-toastify'
import { authContext } from './ContextApi/Context'

const App = () => {
  const {authStatus} = useContext(authContext);
  return (
    <main className='flex flex-col h-[100vh]'>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/authentication' element={<Auth/>}/>
        <Route path='/dashboard' element={authStatus ? <Dashboard/> : <Auth/>}/>
        <Route path='/projects' element={authStatus ? <Projects/> : <Auth/>}/>
      </Routes>
      <ToastContainer/>
    </main>
  )
}

export default App
