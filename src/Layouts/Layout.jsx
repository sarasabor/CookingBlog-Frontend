// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useTranslation } from "react-i18next";

// function Layout() {
//   const { user, logout, isAuthenticated, isLoading } = useAuth();
//   const {t, i18n } = useTranslation();

//   const handleLanguageChange = (lang) => {
//     i18n.changeLanguage(lang);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-green-500 text-white py-4 shadow-md">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           {/* Logo */}
//           <h1 className="text-xl font-bold">🍳 CookingBlog</h1>

//           {/* Navigation */}
//           <nav className="space-x-4 flex items-center">
//             <Link to="/" className="hover:underline">
//               Home
//             </Link>
//             <Link to="/recipes" className="hover:underline">
//               Recipes
//             </Link>
//               {isAuthenticated && (
//             <Link to="/add-recipe" className="hover:underline">
//               {t("addRecipe.title")}
//             </Link>
//           )}
//             {!isLoading && (
//               <>
//                 {isAuthenticated ? (
//                   <>
//                     <span className="font-semibold">
//                       👤 {user?.username || user?.email || "User"}
//                     </span>
//                     <button
//                       onClick={logout}
//                       className="hover:underline text-red-100 border border-white rounded px-2 py-1 ml-2"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/register" className="hover:underline">
//                       Register
//                     </Link>
//                     <Link to="/login" className="hover:underline">
//                       Login
//                     </Link>
//                   </>
//                 )}
//               </>
//             )}

//             {/* 🌐 Language Switcher */}
//             <div className="ml-4 text-sm space-x-1">
//               <button
//                 onClick={() => handleLanguageChange("en")}
//                 className="hover:underline"
//               >
//                 EN
//               </button>
//               <button
//                 onClick={() => handleLanguageChange("fr")}
//                 className="hover:underline"
//               >
//                 FR
//               </button>
//               <button
//                 onClick={() => handleLanguageChange("ar")}
//                 className="hover:underline"
//               >
//                 AR
//               </button>
//             </div>
//           </nav>
//         </div>
//       </header>

//       {/* Page Content */}
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <Outlet />
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
//         © {new Date().getFullYear()} CookingBlog. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default Layout;

import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  const { t, i18n } = useTranslation();
  const { user, logout, isAuthenticated, isLoading } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#567158] text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">🍳 CookingBlog</h1>

          <nav className="space-x-4 flex items-center flex-wrap gap-2">
            <Link to="/" className="hover:underline">
              {t("nav.home")}
            </Link>
            <Link to="/recipes" className="hover:underline">
              {t("nav.recipes")}
            </Link>

            {isAuthenticated && (
              <>
                <Link to="/add-recipe" className="hover:underline">
                  {t("nav.addRecipe")}
                </Link>
                <Link to="/suggestions/mood" className="hover:underline">
                  {t("nav.moodSuggestions")}
                </Link>
                <Link to="/suggestions/smart" className="hover:underline">
                  {t("nav.smartSuggestions")}
                </Link>
              </>
            )}

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
                      {t("nav.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="hover:underline">
                      {t("nav.register")}
                    </Link>
                    <Link to="/login" className="hover:underline">
                      {t("nav.login")}
                    </Link>
                  </>
                )}
              </>
            )}

            {/* Language Switcher */}
            <div className="ml-4 text-sm space-x-1">
              <button
                onClick={() => i18n.changeLanguage("en")}
                className="hover:underline"
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage("fr")}
                className="hover:underline"
              >
                FR
              </button>
              <button
                onClick={() => i18n.changeLanguage("ar")}
                className="hover:underline"
              >
                AR
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Content */}
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
