import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-14">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Relasto</h3>
          <p className="text-sm text-gray-400 leading-7">
            A modern real estate platform connecting buyers, agents, and property listings with trust and clarity.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Company</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/property-listing" className="hover:text-white">Listings</Link>
            </li>
            <li>
              <Link to="/agents" className="hover:text-white">Agents</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Support</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>Help Center</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Contact</h4>
          <p className="text-gray-400 text-sm">info@relasto.com</p>
          <p className="text-gray-400 text-sm">+1 234 567 890</p>
          <p className="text-gray-400 text-sm">123 Property Avenue, City</p>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-700 pt-6 text-center text-sm text-gray-500">
        © 2026 Relasto. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
