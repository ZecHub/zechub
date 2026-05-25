import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthToken, User, UserCreate, LoginCredentials } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API functions
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthToken> => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await api.post('/login/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (userData: UserCreate): Promise<User> => {
    const response = await api.post('/register/', userData);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get('/users/me/');
    return response.data;
  },

  checkTokenStatus: async (): Promise<boolean> => {
    try {
      await api.get('/token_status/');
      return true;
    } catch {
      return false;
    }
  },
};

// Zcash API functions
export const zcashApi = {
  getBalance: async (): Promise<{ balance: number; transparent_balance: number; shielded_balance: number }> => {
    const response = await api.get('/zcash/balance/');
    return response.data;
  },

  getAddress: async (): Promise<{ address: string }> => {
    const response = await api.get('/zcash/address/');
    return response.data;
  },

  sendTransaction: async (address: string, amount: number): Promise<any> => {
    const response = await api.post('/zcash/send/', { address, amount });
    return response.data;
  },

  validateAddress: async (address: string): Promise<{ valid: boolean }> => {
    const response = await api.post('/zcash/validate-address/', { address });
    return response.data;
  },

  refreshBalance: async (): Promise<{ address: string; transparent_address: string; balance: number; transparent_balance: number; shielded_balance: number; message: string }> => {
    const response = await api.post('/zcash/refresh-balance/');
    return response.data;
  },

  // New transaction tracking API
  getBalanceSummary: async (): Promise<{
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
  }> => {
    const response = await api.get('/api/users/me/balance');
    return response.data;
  },

  // Shield funds API
  shieldFunds: async (amount?: number): Promise<{
    status: string;
    message: string;
    operation_id?: string;
    amount_shielded?: number;
    from_address?: string;
    to_address?: string;
    transparent_balance_before?: number;
    transparent_balance?: number;
    requested_amount?: number;
    minimum_amount?: number;
    error?: string;
  }> => {
    const response = await api.post('/api/users/me/shield-funds', { amount });
    return response.data;
  },
};

// Statistics interface
export interface Statistics {
  total_bets: number;
  total_events: number;
  total_users: number;
}

// Betting API functions
export const bettingApi = {
  getUserBets: async (): Promise<any[]> => {
    const response = await api.get('/api/users/me/bets');
    return response.data;
  },

  placeBet: async (betData: { sport_event_id: number; predicted_outcome: string; amount: number }): Promise<any> => {
    const response = await api.post('/api/bets', betData);
    return response.data;
  },

  getUserBalance: async (): Promise<{ balance: number; currency: string; transparent_balance: number; shielded_balance: number }> => {
    const response = await api.get('/zcash/balance/');
    return {
      balance: response.data.balance,
      transparent_balance: response.data.transparent_balance,
      shielded_balance: response.data.shielded_balance,
      currency: "ZEC"
    };
  },

  addDeposit: async (amount: number): Promise<{ message: string; new_balance: number; currency: string }> => {
    const response = await api.post('/api/users/me/deposit', { amount });
    return response.data;
  },

  getStatistics: async (): Promise<Statistics> => {
    const response = await api.get('/api/statistics');
    return response.data;
  },
};

// Token management
export const tokenManager = {
  setToken: (token: string) => {
    Cookies.set('auth_token', token, { expires: 7 }); // 7 days
  },

  getToken: () => {
    return Cookies.get('auth_token');
  },

  removeToken: () => {
    Cookies.remove('auth_token');
  },
};

export default api;
