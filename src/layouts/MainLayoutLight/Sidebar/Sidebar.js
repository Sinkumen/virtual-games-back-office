import React from "react";
import { RectangleGroupIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Logo from "../../../../public/logo.svg";
import Link from "next/link";
import UserInfoAndAction from "@/components/UserInfoAndAction";
import RoleWrapper from "@/components/RoleWrapper";
import {
  MdGames,
  MdHouse,
  MdPayments,
  MdRoom,
  MdSettings,
} from "react-icons/md";
import Image from "next/image";
import { getAppLogo } from "@/utils/app";
import { FaShop } from "react-icons/fa6";

const Sidebar = () => {
  const router = useRouter();
  const isExactMatch = (path, link) => {
    return path === link;
  };
  const reportOptions = [
    {
      name: "Dashboard",
      href: "/",
      icon: RectangleGroupIcon,
      current: isExactMatch(router.pathname, "/"),
      accessibleTo: ["admin"],
    },
  ];

  const onlineOptions = [
    {
      id: 1,
      name: "Manage Players",
      href: "/online/players",
      icon: UsersIcon,
      current: isExactMatch(router.pathname, "/online/players"),
      accessibleTo: ["admin"],
    },

    {
      id: 2,
      name: "Payment Requests",
      href: "/payment-requests",
      icon: MdPayments,
      current: isExactMatch(router.pathname, "/payment-requests"),
      accessibleTo: ["admin"],
    },
    {
      id: 3,
      name: "Settings",
      href: "/online/settings",
      icon: MdSettings,
      current: isExactMatch(router.pathname, "/online/settings"),
      accessibleTo: ["admin"],
    },
  ];

  const bingoOptions = [
    {
      id: 2,
      name: "Manage Rooms",
      href: "/bingo/rooms",
      icon: MdGames,
      current: isExactMatch(router.pathname, "/bingo/rooms"),
      accessibleTo: ["admin"],
    },

    {
      id: 4,
      name: "Bingo Cards",
      href: "/bingo/bingo-cards",
      icon: RectangleGroupIcon,
      current: isExactMatch(router.pathname, "/bingo/bingo-cards"),
      accessibleTo: ["admin"],
    },
  ];

  const retailOptions = [
    {
      id: 1,
      name: "Manage Agents",
      href: "/manage/agents",
      icon: UsersIcon,
      current: isExactMatch(router.pathname, "/manage/agents"),
      accessibleTo: ["admin"],
    },
    {
      id: 2,
      name: "Manage Shops",
      href: "/manage/shops",
      icon: FaShop,
      current: isExactMatch(router.pathname, "/manage/shops"),
      accessibleTo: ["admin", "agent"],
    },
    {
      id: 2,
      name: "Manage Cashiers",
      href: "/manage/cashiers",
      icon: UsersIcon,
      current: isExactMatch(router.pathname, "/manage/cashiers"),
      accessibleTo: ["admin", "agent"],
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const appLogo = getAppLogo();

  return (
    <div
      className={`flex grow flex-col gap-y-5 overflow-y-auto  bg-white shadow-md pb-4`}
    >
      <div className="h-16 flex items-center sticky top-0 bg-white z-150 py-5 pl-6 border-b-[1px] border-gray-200">
        <Image
          src={appLogo.path}
          alt="Logo"
          width={appLogo.width}
          height={appLogo.height}
        />
      </div>

      <nav className=" flex-1">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <RoleWrapper allowedRoles={["admin"]}>
            <li>
              <p className="text-sm font-semibold leading-6 text-gray-400 ml-6 mb-2">
                Report
              </p>
              <ul role="list" className=" space-y-1">
                {reportOptions.map((item) => (
                  <RoleWrapper key={item.name} allowedRoles={item.accessibleTo}>
                    <li>
                      <Link href={item.href}>
                        <button
                          className={classNames(
                            item.current
                              ? " bg-gradient-to-r from-primary to-primary-light text-white"
                              : "text-gray-600 hover:text-slate-800 hover:bg-slate-200",
                            "group flex gap-x-3 py-3 pl-5 text-sm leading-6 font-semibold w-full"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-gray-400 group-hover:text-slate-800",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </button>
                      </Link>
                    </li>
                  </RoleWrapper>
                ))}
              </ul>
            </li>
            <li>
              <p className="text-xs font-semibold leading-6 text-gray-400 ml-6">
                Online
              </p>
              <ul role="list" className="mt-2 space-y-1">
                {onlineOptions.map((team) => (
                  <RoleWrapper key={team.name} allowedRoles={team.accessibleTo}>
                    <li>
                      <Link href={team.href}>
                        <button
                          className={classNames(
                            team.current
                              ? "bg-gradient-to-r from-primary to-primary-light text-white"
                              : "text-gray-600 hover:text-slate-800 hover:bg-slate-200",
                            "group flex gap-x-3 py-3 pl-5 text-sm leading-6 font-semibold w-full"
                          )}
                        >
                          <team.icon
                            className={classNames(
                              team.current
                                ? "text-white"
                                : "text-gray-400 group-hover:text-slate-800",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {team.name}
                        </button>
                      </Link>
                    </li>
                  </RoleWrapper>
                ))}
              </ul>
            </li>

            <li>
              <p className="text-xs font-semibold leading-6 text-gray-400 ml-6">
                Bingo
              </p>
              <ul role="list" className=" mt-2 space-y-1">
                {bingoOptions.map((team) => (
                  <RoleWrapper key={team.name} allowedRoles={team.accessibleTo}>
                    <li>
                      <Link href={team.href}>
                        <button
                          className={classNames(
                            team.current
                              ? "bg-gradient-to-r from-primary to-primary-light text-white"
                              : "text-gray-600 hover:text-slate-800 hover:bg-slate-200",
                            "group flex gap-x-3 py-3 pl-5 text-sm leading-6 font-semibold w-full"
                          )}
                        >
                          <team.icon
                            className={classNames(
                              team.current
                                ? "text-white"
                                : "text-gray-400 group-hover:text-slate-800",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {team.name}
                        </button>
                      </Link>
                    </li>
                  </RoleWrapper>
                ))}
              </ul>
            </li>
          </RoleWrapper>

          <li>
            <p className="text-xs font-semibold leading-6 text-gray-400 ml-6">
              Retail
            </p>
            <ul role="list" className=" mt-2 space-y-1">
              {retailOptions.map((team) => (
                <RoleWrapper key={team.name} allowedRoles={team.accessibleTo}>
                  <li>
                    <Link href={team.href}>
                      <button
                        className={classNames(
                          team.current
                            ? "bg-gradient-to-r from-primary to-primary-light text-white"
                            : "text-gray-600 hover:text-slate-800 hover:bg-slate-200",
                          "group flex gap-x-3 py-3 pl-5 text-sm leading-6 font-semibold w-full"
                        )}
                      >
                        <team.icon
                          className={classNames(
                            team.current
                              ? "text-white"
                              : "text-gray-400 group-hover:text-slate-800",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {team.name}
                      </button>
                    </Link>
                  </li>
                </RoleWrapper>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
