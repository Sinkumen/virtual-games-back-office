"use client";

import { useContext, useEffect, useRef, useState } from "react";
import SocketContext from "./SocketContext";
import { useCookies } from "react-cookie";
import MainLoader from "@/components/MainLoader";
import EmptyDataPlaceholder from "@/components/EmptyDataPlaceholder";
import { getSocket } from "@/utils/socket";

export const SocketContextProvider = ({ children }) => {
  const [cookies] = useCookies(["authentication_token"]);
  const isAuthenticated = Boolean(cookies["authentication_token"]);

  const socketRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (!socketRef.current) {
        socketRef.current = getSocket();
      }

      const socket = socketRef.current;
      socket.connect();

      socket.on("connect", () => setIsListening(true));
      socket.on("disconnect", () => setIsListening(false));

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.disconnect();
      };
    }
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isListening }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
