import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  const { user, logout, isAuthenticated, isLoading } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-green-500 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">🍳 CookingBlog</h1>
          <nav className="space-x-4 flex items-center">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/recipes" className="hover:underline">
              Recipes
            </Link>

            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <span className="font-semibold">
                      👤 {user?.username || user?.email || "User"}
                    </span>
                    <button
                      onClick={logout}
                      className="hover:underline text-red-100 border border-white rounded px-2 py-1 ml-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="hover:underline">
                      Register
                    </Link>
                    <Link to="/login" className="hover:underline">
                      Login
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} CookingBlog. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
