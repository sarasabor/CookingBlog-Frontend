import React from "react";

function Home() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-green-600 mb-4">
        Welcome to Cooking Blog 🍳
      </h1>
      <p className="text-gray-700 text-lg sm:text-xl max-w-xl">
        Discover delicious recipes, rate your favorites, and share your own culinary creations with the world.
      </p>
    </div>
  );
}

export default Home;
