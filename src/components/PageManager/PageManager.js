import React from "react";
import MainLoader from "../MainLoader";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import UserContextProvider from "@/contexts/UserContext/UserContextProvider";

const PageManager = ({ children }) => {
  const router = useRouter();
  const [cookies] = useCookies(["authentication_token"]);
  const isAuthenticated = Boolean(cookies["authentication_token"]);

  if (!isAuthenticated && !router.pathname.includes("/auth/login")) {
    router.push("/auth/login");
    return <MainLoader />;
  } else if (isAuthenticated && router.pathname.includes("/auth/login")) {
    if (typeof window !== "undefined") router.push("/");
    return <MainLoader />;
  } else if (!isAuthenticated) {
    return children;
  }
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default PageManager;
