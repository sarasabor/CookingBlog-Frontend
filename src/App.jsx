import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import Layout from './Layouts/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Recipes from './pages/Recipes'
import RecipeDetails from './pages/RecipeDetails'
import AddRecipe from './pages/AddRecipe'
import Favorites from './pages/Favorites'
import MoodScience from './pages/MoodScience'
import MoodSuggestions from './pages/MoodSuggestions'
import SmartSuggestions from './pages/SmartSuggestions'
import ProtectedRoute from './context/components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/add-recipe" element={
              <ProtectedRoute>
                <AddRecipe />
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } />
            <Route path="/mood-science" element={<MoodScience />} />
            <Route path="/mood-suggestions" element={<MoodSuggestions />} />
            <Route path="/smart-suggestions" element={<SmartSuggestions />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

