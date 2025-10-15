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

  // Cooking pot icon component
  const CookingPotIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pot body */}
      <path d="M6 8C6 6.89543 6.89543 6 8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
      {/* Pot handles */}
      <path d="M4 10C4 9.44772 4.44772 9 5 9C5.55228 9 6 9.44772 6 10V14C6 14.5523 5.55228 15 5 15C4.44772 15 4 14.5523 4 14V10Z" fill="currentColor"/>
      <path d="M18 10C18 9.44772 18.4477 9 19 9C19.5523 9 20 9.44772 20 10V14C20 14.5523 19.5523 15 19 15C18.4477 15 18 14.5523 18 14V10Z" fill="currentColor"/>
      {/* Steam */}
      <path d="M10 4C10 3.44772 10.4477 3 11 3C11.5523 3 12 3.44772 12 4C12 4.55228 11.5523 5 11 5C10.4477 5 10 4.55228 10 4Z" fill="currentColor"/>
      <path d="M13 2C13 1.44772 13.4477 1 14 1C14.5523 1 15 1.44772 15 2C15 2.55228 14.5523 3 14 3C13.4477 3 13 2.55228 13 2Z" fill="currentColor"/>
      {/* Face */}
      <circle cx="9" cy="11" r="0.8" fill="white"/>
      <circle cx="15" cy="11" r="0.8" fill="white"/>
      <path d="M10 13C10 12.4477 10.4477 12 11 12H13C13.5523 12 14 12.4477 14 13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13Z" fill="white"/>
    </svg>
  )

  // Check if a route is active
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="bg-[#567158] shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <CookingPotIcon className="w-8 h-8 text-white" />
            <Link to="/" className="text-xl font-bold text-white hover:text-gray-200 transition-colors">
              {t('cookingBlog')}
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
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
            <div className="flex items-center space-x-1 ml-6">
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
              <div className="flex items-center space-x-2 ml-6">
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
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  title={t('logout')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-6">
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
            className="md:hidden p-2 rounded-lg text-white hover:text-white hover:bg-white/10 transition-all duration-200"
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
          <div className="md:hidden border-t border-white/20 py-4">
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
              <div className="flex items-center space-x-2 pt-4 border-t border-white/20">
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
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
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
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                    title={t('logout')}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-medium">{t('logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
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
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p>&copy; 2025 MoodBite Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export { Header, Footer }

