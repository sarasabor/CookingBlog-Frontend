import React from "react";
import {Outlet, Link} from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <nav className='bg-green-100 p-4 flex gap-4'>
        <Link to="/">Home</Link>
        <Link to="?recipes">Recipes</Link>
      </nav>

      <main className="p-6">
        <Outlet/>
      </main>
    
    </div>
  )
}

export default Layout;