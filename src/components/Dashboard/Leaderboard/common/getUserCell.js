import { rankStyles } from "./defaults";

export const getUserCell = (user, rank) => {
  const rankStyle = rankStyles[rank] || "";

  return [
    <div
      key={`rank-${user.id}`}
      className={`w-4 h-4 rounded-full flex items-center justify-center font-bold ${rankStyle}`}
    >
      {rank}
    </div>,
    <div key={user.id}>
      <p className="font-bold">{user.username}</p>
      <p>{user.phoneNumber}</p>
    </div>,
  ];
};
