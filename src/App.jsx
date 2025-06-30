import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import CarDetails from './pages/CarDetails'
import OwnerPage from './pages/OwnerPage'

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
       </Routes>
      </>
  )
}

export default App