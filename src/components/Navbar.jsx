import React, { useState, useEffect } from 'react';
import { assets, menuLinks } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiUser, FiLogOut, FiLogIn, FiGrid } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion simulé
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Simulation d'authentification - à remplacer par votre logique réelle
  useEffect(() => {
    // Vérifier si un token existe dans le localStorage
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogin = () => {
    // Simuler une connexion
    localStorage.setItem('authToken', 'simulated_token');
    setIsLoggedIn(true);
    setUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleLogout = () => {
    // Simuler une déconnexion
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  // Fermer les menus quand on redimensionne
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img 
                src={assets.logo} 
                alt="logo" 
                className="h-8 w-auto transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Champ de recherche - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className={`flex items-center border rounded-full overflow-hidden transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                <button 
                  type="submit"
                  className="h-10 w-12 flex items-center justify-center text-gray-500 hover:text-indigo-600"
                >
                  <FiSearch size={18} />
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Rechercher..."
                  className="w-full h-10 py-2 pr-4 text-gray-700 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mr-3 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-7">
            {menuLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 px-1 py-2"
              >
                {link.name}
              </Link>
            ))}
            
            {/* État utilisateur - Desktop */}
            {isLoggedIn ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                    <FiUser className="text-gray-600" />
                  </div>
                </button>
                
                {/* Menu déroulant utilisateur */}
                {userMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <Link
                      to="/owner"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiGrid className="mr-2" />
                      Tableau de bord
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
              >
                <FiLogIn className="mr-1.5" />
                Connexion
              </button>
            )}
          </div>

          {/* Boutons mobiles */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Bouton recherche mobile */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Rechercher"
            >
              <FiSearch size={20} />
            </button>
            
            {/* Bouton utilisateur/connexion mobile */}
            {isLoggedIn ? (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Menu utilisateur"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6 flex items-center justify-center">
                  <FiUser className="text-gray-600 text-sm" />
                </div>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Connexion"
              >
                <FiLogIn size={20} />
              </button>
            )}
            
            {/* Bouton menu hamburger */}
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Menu principal"
            >
              {isMenuOpen ? (
                <FiX size={24} />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="px-4 py-3 bg-white shadow-lg">
          {/* Champ de recherche mobile */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button 
                type="submit"
                className="h-10 w-12 flex items-center justify-center text-gray-500"
              >
                <FiSearch size={18} />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-full h-10 py-2 pr-4 text-gray-700 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mr-3 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Liens mobile */}
          <div className="space-y-1 mb-4">
            {menuLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path}
                className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Section utilisateur mobile */}
          <div className="border-t pt-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/owner"
                  className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiGrid className="mr-3" />
                  Tableau de bord
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  <FiLogOut className="mr-3" />
                  Déconnexion
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                <FiLogIn className="mr-3" />
                Connexion
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;