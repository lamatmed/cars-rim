import React, { useState, useEffect } from 'react';
import { assets, menuLinks } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiUser, FiLogOut, FiLogIn, FiGrid } from 'react-icons/fi';
import { SignIn, SignUp, useUser, useClerk } from '@clerk/clerk-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };



  const handleRegister = () => {
    setShowSignUp(true);
    setUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    signOut();
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
            {user ? (
              <div className="relative ml-3 flex items-center">
                <img src={user.imageUrl} alt="avatar" className="w-8 h-8 rounded-full border-2 border-indigo-500" />
                <span className="ml-2 font-medium text-gray-800">{user.firstName}</span>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none ml-2"
                >
                  <FiUser className="text-gray-600" />
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
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
                >
                  <FiLogIn className="mr-1.5" />
                  Connexion
                </button>
               
              </>
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
            {user ? (
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
                onClick={() => navigate('/login')}
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
            {user ? (
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
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  <FiLogIn className="mr-3" />
                  Connexion
                </button>
                <button
                  onClick={handleRegister}
                  className="ml-2 w-full flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  S'inscrire
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Clerk Modals */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="bg-white rounded-xl shadow-lg p-6 relative flex items-center justify-center w-[380px] min-h-[480px] max-w-full"
            style={{ minWidth: 380, minHeight: 480 }}
          >
            <button onClick={() => setShowSignIn(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <SignIn
              routing="virtual"
              path="/sign-in"
              afterSignInUrl="/"
              afterSignUpUrl="/"
              signUpUrl="#"
              appearance={{
                elements: {
                  footerAction: {
                    cursor: 'pointer',
                  },
                  card: {
                    minWidth: '340px',
                    minHeight: '420px',
                  },
                },
              }}
              footerAction={() => (
                <div className="text-center mt-4 text-sm">
                  Pas de compte ?{' '}
                  <span
                    className="text-indigo-600 hover:underline cursor-pointer"
                    onClick={() => {
                      setShowSignIn(false);
                      setShowSignUp(true);
                    }}
                  >
                    S'inscrire
                  </span>
                </div>
              )}
            />
          </div>
        </div>
      )}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="bg-white rounded-xl shadow-lg p-6 relative flex items-center justify-center w-[380px] min-h-[480px] max-w-full"
            style={{ minWidth: 380, minHeight: 480 }}
          >
            <button onClick={() => setShowSignUp(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <SignUp routing="virtual" path="/sign-up" afterSignUpUrl="/"
              appearance={{
                elements: {
                  card: {
                    minWidth: '340px',
                    minHeight: '420px',
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;