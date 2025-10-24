import React from "react";

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
        />
      </svg>
    </>
  );
};

export default MoonIcon;
