import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React, { useState } from "react";
import AppButton from "../AppButton";
import { MdAdd, MdMoreVert } from "react-icons/md";

const AppTab = ({
  title,
  tabs,
  tabPanels,
  TabMoreOptions,
  AddTabComponent,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]); // Initialize with first tab

  return (
    <TabGroup
      selectedIndex={tabs.findIndex((tab) => tab.id === activeTab?.id)}
      onChange={(index) => setActiveTab(tabs[index])}
      className="flex flex-col"
    >
      <TabList className="border-b-2 border-primary bg-white sticky top-0 z-10 flex justify-between">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActiveTab = tab.id === activeTab?.id;
            return (
              <div
                key={tab.id}
                className={`flex rounded-tl-lg rounded-tr-lg overflow-clip items-center ${
                  isActiveTab
                    ? "bg-primary hover:bg-primary/80"
                    : "hover:bg-primary/10 border-1 border-primary"
                }`}
              >
                <Tab
                  className={`capitalize px-4 text-nowrap  py-1 text-sm/6 font-semibold text-primary focus:outline-none ${
                    isActiveTab ? "bg-primary/20 text-white" : ""
                  }`}
                >
                  {tab.content}
                </Tab>
                {TabMoreOptions}
              </div>
            );
          })}
        </div>
        {AddTabComponent}
        <div className="flex items-center gap-2">
          {title && (
            <p className="px-4 text-primary font-bold text-sm text-nowrap">
              {title}
            </p>
          )}
        </div>
      </TabList>
      <TabPanels className="flex-1 overflow-y-auto p-1">
        {tabPanels.map((panel) => (
          <TabPanel key={panel.id} className="focus:outline-none">
            {panel.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default AppTab;
