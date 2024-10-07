// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/aws-quiz.png" alt="AWS Quiz Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl text-white font-bold">AWS Quiz</h1>
        </div>
        <ul className="flex justify-center space-x-8">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              Prepare Question Sets
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
  

export default Navbar;


