export const COLORS = {
  background: "#0D1B2A",
  teal: "#00C2A8",
  purple: "#7C3AED",
  lightGray: "#F3F4F6",
  textPrimary: "#E5E7EB",
  textSecondary: "#9CA3AF",
};

export const FONTS = {
  body: "InterVariable",
  display: "Space Grotesk Variable",
};

// Base URL for backend API
// Priority: explicit env -> dev default -> production
export const API_BASE_URL = "https://teslasdev.com";

export const API_ENDPOINTS = {
  AUTH: {
    DISCORD: `${API_BASE_URL}/api/auth/discord`,
    USER: `${API_BASE_URL}/api/auth/user`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  },
  CAMPAIGNS: `${API_BASE_URL}/api/campaigns`,
  DONATIONS: `${API_BASE_URL}/api/donations`,
};

