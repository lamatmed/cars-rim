// src/pages/TestimonialsPage.jsx
import React from 'react';
import { assets } from '../assets/assets';

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Fatimetou Ahmed",
      location: "Nouakchott, Mauritanie",
      quote: "J'ai loué des voitures auprès de diverses entreprises, mais l'expérience avec Cars-Rim a été exceptionnelle. Le processus était fluide et le véhicule a dépassé mes attentes.",
      image: assets.testimonial_image_1
    },
    {
      id: 2,
      name: "Mohamed Ould Brahim",
      location: "Nouadhibou, Mauritanie",
      quote: "Cars-Rim a rendu mon voyage tellement plus facile. La voiture a été livrée directement à ma porte, et le service client était fantastique ! Je vais certainement utiliser à nouveau leurs services.",
      image: assets.user_profile
    },
    {
      id: 3,
      name: "Aichetou Abdallahi",
      location: "Atar, Mauritanie",
      quote: "Je recommande vivement Cars-Rim ! Leur parc automobile est impressionnant, et j'ai toujours l'impression d'avoir la meilleure offre avec un excellent service.",
      image: assets.testimonial_image_2
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Section Principale */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Ce que disent nos <span className="text-yellow-300">clients</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-100">
            Découvrez pourquoi les voyageurs exigeants choisissent Cars-Rim pour leurs locations de voitures de luxe en Mauritanie
          </p>
          <div className="mt-8">
            <div className="inline-flex items-center bg-blue-500 px-4 py-2 rounded-full">
              <img src={assets.star_icon} alt="Étoile" className="w-6 h-6 mr-1" />
              <span className="font-bold">4.9/5</span>
              <span className="ml-2">basé sur 1 286 avis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grille de Témoignages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Barre décorative en haut */}
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                
                <div className="p-8">
                  <div className="flex justify-center -mt-16 mb-6">
                    <div className="relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                        <img 
                          src={assets.star_icon} 
                          alt="Étoile" 
                          className="w-5 h-5"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {testimonial.location}
                  </p>
                  
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <img 
                        key={i} 
                        src={assets.star_icon} 
                        alt="Étoile" 
                        className="w-6 h-6 mx-1"
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 italic text-center">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                {/* Motif décoratif en bas */}
                <div className="bg-gray-50 p-4">
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="p-6">
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-blue-200">Clients Satisfaits</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold mb-2">95%</p>
              <p className="text-blue-200">Retours Positifs</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold mb-2">4</p>
              <p className="text-blue-200">Villes en Mauritanie</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-blue-200">Support Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages Supplémentaires */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plus d'<span className="text-blue-600">histoires de clients</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lisez les expériences de nos clients à travers la Mauritanie
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center">
                <img 
                  src={assets.user_profile} 
                  alt="Client" 
                  className="w-20 h-20 rounded-full mb-4 md:mb-0 md:mr-6 object-cover"
                />
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="text-xl font-bold">Sidi Mohamed</h3>
                      <p className="text-gray-600">Kiffa, Mauritanie</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <img 
                          key={i} 
                          src={assets.star_icon} 
                          alt="Étoile" 
                          className="w-5 h-5"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "La collection de voitures de luxe chez Cars-Rim est inégalée. J'ai loué un SUV pour mon voyage d'affaires et tout le processus s'est déroulé sans accroc."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center">
                <img 
                  src={assets.testimonial_image_1} 
                  alt="Client" 
                  className="w-20 h-20 rounded-full mb-4 md:mb-0 md:mr-6 object-cover"
                />
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="text-xl font-bold">Mariem mint Ely</h3>
                      <p className="text-gray-600">Rosso, Mauritanie</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <img 
                          key={i} 
                          src={assets.star_icon} 
                          alt="Étoile" 
                          className="w-5 h-5"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "J'utilise Cars-Rim pour tous mes besoins en voitures de luxe depuis deux ans. Leur service est constamment excellent et leurs véhicules sont toujours en parfait état."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Appel à l'action */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à vivre le luxe ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Rejoignez des milliers de clients satisfaits qui font confiance à Cars-Rim pour leurs besoins de location de voitures haut de gamme
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300">
              Réservez votre voiture maintenant
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300">
              Voir notre parc automobile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;