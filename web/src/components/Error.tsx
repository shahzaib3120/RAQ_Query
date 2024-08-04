import React from "react";

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => (
  <div className="h-screen flex justify-center items-center bg-red-500">
    <p className="text-white text-2xl">Error: {error}</p>
  </div>
);

export default Error;