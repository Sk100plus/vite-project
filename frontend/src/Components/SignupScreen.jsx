import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isAgent, setIsAgent] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        fullName,
        phoneNumber,
        email,
        password,
        companyName: isAgent ? companyName : '',
        isAgent,
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/profile');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="bg-white p-8 rounded-none shadow-xl w-full max-w-md border border-gray-200">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2 text-gray-800 text-center">
          Create your PopX account
        </h1>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Join us and start your journey today!
        </p>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="fullName">
              Full Name*
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="phoneNumber">
              Phone Number*
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
              Password*
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter a strong password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="companyName">
              Company Name (optional)
            </label>
            <input
              type="text"
              id="companyName"
              placeholder="Enter company name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              disabled={!isAgent}
            />
          </div>

          {/* Agent Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Are you an Agent?
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isAgent"
                  checked={isAgent === true}
                  onChange={() => setIsAgent(true)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isAgent"
                  checked={isAgent === false}
                  onChange={() => setIsAgent(false)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupScreen;
