// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Layout from "./Layouts/layout";
// import Home from "./pages/Home";
// import Recipes from "./pages/Recipes";
// import RecipeDetails from "./pages/RecipeDetails";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import AddRecipe from "./pages/AddRecipe";
// import MoodSuggestions from "./pages/MoodSuggestions";
// import SmartSuggestions from "./pages/SmartSuggestions";


// function App() {
//   return (
//     <Routes>
//       {/* Layout routes */}
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Home />} />
//         <Route path="recipes" element={<Recipes />} />
//         <Route path="recipes/:id" element={<RecipeDetails />} />
//         <Route path="add-recipe" element={<AddRecipe />} />
//         <Route path="suggestions" element={<MoodSuggestions />} />
//         </Route>
//         <Route path="smart" element={<SmartSuggestions />} />

//       {/* خارج Layout */}
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//     </Routes>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/layout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import MoodSuggestions from "./pages/MoodSuggestions";
import SmartSuggestions from "./pages/SmartSuggestions";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:id" element={<RecipeDetails />} />
          <Route
            path="add-recipe"
            element={
              <ProtectedRoute>
                <AddRecipe />
              </ProtectedRoute>
            }
          />
          <Route path="suggestions/mood" element={<MoodSuggestions />} />
          <Route path="suggestions/smart" element={<SmartSuggestions />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

