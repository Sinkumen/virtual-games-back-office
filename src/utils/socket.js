import { Cookies } from "react-cookie";
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  const cookies = new Cookies();
  const token = cookies.get("authentication_token");
  if (!socket) {
    socket = io(
      process.env.NEXT_PUBLIC_RETAIL_SOCKET_URL || "http://localhost:3001",
      {
        auth: { token },
        transports: ["websocket"],
        autoConnect: false,
        query: {
          tenantId: process.env.NEXT_PUBLIC_TENANT_ID,
        },
      }
    );
  }
  return socket;
};
