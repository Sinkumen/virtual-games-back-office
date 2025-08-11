import React from "react";

const GameDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-7 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>

      <div>
        <div className="flex justify-between text-sm text-gray-600 my-4">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>
        {/* Skeleton for Participants */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 bg-gray-200 rounded w-28"></div>
        </div>
        <div className="flex justify-center">
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 border-2 border-white rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton for Game Status */}
      <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500 bg-gray-50 rounded-lg mt-4">
        <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-64"></div>
      </div>
    </div>
  );
};

export default GameDetailSkeleton;
