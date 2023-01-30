import React from "react";
import nsbepic from "./nsbepic.png";
import convention from "./nsbeconvention.png";
import torch from "./nsbegoldentorch.png";

const Hero = () => {
  return (
    <div className="flex h-screen lqd:hidden">
      <div className="hover:cursor-pointer xl:hover:scale-110 duration-700 mx-auto flex my-auto max-w-screen-lg md:bg-white md:bg-opacity-10 md:backdrop-blur h-screen md:h-[340px] md:my-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 rounded-3xl ">
        <div className="flex h-5/6 flex-col mx-auto my-auto md:mt-auto">
          <div className="text-6xl font-extrabold text-gray-400 my-auto flex flex-row">
            <div>Events</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 my-auto mx-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
        </div>
        <div className="mx-10 my-1/2 md:my-auto">
          <img
            src={torch}
            className="h-[300px] flex-none object-cover object-center mx-auto sm:border rounded-lg border w-5/6"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Hero;
