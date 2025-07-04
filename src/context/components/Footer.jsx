import React from "react";
import LangSwitcher from "./LangSwitcher"; 

function Footer() {
  return (
    <footer className="bg-[#567158] text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo + description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/images/moodbite-logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
            <span className="text-xl font-bold">MoodBite Kitchen</span>
          </div>
          <p className="text-sm text-gray-200">
            Discover recipes tailored to your mood. Smart, healthy, and delicious.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/recipes" className="hover:underline">Recipes</a></li>
            <li><a href="/add" className="hover:underline">Add Recipe</a></li>
            <li><a href="/mood-suggestions" className="hover:underline">Mood Suggestions</a></li>
            <li><a href="/favorites" className="hover:underline">Favorites</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://github.com/sarasabor" target="_blank" className="hover:underline">GitHub</a></li>
            <li><a href="https://linkedin.com/in/sarasabor" target="_blank" className="hover:underline">LinkedIn</a></li>
            <li><a href="saborsara.wad@gmail.com" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Language switcher */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Language</h3>
          <LangSwitcher />
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-green-300 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} MoodBite Kitchen. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
