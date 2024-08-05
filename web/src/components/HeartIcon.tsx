import React from "react";

interface HeartIconProps {
  isActive: boolean;
  onClick: () => void;
}

const HeartIcon: React.FC<HeartIconProps> = ({ isActive, onClick }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={`w-6 h-6 ${isActive ? 'text-[#FF529A]' : 'text-[#AFB1B6]'}`} // Tailwind classes for color
    onClick={onClick}
    style={{ cursor: 'pointer' }} // Cursor pointer on hover
  >
    <mask
      id="mask0_866_1640"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="2"
      y="3"
      width="21"
      height="20"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2.99991H22.4725V22.5009H2V2.99991Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_866_1640)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.82396 12.123C5.22596 16.485 10.765 20.012 12.237 20.885C13.714 20.003 19.293 16.437 20.65 12.127C21.541 9.341 20.714 5.812 17.428 4.753C15.836 4.242 13.979 4.553 12.697 5.545C12.429 5.751 12.057 5.755 11.787 5.551C10.429 4.53 8.65496 4.231 7.03796 4.753C3.75696 5.811 2.93296 9.34 3.82396 12.123ZM12.238 22.501C12.114 22.501 11.991 22.471 11.879 22.41C11.566 22.239 4.19296 18.175 2.39596 12.581C2.39496 12.581 2.39496 12.58 2.39496 12.58C1.26696 9.058 2.52296 4.632 6.57796 3.325C8.48196 2.709 10.557 2.98 12.235 4.039C13.861 3.011 16.021 2.727 17.887 3.325C21.946 4.634 23.206 9.059 22.079 12.58C20.34 18.11 12.913 22.235 12.598 22.408C12.486 22.47 12.362 22.501 12.238 22.501Z"
        fill="currentColor"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.1537 10.6249C17.7667 10.6249 17.4387 10.3279 17.4067 9.9359C17.3407 9.1139 16.7907 8.4199 16.0077 8.1669C15.6127 8.0389 15.3967 7.6159 15.5237 7.2229C15.6527 6.8289 16.0717 6.6149 16.4677 6.7389C17.8307 7.1799 18.7857 8.3869 18.9027 9.8139C18.9357 10.2269 18.6287 10.5889 18.2157 10.6219C18.1947 10.6239 18.1747 10.6249 18.1537 10.6249Z"
      fill="currentColor"
    />
  </svg>
);

export default HeartIcon;