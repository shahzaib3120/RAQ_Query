// src/components/LogInComponent.tsx
import React, { useState } from 'react';
import { loginUser } from '../api/userAPI';
import { LoginUserData } from '../api/interfaces';

const LogInComponent: React.FC = () => {
  // State to hold login form data
  const [loginData, setLoginData] = useState<LoginUserData>({ email: '', password: '' });
  // State to manage error messages
  const [error, setError] = useState<string | null>(null);
  // State to control loading status during API call
  const [isLoading, setIsLoading] = useState(false);

  // Handles changes to the input fields and updates state accordingly
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handles the form submission
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    // Validate if both email and password fields are filled
    if (!loginData.email || !loginData.password) {
      setError('Please fill out all fields.');
      return;
    }

    console.log('Login data being sent:', loginData); // Log the data being sent for debugging
    setIsLoading(true); // Set loading to true during the API request

    try {
      // Attempt to login with the provided credentials
      const response = await loginUser(loginData);
      console.log('Login successful:', response); // Log success for debugging
    } catch (err) {
      // Handle errors such as incorrect credentials or server issues
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false); // Reset loading status regardless of outcome
    }
  };

  return (
    <div className="bg-[#101936] p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
      <h2 className="text-center text-white text-2xl font-semibold mb-6">Log In</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-white mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@pwc.com"
            value={loginData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 rounded border border-gray-600 bg-[#151C32] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#41D0C8] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-white mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleInputChange}
            required
            className="w-full p-3 rounded border border-gray-600 bg-[#151C32] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#41D0C8] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className={`w-[116px] py-3 text-[#101936] font-bold rounded-full transition duration-200 ${isLoading ? 'bg-gray-400' : 'bg-[#41D0C8] hover:bg-[#37b2aa]'}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LogInComponent;
