import React from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import Footer from '../components/Footer'

const MyBookings = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Mes Réservations</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {dummyMyBookingsData.map(booking => (
            <div key={booking._id} className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
              <img src={booking.car.image} alt={booking.car.brand + ' ' + booking.car.model} className="w-full h-40 object-cover" />
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{booking.car.brand} {booking.car.model}</h3>
                  <p className="text-gray-500 text-sm mb-2">{booking.car.year} • {booking.car.category}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <img src={assets.location_icon} alt="Lieu" className="w-5 h-5" />
                    <span className="text-sm text-gray-700">{booking.car.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src={assets.calendar_icon_colored} alt="Date" className="w-5 h-5" />
                    <span className="text-sm text-gray-700">Du {new Date(booking.pickupDate).toLocaleDateString()} au {new Date(booking.returnDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src={assets.check_icon} alt="Statut" className="w-5 h-5" />
                    <span className="text-sm text-gray-700">{booking.status}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-blue-600 text-lg">{booking.price} MRU</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-semibold text-sm transition-colors">Détails</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyBookings