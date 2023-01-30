import React from "react";
import nsbepic from "./nsbepic.png";
import convention from "./nsbeconvention.png";
import torch from "./nsbegoldentorch.png";

const Hero = () => {
  return (
    <div className="flex h-screen overflow-x-hidden">
      <div className="hover:cursor-pointer xl:hover:scale-110 duration-700 mx-auto flex my-auto max-w-screen-lg md:bg-white md:bg-opacity-10 md:backdrop-blur h-screen md:h-[340px] md:my-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 rounded-3xl ">
        <div className="flex h-5/6 flex-col mx-auto mt-36 md:mt-auto">
          <div className="text-8xl font-extrabold text-white">NSBE</div>
          <div className="text-3xl font-bold text-uva-orange ">@ UVA</div>
        </div>
        <div className="mx-10 my-1/2 md:my-auto">
          <img
            src={nsbepic}
            className="h-[300px] flex-none object-cover object-center mx-auto sm:border rounded-lg border w-5/6"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Hero;
