import React from "react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";

// import Logo from "../../../../public/black_logo.svg";
import Logo from "../../../../public/logo.svg";
import UserInfoAndAction from "@/components/UserInfoAndAction";
import Image from "next/image";
import { getAppLogo } from "@/utils/app";

const AppBar = ({ setSidebarOpen, noSidebar }) => {
  const appLogo = getAppLogo();
  return (
    <div className="sticky top-0 z-40 flex h-10 2xs:h-13 1xs:h-15 shrink-0 items-center justify-between gap-x-4 bg-white border-b-[1px] border-gray-300 px-4 shadow-md sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex gap-2">
        {!noSidebar && (
          <button
            type="button"
            className={`-m-2.5 p-2.5 text-gray-700 lg:hidden`}
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        )}

        <Image
          src={appLogo.path}
          alt="Logo"
          width={appLogo.width}
          height={appLogo.height}
          className={!noSidebar && "lg:hidden"}
        />
      </div>

      <div className="flex gap-2">
        <UserInfoAndAction />
      </div>
    </div>
  );
};

export default AppBar;
