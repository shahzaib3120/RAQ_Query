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
    <div className="bg-[#101936] p-8 rounded-lg shadow-xl w-full max-w-xl mx-auto">
      <h2 className="text-center text-white text-3xl font-bold mb-8">Sign Up</h2>
      {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
      {successMessage && <p className="text-green-400 mb-4 text-center">{successMessage}</p>}
      <form onSubmit={handleSignUp} className="space-y-6">
        {['email', 'fname', 'lname', 'username', 'password'].map((field, index) => (
          <div key={index} className="flex flex-col w-full">
            <label className="text-[#F7F5FF] mb-2" htmlFor={field}>
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
              className="p-4 rounded-md border border-[#445A9A] bg-[#1C2C56] text-white placeholder-[#AFB1B6] focus:ring-2 focus:ring-[#41D0C8] focus:outline-none transition"
            />
          </div>
        ))}
        <div className="text-sm w-full text-left">
          <ul className="space-y-1">
            <li className={`${registerData.password.length >= 8 ? 'text-green-400' : 'text-red-400'}`}>
              • 8 characters or more
            </li>
            <li className={`${/\d/.test(registerData.password) ? 'text-green-400' : 'text-red-400'}`}>
              • At least one number
            </li>
            <li className={`${/^[A-Za-z0-9]*$/.test(registerData.password) ? 'text-green-400' : 'text-red-400'}`}>
              • No symbols
            </li>
          </ul>
        </div>
        <button
          type="submit"
          className={`w-full py-3 mt-4 text-[#101936] font-bold rounded transition duration-200 ${
            isPasswordValid ? 'bg-[#41D0C8] hover:bg-[#37b2aa]' : 'bg-gray-500 cursor-not-allowed'
          }`}
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
