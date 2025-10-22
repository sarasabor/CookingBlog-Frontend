import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

function AIChef() {
  const { t, i18n } = useTranslation("smartSuggestions");
  const lang = i18n.language;

  const [chatHistory, setChatHistory] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Helper to generate UNIQUE food images
  const generateRecipeImage = (recipeName, recipeId) => {
    const keywords = recipeName
      .toLowerCase()
      .replace(/\b(recipe|dish|meal|food|with|and|the)\b/gi, '')
      .trim()
      .split(' ')
      .filter(word => word.length > 3)
      .slice(0, 3)
      .join(',');
    
    const uniqueId = `${Date.now()}-${recipeId}`;
    const seed = uniqueId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    return `https://source.unsplash.com/800x600/?${keywords},food,cuisine&sig=${seed}`;
  };

  const handleSendMessage = async () => {
    if (!currentPrompt.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentPrompt,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setCurrentPrompt("");
    setIsLoading(true);

    try {
      const res = await api.post("/recipes/ai-suggestions", {
        prompt: currentPrompt,
        servings: 2,
      }, {
        headers: {
          "Accept-Language": lang,
        },
      });

      // Add AI response to chat with images
      const recipesWithImages = (res.data.recipes || []).map(recipe => ({
        ...recipe,
        image: generateRecipeImage(
          recipe.title?.en || recipe.title?.fr || recipe.title?.ar || "delicious food",
          recipe._id
        )
      }));

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: res.data.message || "",
        recipes: recipesWithImages,
        timestamp: new Date().toISOString()
      };

      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("❌ Error fetching AI suggestions:", err);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: t("aiError") || "Sorry, I couldn't process your request. Please try again!",
        recipes: [],
        timestamp: new Date().toISOString()
      };

      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setCurrentPrompt("");
  };

  const examplePrompts = [
    t("aiExample1") || "I want a comforting meal",
    t("aiExample2") || "Quick and easy dinner for 2",
    t("aiExample3") || "Healthy vegetarian dish"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <span className="text-3xl">🤖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Chef Assistant</h1>
                <p className="text-purple-100 text-xs">
                  {t("aiAssistantDescription") || "Votre compagnon culinaire IA"}
                </p>
              </div>
            </div>
            {chatHistory.length > 0 && (
              <button
                onClick={clearChat}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg font-medium transition-all text-sm"
              >
                {t("aiClearChat") || "Effacer"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Chat Area - Full Width */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl h-[calc(100vh-240px)] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chatHistory.length === 0 ? (
                  // Welcome Screen
                  <div className="flex flex-col items-center justify-center h-full text-center px-4">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full p-6 mb-4">
                      <span className="text-5xl">👨‍🍳</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Bienvenue chez AI Chef!
                    </h2>
                    <p className="text-gray-600 max-w-lg mb-6 text-sm">
                      Posez-moi n'importe quelle question sur la cuisine ! Je peux suggérer des recettes, expliquer des techniques, recommander des ingrédients, et bien plus encore.
                    </p>
                    
                    {/* Example Prompts */}
                    <div className="w-full max-w-3xl">
                      <p className="text-xs font-semibold text-gray-500 mb-3">Essayez de demander :</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {examplePrompts.map((prompt, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentPrompt(prompt)}
                            className="bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 rounded-lg p-3 text-left text-xs font-medium text-gray-700 transition-all hover:shadow-md"
                          >
                            💡 {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Chat Messages
                  chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-4xl w-full ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        {/* Message Bubble */}
                        <div
                          className={`rounded-xl p-3 inline-block ${
                            message.type === 'user'
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white ml-auto'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>

                        {/* AI Recipes */}
                        {message.type === 'ai' && message.recipes && message.recipes.length > 0 && (
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {message.recipes.map((recipe) => (
                              <motion.div
                                key={recipe._id}
                                whileHover={{ scale: 1.03 }}
                                onClick={() => setSelectedRecipe(recipe)}
                                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border border-gray-200 hover:border-purple-400 transition-all"
                              >
                                <img
                                  src={recipe.image}
                                  alt={recipe.title?.en}
                                  className="w-full h-40 object-cover"
                                  onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
                                  }}
                                />
                                <div className="p-3">
                                  <h4 className="font-bold text-gray-800 mb-1 text-sm line-clamp-1">
                                    {recipe.title?.[lang] || recipe.title?.en}
                                  </h4>
                                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                    {recipe.description?.[lang] || recipe.description?.en}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>⏱️ {recipe.cookTime}min</span>
                                    <span>•</span>
                                    <span className="capitalize">{recipe.difficulty}</span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Timestamp */}
                        <p className={`text-xs mt-1.5 ${message.type === 'user' ? 'text-right text-gray-500' : 'text-gray-400'}`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {/* Loading */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-xl px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                        <span className="text-xs text-gray-600">Réflexion en cours...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t("aiPromptPlaceholder") || "Posez-moi une question sur la cuisine..."}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-none transition-all text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentPrompt.trim() || isLoading}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                  >
                    {isLoading ? "⏳" : "Envoyer"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRecipe(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-[98vw] max-w-[1800px] h-[96vh] overflow-hidden flex flex-col"
            >
              {/* Compact Header with Small Image */}
              <div className="border-b border-gray-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="p-6 flex gap-6">
                  {/* Small Image */}
                  {selectedRecipe.image && (
                    <div className="flex-shrink-0">
                      <img 
                        src={selectedRecipe.image} 
                        alt={selectedRecipe.title?.en || "AI Recipe"}
                        className="w-32 h-32 rounded-xl object-cover shadow-md"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Recipe Header */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🤖</span>
                        <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-medium">
                          AI Generated
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedRecipe(null)}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {selectedRecipe.title?.[lang] || selectedRecipe.title?.en || "Recipe"}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {selectedRecipe.description?.[lang] || selectedRecipe.description?.en}
                    </p>
                    
                    {/* Quick Info */}
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-700">⏱️ {selectedRecipe.cookTime} min</span>
                      <span className="text-gray-700">📊 {selectedRecipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span>🥘</span>
                      <span>Ingredients</span>
                    </h3>
                    <div className="space-y-2">
                      {selectedRecipe.ingredients?.map((ing, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span className="flex-1 text-gray-700">
                            <span className="font-semibold">{ing.quantity} {ing.unit}</span> {ing.name?.[lang] || ing.name?.en || ing.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span>👨‍🍳</span>
                      <span>Instructions</span>
                    </h3>
                    <div className="space-y-3">
                      {(selectedRecipe.instructions?.[lang] || selectedRecipe.instructions?.en || []).map((step, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                            {idx + 1}
                          </div>
                          <p className="flex-1 text-gray-700 text-sm leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {selectedRecipe.tags && selectedRecipe.tags.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-1.5">
                        {selectedRecipe.tags.map((tag, idx) => (
                          <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AIChef;

