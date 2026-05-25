"use client";
import { useLocalStorage } from "./useLocalStorage";

export type CampaignCategory = "Proposal" | "Birthday" | "General";

export interface CampaignData {
  id: string;
  title: string;
  description: string;
  goalZec: number;
  receivedZec: number;
  category: CampaignCategory;
  cover?: string; // data URL
  address: string;
  createdAt: number;
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useLocalStorage<CampaignData[]>("campaigns", []);

  function addCampaign(newCampaign: CampaignData) {
    setCampaigns([newCampaign, ...campaigns]);
  }

  return { campaigns, addCampaign };
}


