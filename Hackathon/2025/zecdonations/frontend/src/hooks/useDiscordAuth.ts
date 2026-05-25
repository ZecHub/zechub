"use client";
import { useState, useEffect, useCallback } from "react";
import { API_ENDPOINTS } from "@/lib/constants";
import { getAuthToken } from "@/lib/utils";

export interface DiscordUser {
  discord_id: string;
  username: string;
  discriminator?: string;
  avatar?: string;
  email?: string;
}

export function useDiscordAuth() {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // First check for discord_user cookie (set during callback)
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("discord_user="));

      if (cookieValue) {
        try {
          // Parse the cookie value
          const userFromCookie = JSON.parse(
            decodeURIComponent(cookieValue.split("=")[1])
          );
          if (userFromCookie && userFromCookie.discord_id) {
            setUser(userFromCookie);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Error parsing user cookie:", e);
          // Continue to API call if cookie parsing fails
        }
      }
      const response = await fetch("/api/auth/user", {
        credentials: "include", // Important for cookies
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setError("Failed to check authentication");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login with Discord
  const login = useCallback(() => {
    // Redirect to Discord OAuth through our frontend API route
    window.location.href = "/api/auth/discord";
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      setError(null);
      await fetch("/api/auth/logout", {
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to logout");
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Get user display name
  const displayName = user
    ? user.discriminator
      ? `${user.username}#${user.discriminator}`
      : user.username
    : null;

  // Get user avatar URL
  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}.png`
    : null;

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    displayName,
    avatarUrl,
    login,
    logout,
    checkAuth,
  };
}
