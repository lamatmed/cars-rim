import React, { useState } from 'react';
import { assets, dummyCarData, dummyMyBookingsData, ownerMenuLinks } from '../assets/assets';

const getDashboardData = () => {
  const totalCars = dummyCarData.length;
  const totalBookings = dummyMyBookingsData.length;
  const pendingBookings = dummyMyBookingsData.filter(b => b.status === 'en attente' || b.status === 'pending').length;
  const completedBookings = dummyMyBookingsData.filter(b => b.status === 'confirmée' || b.status === 'confirmed').length;
  // Trier par date de création décroissante et prendre les 5 plus récentes
  const recentBookings = [...dummyMyBookingsData]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  // Revenu mensuel (somme des prix des réservations du mois courant)
  const now = new Date();
  const monthlyRevenue = dummyMyBookingsData.filter(b => {
    const d = new Date(b.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((sum, b) => sum + (b.price || 0), 0);
  return { totalCars, totalBookings, pendingBookings, completedBookings, recentBookings, monthlyRevenue };
};

const OwnerPage = () => {
  const dashboard = getDashboardData();
  // Récupérer l'utilisateur connecté depuis localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Formulaire d'ajout de voiture (admin seulement)
  const [carForm, setCarForm] = useState({
    brand: '', model: '', year: '', category: '', seating_capacity: '', fuel_type: '', transmission: '', pricePerDay: '', location: '', description: '', image: ''
  });
  const [carError, setCarError] = useState('');
  const [carSuccess, setCarSuccess] = useState('');
  const [showCarForm, setShowCarForm] = useState(false);

  const handleCarChange = e => setCarForm({ ...carForm, [e.target.name]: e.target.value });

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    setCarError('');
    setCarSuccess('');
    try {
      const api = import.meta.env.VITE_API;
      const res = await fetch(`${api}/api/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...carForm, owner: user._id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setCarSuccess('Voiture ajoutée avec succès !');
      setCarForm({ brand: '', model: '', year: '', category: '', seating_capacity: '', fuel_type: '', transmission: '', pricePerDay: '', location: '', description: '', image: '' });
      setShowCarForm(false);
    } catch (err) {
      setCarError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar / Topbar Responsive */}
      <aside className="w-full md:w-64 bg-white shadow-lg flex md:flex-col flex-row items-center md:items-stretch py-4 md:py-8 px-2 md:px-4 z-20">
        <div className="flex justify-center md:justify-start items-center w-full md:mb-10 mb-0">
          <a href="/" className="block w-full">
            <img src={assets.logo} alt="Logo" className="mx-auto md:mx-0 h-16 md:h-20 max-w-xs object-contain" style={{maxWidth:'160px'}} />
          </a>
        </div>
        <nav className="flex-1 w-full">
          <ul className="flex md:flex-col flex-row md:space-y-4 space-y-0 md:space-x-0 space-x-2 justify-center md:justify-start items-center md:items-stretch mt-2 md:mt-0">
            {ownerMenuLinks.map(link => (
              <li key={link.name} className="flex items-center text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg px-3 py-2 cursor-pointer">
                <img src={link.coloredIcon} alt={link.name} className="w-5 h-5 mr-3" />
                <span className="hidden md:inline">{link.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenue{user ? `, ${user.firstName} ${user.lastName}` : ''}
          {user && user.role === 'admin' && (
            <span className="ml-3 px-3 py-1 rounded bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-sm font-bold align-middle">Admin</span>
          )}
        </h1>
        <p className="text-gray-600 mb-8">Tableau de bord {user && user.role === 'admin' ? 'administrateur' : 'propriétaire'}</p>

        {/* Bouton et formulaire d'ajout de voiture (admin seulement) */}
        {user && user.role === 'admin' ? (
          <>
            <button
              className="btn-primary mb-4"
              onClick={() => setShowCarForm(v => !v)}
            >
              {showCarForm ? 'Fermer le formulaire' : 'Ajouter une voiture'}
            </button>
            {showCarForm && (
              <form onSubmit={handleCarSubmit} className="bg-white rounded-xl shadow p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Ajouter une voiture</h2>
                {carError && <div className="text-red-500 mb-2">{carError}</div>}
                {carSuccess && <div className="text-green-600 mb-2">{carSuccess}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="brand" placeholder="Marque" value={carForm.brand} onChange={handleCarChange} className="input" required />
                  <input name="model" placeholder="Modèle" value={carForm.model} onChange={handleCarChange} className="input" required />
                  <input name="year" type="number" placeholder="Année" value={carForm.year} onChange={handleCarChange} className="input" required />
                  <input name="category" placeholder="Catégorie" value={carForm.category} onChange={handleCarChange} className="input" />
                  <input name="seating_capacity" type="number" placeholder="Places" value={carForm.seating_capacity} onChange={handleCarChange} className="input" />
                  <input name="fuel_type" placeholder="Carburant" value={carForm.fuel_type} onChange={handleCarChange} className="input" />
                  <input name="transmission" placeholder="Transmission" value={carForm.transmission} onChange={handleCarChange} className="input" />
                  <input name="pricePerDay" type="number" placeholder="Prix/jour" value={carForm.pricePerDay} onChange={handleCarChange} className="input" required />
                  <input name="location" placeholder="Ville" value={carForm.location} onChange={handleCarChange} className="input" />
                  <input name="image" placeholder="URL image" value={carForm.image} onChange={handleCarChange} className="input" />
                </div>
                <textarea name="description" placeholder="Description" value={carForm.description} onChange={handleCarChange} className="input mt-4" />
                <button type="submit" className="btn-primary mt-4">Ajouter</button>
              </form>
            )}
          </>
        ) : (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-8 font-semibold text-center">
            Vous n'êtes pas autorisé à ajouter une voiture.
          </div>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col items-center">
            <img src={assets.carIconColored} alt="Total voitures" className="w-8 h-8 mb-2" />
            <p className="text-2xl font-bold">{dashboard.totalCars}</p>
            <p className="text-gray-500 text-center text-xs md:text-base">Total voitures</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col items-center">
            <img src={assets.listIconColored} alt="Total réservations" className="w-8 h-8 mb-2" />
            <p className="text-2xl font-bold">{dashboard.totalBookings}</p>
            <p className="text-gray-500 text-center text-xs md:text-base">Total réservations</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col items-center">
            <img src={assets.cautionIconColored} alt="En attente" className="w-8 h-8 mb-2" />
            <p className="text-2xl font-bold">{dashboard.pendingBookings}</p>
            <p className="text-gray-500 text-center text-xs md:text-base">En attente</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col items-center">
            <img src={assets.check_icon} alt="Confirmées" className="w-8 h-8 mb-2" />
            <p className="text-2xl font-bold">{dashboard.completedBookings}</p>
            <p className="text-gray-500 text-center text-xs md:text-base">Confirmées</p>
          </div>
        </div>

        {/* Réservations récentes & Revenu mensuel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Réservations récentes */}
          <div className="md:col-span-2 bg-white rounded-xl shadow p-6 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Réservations récentes</h2>
            {dashboard.recentBookings.length === 0 ? (
              <div className="text-gray-500 text-center py-8">Aucune réservation récente</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">Voiture</th>
                    <th className="py-2 pr-4">Client</th>
                    <th className="py-2 pr-4">Dates</th>
                    <th className="py-2 pr-4">Statut</th>
                    <th className="py-2 pr-4">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.recentBookings.map(b => (
                    <tr key={b._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 pr-4 flex items-center">
                        <img src={b.car.image} alt={b.car.model} className="w-10 h-8 object-cover rounded mr-2" />
                        <span>{b.car.brand} {b.car.model}</span>
                      </td>
                      <td className="py-2 pr-4">{b.user}</td>
                      <td className="py-2 pr-4">
                        {new Date(b.pickupDate).toLocaleDateString()}<br/>
                        {new Date(b.returnDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 pr-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${b.status === 'confirmée' || b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'en attente' || b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{b.status}</span>
                      </td>
                      <td className="py-2 pr-4">MRU{b.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* Revenu mensuel */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">Revenu mensuel</h2>
            <p className="text-4xl font-bold text-blue-700 mb-2">MRU{dashboard.monthlyRevenue}</p>
            <p className="text-gray-500">Revenu pour le mois en cours</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerPage;
