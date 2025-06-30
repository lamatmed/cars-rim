import React from 'react'

import Footer from '../components/Footer'
import { dummyCarData } from '../assets/assets'

const car = dummyCarData[0]

const CarDetails = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">{car.brand} {car.model}</h2>
        <img src={car.image} alt={car.brand + ' ' + car.model} className="w-full max-h-80 object-cover rounded-xl mb-8" />
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1 min-w-[220px]">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Description</h3>
            <p className="text-gray-600 text-base">{car.description}</p>
          </div>
          <div className="flex-1 min-w-[220px]">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Informations</h3>
            <ul className="text-base text-gray-700 space-y-1">
              <li><b>Année :</b> {car.year}</li>
              <li><b>Catégorie :</b> {car.category}</li>
              <li><b>Transmission :</b> {car.transmission}</li>
              <li><b>Carburant :</b> {car.fuel_type}</li>
              <li><b>Places :</b> {car.seating_capacity}</li>
              <li><b>Lieu :</b> {car.location}</li>
              <li><b>Prix/jour :</b> {car.pricePerDay} MRU</li>
              <li><b>Disponibilité :</b> {car.isAvaliable ? 'Oui' : 'Non'}</li>
            </ul>
          </div>
        </div>
        <button 
          className={`bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-3 font-semibold text-base mx-auto block transition-colors ${!car.isAvaliable ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300' : ''}`}
          disabled={!car.isAvaliable}
        >
          Réserver
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default CarDetails