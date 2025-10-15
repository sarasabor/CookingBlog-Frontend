import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthProvider'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Cooking Blog
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link to="/recipes" className="text-gray-600 hover:text-gray-900">
              Recipes
            </Link>
            <Link to="/mood-suggestions" className="text-gray-600 hover:text-gray-900">
              By Mood
            </Link>
            <Link to="/smart-suggestions" className="text-gray-600 hover:text-gray-900">
              Smart Search
            </Link>
            <Link to="/mood-science" className="text-gray-600 hover:text-gray-900">
              Science
            </Link>
            {user ? (
              <>
                <Link to="/favorites" className="text-gray-600 hover:text-gray-900">
                  Favorites
                </Link>
                <Link to="/add-recipe" className="text-gray-600 hover:text-gray-900">
                  Add Recipe
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
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

