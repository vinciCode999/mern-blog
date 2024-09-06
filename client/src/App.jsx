import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { About, Dashboard, Projects, Home, Signin, Signup } from './pages'
import { Header, FooterComponent, PrivateRoute } from './layouts'

function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="*" element={<h1>page not found!!!</h1>}/>
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
  )
}

export default App