import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header, Footer } from '../context/components/Header'

const Layout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Hide AI button on AI Chef page itself
  const showAIButton = location.pathname !== '/ai-chef'
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      
      {/* Floating AI Chef Button */}
      {showAIButton && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/ai-chef')}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 group"
          title="AI Chef Assistant"
        >
          <div className="relative">
            {/* Button content */}
            <div className="flex items-center gap-3 px-6 py-4">
              <span className="text-3xl">🤖</span>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-sm">AI Chef</div>
                <div className="text-xs opacity-90">Ask me anything!</div>
              </div>
            </div>
            
            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20"></span>
          </div>
        </motion.button>
      )}
    </div>
  )
}

export default Layout