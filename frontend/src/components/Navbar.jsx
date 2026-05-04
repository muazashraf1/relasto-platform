import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-500">
          Relasto
        </h1>

        {/* Desktop Menu */}
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

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {/* Search */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Search size={18} />
          </button>

          {/* Login */}
          <button onClick={() => navigate('/login-page')} className="px-5 py-2 bg-black text-white rounded-lg hover:bg-orange-500 transition duration-300">
            Login
          </button>

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
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

          <button onClick={() => { setMenuOpen(false); navigate('/login-page'); }} className="w-full bg-black text-white py-2 rounded-lg">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;