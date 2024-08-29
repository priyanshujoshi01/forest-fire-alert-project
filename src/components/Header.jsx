// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-tight">
          <Link to="/">Forest Fire Alert System</Link>
        </div>
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <ul className={`md:flex md:space-x-8 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 absolute md:static top-16 right-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 md:bg-transparent p-4 md:p-0`}>
          <li>
            <Link to="/" className="block py-2 px-4 text-lg font-semibold hover:bg-white hover:text-gray-900 rounded transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="block py-2 px-4 text-lg font-semibold hover:bg-white hover:text-gray-900 rounded transition duration-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/login" className="block py-2 px-4 text-lg font-semibold hover:bg-white hover:text-gray-900 rounded transition duration-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="block py-2 px-4 text-lg font-semibold hover:bg-white hover:text-gray-900 rounded transition duration-300">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

