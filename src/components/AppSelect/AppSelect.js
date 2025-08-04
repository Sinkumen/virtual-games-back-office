import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AppSelect = ({
  showDescription,
  Icon,
  options = [],
  placeholder = "Select an item",
  value,
  onChange,
  className,
  dense,
}) => {
  return (
    <div className="flex flex-col w-full flex-1 min-w-[150px]">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative w-full">
            <Listbox.Button
              className={`flex divide-x divide-slate-200 rounded-md ring-1 ring-gray-300 w-full ${className}`}
            >
              <div
                className={`flex items-center gap-x-1.5 rounded-l-md px-3 ${
                  dense ? "p-2" : "py-3"
                } text-black shadow-sm w-full `}
              >
                {Icon && (
                  <Icon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                )}
                {value ? (
                  <p className="text-sm font-semibold whitespace-nowrap">
                    {value?.name ||
                      value?.username ||
                      value.shopName ||
                      value?.label}
                  </p>
                ) : (
                  <p className="whitespace-nowrap text-gray-500 text-sm">
                    {placeholder}
                  </p>
                )}
              </div>

              <div
                className={`flex items-center rounded-l-none rounded-r-md p-2 ${
                  dense ? "" : "py-3"
                } bg-slate-200 hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-50`}
              >
                <span className="sr-only">Change published status</span>
                <ChevronDownIcon
                  className="h-5 w-5 text-black"
                  aria-hidden="true"
                />
              </div>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute left-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id || option._id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-slate-600 text-white" : "text-gray-900",
                        "cursor-default select-none p-2 text-sm"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option?.name ||
                              option.username ||
                              option.shopName ||
                              option.label}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-white" : "text-indigo-600"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                        {showDescription && (
                          <p
                            className={classNames(
                              active ? "text-indigo-200" : "text-gray-500",
                              "mt-2"
                            )}
                          >
                            {option.description}
                          </p>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default AppSelect;
