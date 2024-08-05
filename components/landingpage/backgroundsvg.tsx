import React from "react";

const BackgroundSVG = () => {
  return (
    <svg
      viewBox="0 0 1440 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full -z-10"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M1439.5 336.5C1363.5 483.5 1141 540 825 552C509 564 393.5 495.5 214.5 380C35.5001 264.5 -75.4999 114 75.0001 0H1439.5V336.5Z"
        fill="url(#paint0_linear_1)"
      />
      <path
        d="M1439.5 140C1355.67 304.5 1157.6 404.2 777 380C396.4 355.8 131.833 264.333 0 216.5V0H1439.5V140Z"
        fill="url(#paint1_linear_1)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1"
          x1="719.75"
          y1="0"
          x2="719.75"
          y2="557"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6F0FF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#E6F0FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1"
          x1="719.75"
          y1="0"
          x2="719.75"
          y2="384.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5E8DE" stopOpacity="0.5" />
          <stop offset="1" stopColor="#F5E8DE" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BackgroundSVG;
