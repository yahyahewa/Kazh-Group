import React, { useState } from "react";
import { Link } from "react-scroll";
function LinkPages() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className={`flex absolute flex-col top-0 md:bg-transparent w-full 
          justify-start  bg-white
        md:h-auto md:w-auto md:flex-row md:relative md:left-0 md:justify-center 
          items-center overflow-hidden ease-in-out duration-500 transition-all
        ${isOpen ? `left-0 h-[98vh]` : ` left-[-100%]`}`}
      >
        <Link
          activeClass="active"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          to="hero"
          className="font-semibold text-xl capitalize text-lochmara-950 link hover:text-lochmara-600"
        >
          home
        </Link>
        <Link
          activeClass="active"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          to="service"
          className="font-semibold text-xl capitalize text-lochmara-950 link hover:text-lochmara-600"
        >
          service
        </Link>
        <Link
          activeClass="active"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          to="about"
          className="font-semibold text-xl capitalize text-lochmara-950 link hover:text-lochmara-600"
        >
          about
        </Link>
        <Link
          activeClass="active"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          to="contac"
          className="font-semibold text-xl capitalize text-lochmara-950 pt-1 pb-[7px] px-2
           
          border-[2px] border-lochmara-600 rounded-md hover:bg-lochmara-900 hover:text-lochmara-50 
          ease-in-out duration-300 hover:border-lochmara-900"
        >
          Contact
        </Link>

        {isOpen && (
          <div
            className="pt-2 md:hidden fixed right-2 top-4"
            onClick={() => {
              switch (isOpen) {
                case true:
                  setIsOpen(false);
                  break;
                default:
                  setIsOpen(true);
                  break;
              }
            }}
          >
            <span
              className={`w-7 flex flex-col items-center mb-[7px] h-[3px] bg-lochmara-500 rotate-45`}
            ></span>
            <span
              className={`w-7 flex flex-col items-center mb-[7px] h-[3px] bg-lochmara-500 -rotate-45`}
            ></span>
          </div>
        )}
      </div>
      {isOpen ? (
        ``
      ) : (
        <div
          className="pt-2 md:hidden"
          onClick={() => {
            switch (isOpen) {
              case true:
                setIsOpen(false);
                break;
              default:
                setIsOpen(true);
                break;
            }
          }}
        >
          <span
            className={`w-7 flex flex-col items-center mb-[7px] h-[3px] bg-lochmara-500`}
          ></span>
          <span
            className={`w-7 flex flex-col items-center mb-[7px] h-[3px] bg-lochmara-500`}
          ></span>
          <span
            className={`w-7 flex flex-col items-center mb-[7px] h-[3px] bg-lochmara-500`}
          ></span>
        </div>
      )}
    </div>
  );
}

export default LinkPages;
