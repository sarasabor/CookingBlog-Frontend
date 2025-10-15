import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthProvider'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { user, logout } = useAuth()
  const { i18n } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-[#567158] hover:text-[#4a5d4b] transition-colors">
              Cooking Blog
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/recipes" className="text-gray-600 hover:text-[#567158] font-medium transition-colors">
              Recipes
            </Link>
            <Link to="/mood-suggestions" className="text-gray-600 hover:text-[#567158] font-medium transition-colors">
              By Mood
            </Link>
            <Link to="/smart-suggestions" className="text-gray-600 hover:text-[#567158] font-medium transition-colors">
              Smart Search
            </Link>
            <Link to="/mood-science" className="text-gray-600 hover:text-[#567158] font-medium transition-colors">
              Science
            </Link>
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 ml-4">
              <button
                onClick={() => changeLanguage('en')}
                className={`lang-btn ${i18n.language === 'en' ? 'lang-btn-active' : 'lang-btn-inactive'}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('fr')}
                className={`lang-btn ${i18n.language === 'fr' ? 'lang-btn-active' : 'lang-btn-inactive'}`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage('ar')}
                className={`lang-btn ${i18n.language === 'ar' ? 'lang-btn-active' : 'lang-btn-inactive'}`}
              >
                عربي
              </button>
            </div>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link to="/favorites" className="text-gray-600 hover:text-[#567158] font-medium transition-colors">
                  Favorites
                </Link>
                {user.role === 'admin' && (
                  <Link to="/add-recipe" className="text-gray-600 hover:text-[#567158] font-medium transition-colors">
                    Add Recipe
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-[#567158] hover:text-[#4a5d4b] hover:bg-[#567158]/10 transition-all duration-200"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link to="/login" className="text-gray-600 hover:text-[#567158] font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-small">
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-[#567158] hover:bg-gray-100"
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
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/recipes" 
                className="text-gray-600 hover:text-[#567158] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Recipes
              </Link>
              <Link 
                to="/mood-suggestions" 
                className="text-gray-600 hover:text-[#567158] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                By Mood
              </Link>
              <Link 
                to="/smart-suggestions" 
                className="text-gray-600 hover:text-[#567158] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Smart Search
              </Link>
              <Link 
                to="/mood-science" 
                className="text-gray-600 hover:text-[#567158] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Science
              </Link>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-500">Language:</span>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`lang-btn ${i18n.language === 'en' ? 'lang-btn-active' : 'lang-btn-inactive'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`lang-btn ${i18n.language === 'fr' ? 'lang-btn-active' : 'lang-btn-inactive'}`}
                >
                  FR
                </button>
                <button
                  onClick={() => changeLanguage('ar')}
                  className={`lang-btn ${i18n.language === 'ar' ? 'lang-btn-active' : 'lang-btn-inactive'}`}
                >
                  عربي
                </button>
              </div>

              {/* Mobile User Actions */}
              {user ? (
                <div className="flex flex-col space-y-3 pt-2 border-t border-gray-200">
                  <Link 
                    to="/favorites" 
                    className="text-gray-600 hover:text-[#567158] font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Favorites
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      to="/add-recipe" 
                      className="text-gray-600 hover:text-[#567158] font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Add Recipe
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 p-2 rounded-lg text-[#567158] hover:text-[#4a5d4b] hover:bg-[#567158]/10 transition-all duration-200 w-fit"
                    title="Logout"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-2 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-[#567158] font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn-small w-fit"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
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
          <p>&copy; 2025 Cooking Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export { Header, Footer }

