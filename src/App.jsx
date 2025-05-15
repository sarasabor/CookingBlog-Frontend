import React from "react";
import Layout from "./Layouts/Layout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element= {<Layout/>}/>
            <Route index element={<Home/>}/>
            <Route path="/recipes" element={<Recipes/>}/>
            <Route path="/recipes/:id" element={<RecipeDetails/>}/>


        </Routes>
    </BrowserRouter>
  );
};

export default App;
