import React, { useState } from "react";
import { MdClose, MdEdit } from "react-icons/md";
import Preview from "../Preview";
import SettingsForm from "@/contents/Admin/Forms/SettingsForm";

const SettingTitleMap = {
  walletSettings: "Wallet Settings",
  rewardSettings: "Rewards Settings",
  bingoSettings: "Bingo Settings",
};

const Setting = ({ settingIdentifier, setting }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const title = SettingTitleMap[settingIdentifier] || "Settings";

  return (
    <div>
      <div className="flex items-center justify-between ">
        <p className="text-lg font-semibold">{title}</p>
        <button
          onClick={toggleEditing}
          className="text-lg p-2 rounded-lg bg-gray-200 hover:bg-gray-300 hover:cursor-pointer transition-colors"
        >
          {isEditing ? <MdClose /> : <MdEdit />}
        </button>
      </div>
      {isEditing ? (
        <>
          <SettingsForm
            setting={setting}
            settingIdentifier={settingIdentifier}
            onSuccess={toggleEditing}
          />
        </>
      ) : (
        <Preview setting={setting} settingIdentifier={settingIdentifier} />
      )}
    </div>
  );
};

export default Setting;
