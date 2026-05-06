import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { clearTokens, getAccessToken } from '../utils/token'

function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);
  const { login } = useContext(AuthContext)

  const IsLoggedIn = !!getAccessToken()


  const handleLogout = () => {
    clearTokens()
    navigate('/')
  }



  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 left-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="text-2xl flex justify-center gap-2 font-bold text-orange-500">
          <img className="h-10" src="/Relasto design (1)/nav-icon.png" alt="" />
          Relasto
        </div>

        <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">

          <li>
            <Link to="/" className="hover:text-orange-500">Home</Link>
          </li>

          <li>
            <Link to="/property-listing" className="hover:text-orange-500">
              Listings
            </Link>
          </li>

          <li>
            <Link to="/agents" className="hover:text-orange-500">
              Agents
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-orange-500">
              Contact
            </Link>
          </li>

        </ul>

        <div className="hidden md:flex items-center gap-4">


          <div className="flex items-center gap-2">

            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <Search size={18} />
            </button>


            <button onClick={() => navigate('/profile')} className="p-2 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition">
              <User size={18} />
            </button>

          </div>


          <button onClick={() => navigate('/login-page')} className="px-5 py-2 bg-black text-white rounded-lg hover:bg-orange-500 transition duration-300">
            {!IsLoggedIn ? (
              <Link
                to='/login-page'
                className='
                                px-5 py-2 rounded-xl text-sm font-medium
                                text-emerald-800
                                border border-emerald-200
                                hover:bg-emerald-50 hover:border-emerald-300
                                transition-all duration-200
                            '
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className='
                            px-5 py-2 rounded-xl text-sm font-medium
                            text-emerald-800
                            bg-white/50 border border-emerald-200
                            hover:bg-red-50 hover:text-red-600 hover:border-red-200
                            transition-all duration-200 cursor-pointer
                        '
              >
                Logout
              </button>
            )}
          </button>

        </div>


        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-orange-500">
            Home
          </Link>
          <Link to="/property-listing" onClick={() => setMenuOpen(false)} className="block hover:text-orange-500">
            Listings
          </Link>
          <Link to="/agents" onClick={() => setMenuOpen(false)} className="block hover:text-orange-500">
            Agents
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-orange-500">
            Contact
          </Link>

          <div className="flex items-center gap-3">

            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <Search size={18} />
            </button>


            <button className="p-2 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition">
              <User size={18} />
            </button>

          </div>

          <button onClick={() => navigate('/login-page')} className="px-5 py-2 bg-black text-white rounded-lg hover:bg-orange-500 transition duration-300">
            {!IsLoggedIn ? (
              <Link
                to='/login-page'
                className='
                                px-5 py-2 rounded-xl text-sm font-medium
                                text-emerald-800
                                border border-emerald-200
                                hover:bg-emerald-50 hover:border-emerald-300
                                transition-all duration-200
                            '
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className='
                            px-5 py-2 rounded-xl text-sm font-medium
                            text-emerald-800
                            bg-white/50 border border-emerald-200
                            hover:bg-red-50 hover:text-red-600 hover:border-red-200
                            transition-all duration-200 cursor-pointer
                        '
              >
                Logout
              </button>
            )}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;