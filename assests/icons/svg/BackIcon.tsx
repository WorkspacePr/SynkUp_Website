import React from "react";

const BackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M22.5193 6.27893C22.8933 6.65298 22.9273 7.2383 22.6213 7.65076L22.5193 7.76893L13.4312 16.8575L22.5193 25.946C22.8933 26.32 22.9273 26.9054 22.6213 27.3178L22.5193 27.436C22.1452 27.81 21.5599 27.844 21.1475 27.538L21.0293 27.436L11.1958 17.6025C10.8217 17.2284 10.7877 16.6431 11.0937 16.2306L11.1958 16.1125L21.0293 6.27893C21.4407 5.86747 22.1078 5.86747 22.5193 6.27893Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
};

export default BackIcon;
