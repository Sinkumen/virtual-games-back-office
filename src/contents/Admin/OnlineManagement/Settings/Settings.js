import { useGetOnlineTenantSetting } from "@/api/services/tenantServices";
import React from "react";
import Setting from "./Setting";
import SettingsSkeleton from "./SettingsSkeleton";

const Settings = () => {
  const { data: tenantSettingsResponse, isLoading } =
    useGetOnlineTenantSetting();

  if (isLoading) return <SettingsSkeleton />;

  const tenantSettings = tenantSettingsResponse?.data?.data;

  const settings = [
    {
      settingIdentifier: "rewardSettings",
      setting: tenantSettings?.rewardSettings,
    },
    {
      settingIdentifier: "walletSettings",
      setting: tenantSettings?.walletSettings,
    },
    {
      settingIdentifier: "bingoSettings",
      setting: tenantSettings?.bingoSettings,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 items-start">
        {settings.map((setting) => (
          <SettingsCard key={setting.settingIdentifier}>
            <Setting
              settingIdentifier={setting.settingIdentifier}
              setting={setting.setting}
            />
          </SettingsCard>
        ))}
      </div>
    </div>
  );
};

const SettingsCard = ({ children }) => {
  return (
    <div className="flex-1 ring-1 ring-gray-300 p-4 rounded-lg ">
      {children}
    </div>
  );
};

export default Settings;
