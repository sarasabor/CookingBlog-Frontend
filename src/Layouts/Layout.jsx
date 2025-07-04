import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/moodbitelogo.png"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Layout() {
  const { t, i18n } = useTranslation("layout");
  const { user, logout, isAuthenticated, isLoading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcf8] text-grey-800">
      <header className="sticky top-0 z-50 bg-[#567158] text-[#fdfcf8] py-4 px-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">

          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img src={logo} alt="MoodBite Kitchen Logo" className="h-10 w-auto rounded-xl shadow-sm" />
      <span>MoodBite Kitchen</span>
    </Link>
  </div>

        <nav className="hidden lg:flex items-center gap-4">
          <NavLinks t={t} isAuthenticated={isAuthenticated} user={user} logout={logout} />
          <LangSwitcher i18n={i18n} />
        </nav>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <>
          <motion.div
            className="fixed inset-0 bg-transparent  z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 z-50 bg-[#567158] text-[#faf7f3] w-64 h-full shadow-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">MoodBite Kitchen</span>
                <button onClick={closeSidebar}>
                  <X />
                </button>
              </div>

              <motion.nav
                className="flex flex-col gap-4 text-sm"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {},
                }}
              >
                <AnimatedLinks
                  t={t}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  logout={logout}
                  closeSidebar={closeSidebar}
                />
              </motion.nav>

              <div className="mt-6">
                <LangSwitcher i18n={i18n} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow container mx-auto px-4 py-8 mt-6 relative z-0 bg-[#fdfcf8] text-black min-h-[calc(100vh-160px)]">
        <Outlet />
      </main>

      <footer className="bg-[#567158] text-[#fdfcf8] py-10 mt-20">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    
    {/* Logo + description */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <img src={logo} alt="MoodBite Kitchen Logo" className="h-12 w-auto rounded-xl shadow-sm" />
        <span className="text-xl font-bold">MoodBite Kitchen</span>
      </div>
      <p className="text-sm text-[#fdfcf8]">
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

    {/* Resources / Links */}
    
<div>
  <h3 className="text-lg font-semibold mb-3">Resources</h3>
  <ul className="space-y-2 text-sm">
    <li>
      <a
        href="https://github.com/sarasabor"
        target="_blank"
        className="flex items-center gap-2 hover:underline"
      >
        <FaGithub className="text-white" /> GitHub
      </a>
    </li>
    <li>
      <a
        href="https://linkedin.com/in/sara-sabor-453b30160"
        target="_blank"
        className="flex items-center gap-2 hover:underline"
      >
        <FaLinkedin className="text-white" /> LinkedIn
      </a>
    </li>
    <li>
      <a
        href="mailto:saborsara.wad@gmail.com"
        className="flex items-center gap-2 hover:underline"
      >
        <FaEnvelope className="text-white" /> Contact
      </a>
    </li>
  </ul>
</div>

    {/* Language switcher or others */}
    <div>
      <div>
  <h3 className="text-lg font-semibold mb-3">Language</h3>
  <LangSwitcher i18n={i18n} />
</div>
    </div>
  </div>

  {/* Bottom copyright */}
  <div className="mt-10 border-t border-green-300 pt-6 text-center text-sm text-gray-300">
    © {new Date().getFullYear()} MoodBite Kitchen. All rights reserved.
  </div>
</footer>

    </div>
  );
}

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

function AnimatedLinks({ t, isAuthenticated, user, logout, closeSidebar }) {
  const close = () => closeSidebar && closeSidebar();

  return (
    <>
      <motion.div variants={linkVariants}>
        <Link to="/recipes" onClick={close} className="hover:underline">
          {t("recipes")}
        </Link>
      </motion.div>

      {isAuthenticated && user?.role === "admin" && (
          <motion.div variants={linkVariants}>
           <Link to="/add-recipe" onClick={close} className="hover:underline">
             {t("addRecipe")}
           </Link>
         </motion.div>
      )}


      {isAuthenticated && (
        <>
          
          <motion.div variants={linkVariants}>
            <Link to="/suggestions/mood" onClick={close} className="hover:underline">
              {t("moodSuggestions")}
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link to="/suggestions/smart" onClick={close} className="hover:underline">
              {t("smartSuggestions")}
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link to="/why-mood-suggestions" onClick={close} className="hover:underline">
              🧠 {t("whyMood")}
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link to="/favorites" onClick={close} className="hover:underline">
              ❤️ {t("favorites")}
            </Link>
          </motion.div>
        </>
      )}

      {!isAuthenticated && (
        <>
          <motion.div variants={linkVariants}>
            <Link to="/register" onClick={close} className="hover:underline">
              {t("register")}
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link to="/login" onClick={close} className="hover:underline">
              {t("login")}
            </Link>
          </motion.div>
        </>
      )}

      {isAuthenticated && (
        <>
          <motion.div variants={linkVariants}>
            <span className="font-semibold"> {user?.username || user?.email}</span>
          </motion.div>
          <motion.div variants={linkVariants}>
            <button
              onClick={logout}
              className="hover:underline border border-white rounded px-2 py-1 text-sm text-white"
            >
              Logout
            </button>
          </motion.div>
        </>
      )}
    </>
  );
}

function NavLinks({ t, isAuthenticated, user, logout }) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <Link to="/recipes" className="hover:underline">{t("recipes")}</Link>

      {isAuthenticated && user?.role === "admin" && (
  <Link to="/add-recipe" className="hover:underline">{t("addRecipe")}</Link>
)}


      {isAuthenticated && (
        <>
         
          <Link to="/suggestions/mood" className="hover:underline">{t("moodSuggestions")}</Link>
          <Link to="/suggestions/smart" className="hover:underline">{t("smartSuggestions")}</Link>
          <Link to="/why-mood-suggestions" className="hover:underline">🧠 {t("whyMood")}</Link>
          <Link to="/favorites" className="hover:underline">❤️ {t("favorites")}</Link>
        </>
      )}

      {!isAuthenticated && (
        <>
          <Link to="/register" className="hover:underline">{t("register")}</Link>
          <Link to="/login" className="hover:underline">{t("login")}</Link>
        </>
      )}

      {isAuthenticated && (
        <>
          <span className="font-semibold">👤 {user?.username || user?.email}</span>
          <button onClick={logout} className="hover:underline border border-white rounded px-2 py-1 text-sm text-white">
            Logout
          </button>
        </>
      )}
    </div>
  );
}

function LangSwitcher({ i18n }) {
  return (
    <div className="space-x-2 text-xs">
      <button onClick={() => i18n.changeLanguage("en")} className="hover:underline">EN</button>
      <button onClick={() => i18n.changeLanguage("fr")} className="hover:underline">FR</button>
      <button onClick={() => i18n.changeLanguage("ar")} className="hover:underline">AR</button>
    </div>
  );
}

export default Layout;
