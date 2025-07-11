import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import CarDetails from './pages/CarDetails'
import OwnerPage from './pages/OwnerPage'
import Login from './pages/Login'
import SignUpPage from './pages/SignUp'

const App = () => {
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>
       {!isOwnerPath && <Navbar/>}
       <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path='/cars' element={<Cars/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
           <Route path='/car-details/:id' element={<CarDetails/>}/>
            <Route path='/owner' element={<OwnerPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/sign-up' element={<SignUpPage/>}/>
       </Routes>
      </>
  )
}

export default App