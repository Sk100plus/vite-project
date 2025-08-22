import React from 'react';
import { Link } from 'react-router-dom';

const LandingScreen = () => {
  return (
    <div className="select-none flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-xl font-semibold mb-4">Welcome to PopX</h1>
        <p className="text-red-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <Link to="/signup" className="block w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg mb-4 hover:bg-purple-700">
          Create Account
        </Link>
        <Link to="/login" className="block w-full bg-purple-200 text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-300">
          Already Registered? Login
        </Link>
      </div>
    </div>
  );
};

export default LandingScreen;
