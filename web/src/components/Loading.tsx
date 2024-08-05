import React from "react";
import { TailSpin as Spinner } from "react-loader-spinner";

export const Loading: React.FC = () => (
  <div className="p-6 bg-primary h-screen flex justify-center items-center">
    <Spinner
      visible={true}
      height={200}
      width={200}
      color="#3A00E5" 
      ariaLabel="tail-spin-loading"
      radius={1}
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);