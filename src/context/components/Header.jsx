import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthProvider'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { user, logout } = useAuth()
  const { t, i18n } = useTranslation('layout')
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }


  // Check if a route is active
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="bg-gradient-to-r from-[#567158] to-[#4a5d4b] shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/favicon.gif" 
              alt="MoodBite Kitchen Logo" 
              className="w-10 h-10 transition-shadow duration-200 bg-white rounded-full shadow-sm hover:shadow-md" 
            />
            <Link to="/" className="text-xl font-bold text-white transition-colors duration-200 hover:text-gray-100">
              {t('cookingBlog')}
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-1 md:flex">
            <Link 
              to="/recipes" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActiveRoute('/recipes') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('recipes')}
            </Link>
            <Link 
              to="/mood-suggestions" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActiveRoute('/mood-suggestions') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('moodSuggestions')}
            </Link>
            <Link 
              to="/smart-suggestions" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActiveRoute('/smart-suggestions') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('smartSuggestions')}
            </Link>
            <Link 
              to="/mood-science" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActiveRoute('/mood-science') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('science')}
            </Link>
            
            {/* Language Switcher */}
            <div className="flex items-center ml-6 space-x-1">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 text-sm rounded-md font-medium transition-all duration-200 ${
                  i18n.language === 'en' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('fr')}
                className={`px-3 py-1 text-sm rounded-md font-medium transition-all duration-200 ${
                  i18n.language === 'fr' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage('ar')}
                className={`px-3 py-1 text-sm rounded-md font-medium transition-all duration-200 ${
                  i18n.language === 'ar' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                عربي
              </button>
            </div>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center ml-6 space-x-2">
                <Link 
                  to="/favorites" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActiveRoute('/favorites') 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t('favorites')}
                </Link>
                {user.role === 'admin' && (
                  <Link 
                    to="/add-recipe" 
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActiveRoute('/add-recipe') 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {t('addRecipe')}
                </Link>
                )}
                <button
                  onClick={logout}
                  className="transition-all duration-200 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                  title={t('logout')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center ml-6 space-x-2">
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActiveRoute('/login') 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t('login')}
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-white text-[#567158] rounded-lg font-medium hover:bg-gray-100 transition-all duration-200"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white transition-all duration-200 rounded-lg md:hidden hover:text-white hover:bg-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="py-4 border-t md:hidden border-white/20">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/recipes" 
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveRoute('/recipes') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('recipes')}
              </Link>
              <Link 
                to="/mood-suggestions" 
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveRoute('/mood-suggestions') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('moodSuggestions')}
              </Link>
              <Link 
                to="/smart-suggestions" 
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveRoute('/smart-suggestions') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('smartSuggestions')}
              </Link>
              <Link 
                to="/mood-science" 
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActiveRoute('/mood-science') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('science')}
              </Link>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center pt-4 space-x-2 border-t border-white/20">
                <span className="text-sm text-white/80">{t('language')}:</span>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1 text-sm rounded-md font-medium transition-all duration-200 ${
                    i18n.language === 'en' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`px-3 py-1 text-sm rounded-md font-medium transition-all duration-200 ${
                    i18n.language === 'fr' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => changeLanguage('ar')}
                  className={`px-3 py-1 text-sm rounded-md font-medium transition-all duration-200 ${
                    i18n.language === 'ar' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  عربي
                </button>
              </div>

              {/* Mobile User Actions */}
              {user ? (
                <div className="flex flex-col pt-4 space-y-2 border-t border-white/20">
                  <Link 
                    to="/favorites" 
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActiveRoute('/favorites') 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('favorites')}
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      to="/add-recipe" 
                      className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActiveRoute('/add-recipe') 
                          ? 'bg-white/20 text-white' 
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('addRecipe')}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 transition-all duration-200 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                    title={t('logout')}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-medium">{t('logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col pt-4 space-y-2 border-t border-white/20">
                  <Link 
                    to="/login" 
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActiveRoute('/login') 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-3 bg-white text-[#567158] rounded-lg font-medium hover:bg-gray-100 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
          </nav>
        </div>
        )}
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="py-12 mt-16 text-white bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/favicon.gif" 
              alt="MoodBite Kitchen Logo" 
              className="w-12 h-12 rounded-full bg-white shadow-lg" 
            />
            <h3 className="text-2xl font-bold">MoodBite Kitchen</h3>
          </div>
          <p className="mb-4 text-gray-300">Cuisinez selon votre humeur, savourez avec passion</p>
          <p className="text-sm text-gray-400">&copy; 2025 MoodBite Kitchen. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export { Header, Footer }

