import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import NavBar from './components/navBar/NavBar'
import Login from './components/login/Login'
import Home from './components/home/Home'
import Register from './components/register/Register'
import Reservation from './components/reservation/Reservation'
import ErrorNotFound from './components/errorNotFound/ErrorNotFound'
import Sales from './components/sales/Sales'
import AboutUs from './components/aboutUs/aboutUs' 


function App() {

  return (    
    <div>

      <NavBar/>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/aboutUs' element={<AboutUs/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/reservation' element={<Reservation/>} />
          <Route path='/sales' element={<Sales/>} />
          <Route path='*' element={<ErrorNotFound />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
