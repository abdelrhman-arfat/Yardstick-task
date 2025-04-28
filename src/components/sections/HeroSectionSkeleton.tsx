import { Loader } from "lucide-react";
import React from "react";
import TableSkeleton from "../TableSkeleton";

const HeroSectionSkeleton = () => {
  return (
    <div className="mt-4">
      <h1 className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
        <p className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Loading
        </p>
        <p className="animate-spin text-blue-500">
          <Loader />
        </p>
      </h1>
      <div className="w-full flex flex-col sm:flex-row items-center gap-10">
        <div className="w-full sm:w-1/2 min-h-[300px] bg-neutral-50 rounded-md text-center animate-pulse">
          <div className="w-full h-10 bg-gray-300 rounded-md mx-auto mb-3 mt-6"></div>
          <div className="w-full h-48 bg-gray-200 rounded-md mx-auto mb-4"></div>
        </div>
        <div className="w-full sm:w-1/2 min-h-[300px] bg-neutral-50 rounded-md  text-center animate-pulse">
          <div className="w-full h-10 bg-gray-300 rounded-md mx-auto mb-3 mt-6"></div>{" "}
          <div className="w-full h-48 bg-gray-200 rounded-md mx-auto mb-4"></div>{" "}
        </div>
      </div>

      <TableSkeleton />
    </div>
  );
};

export default HeroSectionSkeleton;
