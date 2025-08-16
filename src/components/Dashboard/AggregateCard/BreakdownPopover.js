import React, { useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { FaInfoCircle } from "react-icons/fa";
import { Fragment } from "react";

const BreakdownPopover = ({ breakdown }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div onMouseLeave={() => setIsShowing(false)}>
      <Popover className="relative">
        <>
          <PopoverButton
            as="div"
            className="outline-none"
            onMouseEnter={() => setIsShowing(true)}
          >
            <FaInfoCircle className="text-gray-400 cursor-pointer" />
          </PopoverButton>
          <Transition
            as={Fragment}
            show={isShowing}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel anchor={"bottom"} className="shadow-2xl">
              <div className="overflow-hidden rounded-lg  ring-1 ring-black/5">
                <div className="bg-gray-50 p-4">
                  {breakdown.map((item, index) => (
                    <div key={index} className="text-xs">
                      <span className="font-bold text-xs">{item.label}:</span>{" "}
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      </Popover>
    </div>
  );
};

export default BreakdownPopover;
