import React from "react";

const BingoBall = ({ label }) => {
  const col = label % 5;
  const colorSets = [
    {
      outer: "from-pink-300 to-pink-400",
      middle: "from-pink-500 to-pink-600",
    },
    {
      outer: "from-green-300 to-green-400",
      middle: "from-green-500 to-green-600",
    },
    {
      outer: "from-blue-300 to-blue-400",
      middle: "from-blue-500 to-blue-600",
    },
    {
      outer: "from-purple-300 to-purple-400",
      middle: "from-purple-500 to-purple-600",
    },
    {
      outer: "from-yellow-300 to-yellow-400",
      middle: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <div
      className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${colorSets[col].outer} shadow-lg`}
    >
      <div
        className={`flex items-center justify-center w-8.5 h-8.5 rounded-full bg-gradient-to-br ${colorSets[col].middle}`}
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm">
          <span className=" text-sm font-bold">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default BingoBall;
