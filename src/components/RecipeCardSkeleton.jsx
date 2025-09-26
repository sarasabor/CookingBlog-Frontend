import React from 'react';

const RecipeCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 w-full bg-gray-300"></div>
      
      <div className="p-4">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        
        {/* Mood placeholder */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        
        {/* Time & difficulty placeholder */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        
        {/* Tags placeholder */}
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        
        {/* Button placeholder */}
        <div className="flex justify-end">
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;




