import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { jwtDecode } from "jwt-decode";
import React, { Fragment, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { MdEdit, MdLogout, MdMoney, MdMoreVert } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import UserContext from "@/contexts/UserContext";

import { useUserContext } from "@/contexts/UserContext/UserContextProvider";
import Image from "next/image";
import CashierBalance from "../Cashiers/CashierBalance";
import RoleWrapper from "../RoleWrapper";
import CashierReport from "../Cashiers/CashierReport";

const UserInfoAndAction = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, setUser } = useUserContext();

  const [cookies, setCookie, removeCookie] = useCookies([
    "authentication_token",
  ]);

  const queryClient = useQueryClient();
  const handleLogout = () => {
    removeCookie("authentication_token", { path: "/" });
    queryClient.clear();
    setUser();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex gap-2">
      <RoleWrapper allowedRoles={["cashier"]}>
        {user && <CashierBalance />}
      </RoleWrapper>

      <RoleWrapper allowedRoles={["cashier"]}>
        <CashierReport />
      </RoleWrapper>

      <Menu>
        {({ open }) => {
          return (
            <div className="flex items-center">
              <MenuButton
                onClick={toggleMenu}
                className=" w-full items-center justify-between text-sm/6 font-semibold  hover:cursor-pointer focus:outline-none "
              >
                <Image
                  width={0}
                  height={0}
                  className="w-5 h-5 2xs:h-8 2xs:w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1525357816819-392d2380d821?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGJsYWNrJTIwdXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                />
              </MenuButton>

              <Transition
                show={(isMenuOpen && isModalOpen) || open}
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="rounded-md shadow-xl bg-white dark:bg-app-dark text-sm/6 p-4 self-center z-50 mt-2 focus:outline-none"
                >
                  {user && (
                    <p
                      className=" text-xs 2xs:text-md text-center w-full font-bold text-gray-600 p-2 bg-gray-100 rounded-md mb-2 "
                      aria-hidden="true"
                    >
                      {user.username}
                    </p>
                  )}
                  <RoleWrapper allowedRoles={["admin", "agent"]}>
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-2 rounded p-3 hover:bg-slate-200"
                      >
                        <MdLogout className="size-4 " />
                        Change Password
                      </button>
                    </MenuItem>
                  </RoleWrapper>

                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="group flex w-full items-center gap-2 rounded p-3 hover:bg-slate-200 dark:hover:bg-dark-container"
                    >
                      <MdLogout className="size-4 " />
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </div>
          );
        }}
      </Menu>
    </div>
  );
};

export default UserInfoAndAction;
