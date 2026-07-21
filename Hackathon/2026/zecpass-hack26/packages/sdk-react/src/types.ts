/** Shared types for @zecpass/sdk-react */
export interface ZecPassSession {
  session_id: string;
  app_id: string;
  scope: string[];
  zk_proof_hash: string;
  expires_at: number;
}

export interface ZecPassConfig {
  appId: string;
  zecpassUrl?: string;
  redirectUri: string;
  scope?: string[];
}
