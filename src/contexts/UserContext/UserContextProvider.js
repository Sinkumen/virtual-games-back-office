import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import MainLoader from "@/components/MainLoader";
import GetUserDetailsFailed from "@/components/Errors/GetUserDetailsFailed";
import { useCookies } from "react-cookie";
import { useGetMe } from "@/api/services/userServices";
import { useRouter } from "next/router";

const UserContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [cookies] = useCookies(["authentication_token"]);
  const isAuthenticated = Boolean(cookies["authentication_token"]);

  const { data, isLoading, error } = useGetMe(isAuthenticated);

  useEffect(() => {
    setUser(data?.data?.data?.user);
  }, [data]);

  if (isLoading) {
    return <MainLoader />;
  }

  if (error) {
    return <GetUserDetailsFailed />;
  }
  const isCashier = user?.role === "cashier";
  const isAgent = user?.role === "agent";

  if (isAgent && !router.pathname.includes("/manage")) {
    router.push("/manage/shops");
    return <MainLoader />;
  }
  if (isCashier && !router.pathname.includes("/playground")) {
    router.push("/playground");
    return <MainLoader />;
  }

  if (!isCashier && router.pathname.includes("/playground")) {
    router.push("/");
    return <MainLoader />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
