// src/components/OwnerPromotion.jsx
import React from 'react';
import { assets } from '../assets/assets';


const OwnerPromotion = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Content */}
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full mb-4">
              <span className="font-medium">Pour propriétaires</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              <span className="block mb-2">Propriétaire d'une</span>
              <span className="text-blue-600">Voiture de Luxe ?</span>
            </h2>
            
            <p className="text-xl text-gray-700 font-medium">
              Générez des revenus facilement en louant votre véhicule sur Cars-Rim.
            </p>
            
            <p className="text-gray-600">
              Nous nous occupons de l'assurance, de la vérification des conducteurs et des paiements sécurisés — 
              vous pouvez ainsi gagner un revenu passif sans tracas.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                Proposer ma voiture
              </button>
              <button className="bg-white border-2 border-blue-600 text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-50">
                En savoir plus
              </button>
            </div>
            
            {/* Benefits grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <img src={assets.tick_icon} alt="Check" className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">Assurance incluse</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <img src={assets.tick_icon} alt="Check" className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">Vérification des conducteurs</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <img src={assets.tick_icon} alt="Check" className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">Paiements sécurisés</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <img src={assets.tick_icon} alt="Check" className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">Support 24/7</span>
              </div>
            </div>
          </div>
          
          {/* Image with banner effect */}
          <div className="md:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-8 border-white">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 rounded-2xl z-10"></div>
              <img 
                src={assets.banner_car_image} 
                alt="Luxury car" 
                className="w-full h-auto object-cover rounded-xl"
              />
              
              {/* Banner effect */}
              <div className="absolute top-6 right-0 bg-blue-600 text-white py-2 px-6 rounded-l-lg shadow-lg z-20">
                <span className="font-bold">Jusqu'à 20000MRU/mois</span>
              </div>
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 z-10">
                <div className="flex justify-between text-white">
                  <div className="text-center">
                    <p className="text-xl font-bold">4.8/5</p>
                    <p className="text-sm text-blue-200">Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">MRU 1250+</p>
                    <p className="text-sm text-blue-200">Revenu moyen</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">95%</p>
                    <p className="text-sm text-blue-200">Voitures louées</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating testimonials */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 w-64 z-20">
              <div className="flex items-center">
                <img 
                  src={assets.user_profile} 
                  alt="User" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold text-sm">Mohamed Ahmed</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <img 
                        key={i} 
                        src={assets.star_icon} 
                        alt="Star" 
                        className="w-4 h-4"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 italic">"J'ai gagné 150,000MRU en un an!"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerPromotion;