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
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <span className="text-4xl">🤖</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Chef Assistant</h1>
                <p className="text-purple-100 mt-1">
                  {t("aiAssistantDescription") || "Your personal culinary AI companion"}
                </p>
              </div>
            </div>
            {chatHistory.length > 0 && (
              <button
                onClick={clearChat}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-medium transition-all"
              >
                {t("aiClearChat") || "Clear Chat"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Area - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl h-[calc(100vh-280px)] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chatHistory.length === 0 ? (
                  // Welcome Screen
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full p-8 mb-6">
                      <span className="text-7xl">👨‍🍳</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                      Welcome to AI Chef!
                    </h2>
                    <p className="text-gray-600 max-w-md mb-8">
                      Ask me anything about cooking! I can suggest recipes, explain techniques, recommend ingredients, and much more.
                    </p>
                    
                    {/* Example Prompts */}
                    <div className="w-full max-w-2xl">
                      <p className="text-sm font-semibold text-gray-500 mb-3">Try asking:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {examplePrompts.map((prompt, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentPrompt(prompt)}
                            className="bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 rounded-xl p-4 text-left text-sm font-medium text-gray-700 transition-all hover:shadow-md"
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
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        {/* Message Bubble */}
                        <div
                          className={`rounded-2xl p-4 ${
                            message.type === 'user'
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>

                        {/* AI Recipes */}
                        {message.type === 'ai' && message.recipes && message.recipes.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {message.recipes.map((recipe) => (
                              <motion.div
                                key={recipe._id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedRecipe(recipe)}
                                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-300 transition-all"
                              >
                                <div className="flex">
                                  <img
                                    src={recipe.image}
                                    alt={recipe.title?.en}
                                    className="w-32 h-32 object-cover"
                                    onError={(e) => {
                                      e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400";
                                    }}
                                  />
                                  <div className="flex-1 p-4">
                                    <h4 className="font-bold text-gray-800 mb-1">
                                      {recipe.title?.[lang] || recipe.title?.en}
                                    </h4>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                      {recipe.description?.[lang] || recipe.description?.en}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                      <span>⏱️ {recipe.cookTime} min</span>
                                      <span>📊 {recipe.difficulty}</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Timestamp */}
                        <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-right text-gray-500' : 'text-gray-400'}`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {/* Loading */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                        <span className="text-sm text-gray-600">AI Chef is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t("aiPromptPlaceholder") || "Ask me anything about cooking..."}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentPrompt.trim() || isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? "..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>💡</span>
                <span>Tips & Examples</span>
              </h3>
              
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Ask for Recipes</h4>
                  <p className="text-sm text-purple-700">
                    "I want a spicy Thai curry" or "Quick breakfast ideas"
                  </p>
                </div>

                <div className="bg-pink-50 rounded-xl p-4">
                  <h4 className="font-semibold text-pink-900 mb-2">Get Cooking Tips</h4>
                  <p className="text-sm text-pink-700">
                    "How do I make perfect pasta?" or "Best way to cook steak"
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Ingredient Ideas</h4>
                  <p className="text-sm text-orange-700">
                    "What can I make with chicken and rice?" or "Vegetarian protein sources"
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Dietary Needs</h4>
                  <p className="text-sm text-green-700">
                    "Gluten-free dessert recipes" or "Low-carb dinner ideas"
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-xl">🌟</span>
                  <span>Powered by AI • Unlimited possibilities</span>
                </div>
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
              {/* Hero Image */}
              {selectedRecipe.image && (
                <div className="relative h-[40vh] overflow-hidden">
                  <img 
                    src={selectedRecipe.image} 
                    alt={selectedRecipe.title?.en || "AI Recipe"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&h=900";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  <div className="absolute inset-x-0 top-0 p-6 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🤖</span>
                      <span className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm">
                        AI Generated Recipe
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedRecipe(null)}
                      className="text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-3 transition-all shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <h2 className="text-4xl font-bold text-white drop-shadow-2xl mb-2">
                      {selectedRecipe.title?.[lang] || selectedRecipe.title?.en || "Recipe"}
                    </h2>
                    <p className="text-lg text-white/90 drop-shadow-lg">
                      {selectedRecipe.description?.[lang] || selectedRecipe.description?.en}
                    </p>
                  </div>
                </div>
              )}

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-8 space-y-8">
                  
                  {/* Meta Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-1">⏱️</div>
                      <div className="text-sm text-gray-600">Cook Time</div>
                      <div className="text-lg font-semibold text-gray-800">{selectedRecipe.cookTime} min</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-sm text-gray-600">Difficulty</div>
                      <div className="text-lg font-semibold text-gray-800 capitalize">{selectedRecipe.difficulty}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
                      <div className="text-2xl mb-1">💪</div>
                      <div className="text-sm text-gray-600">Nutrition</div>
                      <div className="text-xs font-medium text-gray-700 mt-1">{selectedRecipe.nutritionHighlights || "Balanced"}</div>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span>🥘</span>
                      <span>Ingredients</span>
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      {selectedRecipe.ingredients?.map((ing, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-2 hover:bg-white rounded-lg transition-colors">
                          <span className="text-purple-600 mt-1">•</span>
                          <span className="flex-1 text-gray-700">
                            <span className="font-semibold">{ing.quantity} {ing.unit}</span> {ing.name?.[lang] || ing.name?.en || ing.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span>👨‍🍳</span>
                      <span>Instructions</span>
                    </h3>
                    <div className="space-y-4">
                      {(selectedRecipe.instructions?.[lang] || selectedRecipe.instructions?.en || []).map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                          <p className="flex-1 text-gray-700 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {selectedRecipe.tags && selectedRecipe.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecipe.tags.map((tag, idx) => (
                          <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
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

