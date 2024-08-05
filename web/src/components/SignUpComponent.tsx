// src/components/SignUpComponent.tsx
import React, { useState } from 'react';
import { registerUser } from '../api/userAPI';
import { RegisterUserData } from '../api/interfaces';

const SignUpComponent: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterUserData>({
    email: '',
    fname: '',
    lname: '',
    username: '',
    password: '',
    role: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'password') validatePassword(value);
  };

  const validatePassword = (password: string) => {
    const lengthValid = password.length >= 8;
    const numberValid = /\d/.test(password);
    const symbolsValid = /^[A-Za-z0-9]*$/.test(password);

    setIsPasswordValid(lengthValid && numberValid && symbolsValid);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!isPasswordValid) {
      setError('Please ensure the password meets all requirements.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser(registerData);
      setSuccessMessage(response.message);
      setRegisterData({
        email: '',
        fname: '',
        lname: '',
        username: '',
        password: '',
        role: 0,
      });
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#101936] p-6 rounded-lg shadow-lg w-[651px] mx-auto">
      <h2 className="text-center text-white text-2xl font-semibold mb-6">Sign Up</h2>
      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      {successMessage && <p className="text-green-500 mb-2 text-center">{successMessage}</p>}
      <form onSubmit={handleSignUp} className="flex flex-col items-center space-y-4">
        {['email', 'fname', 'lname', 'username', 'password'].map((field) => (
          <div key={field} className="flex flex-col w-[544px]">
            <label className="text-[#AFB1B6] mb-1 text-left" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
            </label>
            <input
              id={field}
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(registerData as any)[field]}
              onChange={handleInputChange}
              required
              className="p-3 rounded border border-[#AFB1B6] bg-transparent text-[#AFB1B6] placeholder-[#AFB1B6] focus:ring-2 focus:ring-[#41D0C8] focus:outline-none"
            />
          </div>
        ))}
        <div className="mt-2 text-sm w-[544px] text-left">
          <ul>
            <li className={`${registerData.password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
              • 8 characters or more
            </li>
            <li className={`${/\d/.test(registerData.password) ? 'text-green-500' : 'text-red-500'}`}>
              • At least one number
            </li>
            <li className={`${/^[A-Za-z0-9]*$/.test(registerData.password) ? 'text-green-500' : 'text-red-500'}`}>
              • No symbols
            </li>
          </ul>
        </div>
        <button
          type="submit"
          className={`w-[116px] py-3 text-[#101936] font-bold rounded-full transition duration-200 ${isPasswordValid ? 'bg-[#4DD3CC] hover:bg-[#37b2aa]' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!isPasswordValid || isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUpComponent;