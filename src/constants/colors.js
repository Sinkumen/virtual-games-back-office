import { ABOL_TENANT_ID, SKY_TENANT_ID } from "./tenant";

const tenantColors = {
  [ABOL_TENANT_ID]: "#f5b617",
  [SKY_TENANT_ID]: "#00aaff",
};

const tenantLightColors = {
  [ABOL_TENANT_ID]: "#ffde8c",
  [SKY_TENANT_ID]: "#ade3ff",
};

export const getTenantLightColor = (tenantId) => {
  return tenantLightColors[tenantId] || "#8cd18d";
};

export const getTenantColor = (tenantId) => {
  return tenantColors[tenantId] || "#048007";
};

export const chipColor = (type) => {
  switch (type) {
    case "won":
    case "win":
      return { textColor: `text-[#4caf50]`, bgColor: `bg-[#4caf50]/20` }; // Green for win
    case "lost":
    case "bet":
      return { textColor: `text-[#f44336]`, bgColor: `bg-[#f44336]/20` }; // Red for loss
    case "deposit":
    case "chapa_deposit":
      return { textColor: `text-[#2196f3]`, bgColor: `bg-[#2196f3]/20` }; // Blue for deposit
    case "withdrawal":
    case "chapa_withdrawal":
      return { textColor: `text-[#ff9800]`, bgColor: `bg-[#ff9800]/20` }; // Orange for withdrawal
    default:
      return { textColor: `text-[#000000]`, bgColor: `bg-[#9e9e9e]/20` }; // Grey for default
  }
};
