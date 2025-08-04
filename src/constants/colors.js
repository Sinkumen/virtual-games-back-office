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
