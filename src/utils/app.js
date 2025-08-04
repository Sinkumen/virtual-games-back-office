import {
  ABOL_TENANT_ID,
  SCORE_TENANT_ID,
  SKY_TENANT_ID,
} from "@/constants/tenant";

/**
 *
 * @returns {{path: string, width: number, height: number, authWidth: number, authHeight: number}} An object containing the logo's properties:
 * - `path` (string): The path to the logo image file (e.g., "/logos/abol_games_logo.svg" or "/logos/logo.svg").
 * - `width` (number): The display width of the logo in pixels.
 * - `height` (number): The display height of the logo in pixels.
 */
export const getAppLogo = () => {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  const tenantLogos = {
    [ABOL_TENANT_ID]: {
      path: "/logos/abol_games_logo.svg",
      width: 75,
      height: 75,
      authWidth: 150,
      authHeight: 150,
    },
    [SKY_TENANT_ID]: {
      path: "/logos/sky_bingo_logo.svg",
      width: 75,
      height: 75,
      authWidth: 150,
      authHeight: 150,
    },
  };

  return (
    tenantLogos[tenantId] || {
      path: "/logos/logo.svg",
      width: 30,
      height: 30,
      authWidth: 100,
      authHeight: 100,
    }
  );
};

export const getAppName = () => {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  const tenantNames = {
    [ABOL_TENANT_ID]: "Admin - Abol Games",
    [SCORE_TENANT_ID]: "Admin - Score Games",
  };

  return tenantNames[tenantId] || "Bingo";
};
