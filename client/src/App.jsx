import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { About, Dashboard, Projects, Home, Signin, Signup } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signin" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App