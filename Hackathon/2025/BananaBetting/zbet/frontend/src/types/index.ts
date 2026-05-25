// User types
export interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  zcash_account?: string;
  zcash_address?: string;
  zcash_transparent_address?: string;
  balance?: string; // Legacy field
  transparent_balance?: number;
  shielded_balance?: number;
  last_balance_update?: string;
  balance_version?: number;
}

export interface UserCreate {
  email: string;
  username: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Authentication types
export interface AuthToken {
  access_token: string;
  token_type: string;
}

// Betting types
export interface Bet {
  id: string;
  title: string;
  description: string;
  odds: number;
  minimumBet: number;
  maximumBet: number;
  category: "baseball" | "banana-antics" | "crowd-fun" | "player-props";
  status: "open" | "closed" | "settled" | "paidout";
  outcome?: "win" | "loss" | "push";
  createdAt: string;
  settlementDate?: string;
}

export interface UserBet {
  id: string;
  betId: string;
  bet: Bet;
  amount: number;
  potentialPayout: number;
  status: "pending" | "won" | "lost" | "cancelled";
  placedAt: string;
  settledAt?: string;
}

// Wallet types
export interface WalletInfo {
  address: string;
  balance: number;
  isConnected: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Search/Filter types
export interface BetFilters {
  category?: string;
  minOdds?: number;
  maxOdds?: number;
  searchTerm?: string;
}

// Transaction tracking types
export interface Transaction {
  id: number;
  transaction_type: string;
  amount: number;
  status: string;
  created_at: string;
  confirmed_at?: string;
  description?: string;
  from_address?: string;
  to_address?: string;
  from_address_type?: string;
  to_address_type?: string;
  shielded_balance_before: number;
  transparent_balance_before: number;
  shielded_balance_after: number;
  transparent_balance_after: number;
  zcash_transaction_id?: string;
  operation_id?: string;
  block_height?: number;
  confirmations: number;
  network_fee: number;
  sport_event_id?: number;
  bet_id?: number;
  payout_id?: number;
}

export interface UserBalanceSummary {
  user_id: number;
  shielded_balance: number;
  transparent_balance: number;
  total_balance: number;
  pending_debits: number;
  pending_credits: number;
  available_balance: number;
  last_balance_update: string;
  balance_version: number;
  recent_transactions: Array<{
    id: number;
    type: string;
    amount: number;
    status: string;
    created_at: string;
    description?: string;
  }>;
}

export interface TransactionHistoryRequest {
  transaction_types?: string[];
  limit?: number;
  offset?: number;
  start_date?: string;
  end_date?: string;
}

export interface TransactionHistoryResponse {
  transactions: Transaction[];
  total_count: number;
  has_more: boolean;
}

export interface DepositRequest {
  amount: number;
  from_address: string;
  zcash_transaction_id: string;
  address_type?: string;
  confirmations?: number;
}

export interface WithdrawalRequest {
  amount: number;
  to_address: string;
  address_type?: string;
  memo?: string;
}

export interface BalanceReconciliation {
  id: number;
  reconciliation_date: string;
  total_users_checked: number;
  discrepancies_found: number;
  total_shielded_pool_blockchain: number;
  total_shielded_pool_database: number;
  total_transparent_pool_blockchain: number;
  total_transparent_pool_database: number;
  reconciliation_status: string;
  notes?: string;
}

export interface UserBalanceReconciliation {
  id: number;
  user_id: number;
  database_shielded_balance: number;
  database_transparent_balance: number;
  calculated_shielded_balance: number;
  calculated_transparent_balance: number;
  shielded_discrepancy: number;
  transparent_discrepancy: number;
  has_discrepancy: boolean;
  discrepancy_resolved: boolean;
  resolution_notes?: string;
  resolved_at?: string;
}
