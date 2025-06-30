import React from 'react'
import { assets, dummyCarData } from '../assets/assets'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Cars = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Nos Voitures Disponibles</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dummyCarData.map(car => (
            <div key={car._id} className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden hover:scale-[1.02] transition-transform">
              <img src={car.image} alt={car.brand + ' ' + car.model} className="w-full h-44 object-cover" />
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{car.brand} {car.model}</h3>
                  <p className="text-gray-500 text-sm mb-2">{car.year} • {car.category}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <img src={assets.location_icon} alt="Lieu" className="w-5 h-5" />
                    <span className="text-sm text-gray-700">{car.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src={assets.fuel_icon} alt="Carburant" className="w-5 h-5" />
                    <span className="text-sm text-gray-700">{car.fuel_type}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src={assets.car_icon} alt="Places" className="w-5 h-5" />
                    <span className="text-sm text-gray-700">{car.seating_capacity} places</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-blue-600 text-lg">{car.pricePerDay} MRU <span className="font-normal text-sm text-gray-500">/jour</span></span>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-semibold text-sm transition-colors"
                    onClick={() => navigate(`/car-details/${car._id}`)}
                  >
                    Voir détails
                  </button>
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

export default Cars