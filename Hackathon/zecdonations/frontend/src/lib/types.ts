export type CampaignCategory = "Proposal" | "Birthday" | "General";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  goalZec: number;
  receivedZec: number;
  category: CampaignCategory;
  cover?: string; // data URL or URL
  address: string;
  createdAt: number;
  creator: {
    name: string;
    handle: string;
    avatar: string; // data URL or identicon URL
  };
  transactions: Array<{
    id: string;
    amount: number;
    memo?: string;
    timestamp: number;
    txHash: string;
  }>;
}


