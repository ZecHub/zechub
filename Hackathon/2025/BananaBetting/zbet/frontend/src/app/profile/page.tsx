'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Wallet, 
  Settings, 
  Shield, 
  Bell, 
  Eye, 
  EyeOff, 
  Copy, 
  RefreshCw,
  Edit,
  Save,
  X,
  Send,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn, formatZcash, getRandomBananaEmoji } from '@/lib/utils';
import Disclaimer from '@/components/Disclaimer';

type Transaction = {
  id: string;
  description: string;
  date: string;
  type: 'win' | 'loss';
  amount: number;
};

export default function ProfilePage() {
  const { user, logout, refreshBalance } = useAuth();
  const router = useRouter();
  const [emoji, setEmoji] = useState('🍌');
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [cashoutForm, setCashoutForm] = useState({
    recipientAddress: '',
    memo: '',
    amount: ''
  });
  const [cashoutLoading, setCashoutLoading] = useState(false);
  const [cashoutResult, setCashoutResult] = useState<{
    success: boolean;
    message: string;
    transactionId?: string;
  } | null>(null);
  const [operationStatus, setOperationStatus] = useState<{
    status: string;
    transaction_id?: string;
    error?: string;
  } | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [manualOperationId, setManualOperationId] = useState('');
  const [refreshingBalance, setRefreshingBalance] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [shieldingFunds, setShieldingFunds] = useState(false);
  const [shieldResult, setShieldResult] = useState<{ 
    status: string; 
    message: string; 
    operation_id?: string; 
  } | null>(null);

  useEffect(() => {
    setEmoji(getRandomBananaEmoji());
  }, []);

  // Real wallet data from authenticated user
  const walletData = {
    shieldedAddress: user?.zcash_address || 'Not available',
    transparentAddress: user?.zcash_transparent_address || 'Not available',
    balance: user?.transparent_balance != null && user?.shielded_balance != null 
      ? user.transparent_balance + user.shielded_balance 
      : parseFloat(user?.balance || '0'),
    isConnected: !!user?.zcash_address,
    transactions: [] as Transaction[]
  };

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    privacy: {
      showStats: true,
      showWins: true,
      publicProfile: false
    },
    betting: {
      autoConfirm: false,
      maxBetAmount: 1.0,
      favoriteCategory: 'banana-antics'
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User, emoji: '👤' },
    { id: 'wallet', name: 'Wallet', icon: Wallet, emoji: '💰' },
    { id: 'cashout', name: 'Cashout', icon: Send, emoji: '💸' },
    { id: 'settings', name: 'Settings', icon: Settings, emoji: '⚙️' },
    { id: 'security', name: 'Security', icon: Shield, emoji: '🔒' }
  ];

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    console.log('Saving profile:', editedUser);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedUser({
      username: user?.username || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification
    alert('Copied to clipboard! 📋');
  };

  const handleRefreshBalance = async () => {
    setRefreshingBalance(true);
    setRefreshMessage(null);
    
    try {
      await refreshBalance();
      setRefreshMessage({ type: 'success', text: 'Balance refreshed successfully! 🔄' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setRefreshMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to refresh balance:', error);
      setRefreshMessage({ 
        type: 'error', 
        text: 'Failed to refresh balance. Please try again.' 
      });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setRefreshMessage(null);
      }, 5000);
    } finally {
      setRefreshingBalance(false);
    }
  };

  const handleShieldFunds = async () => {
    setShieldingFunds(true);
    setShieldResult(null);
    
    try {
      // Import the API functions
      const { zcashApi } = await import('@/lib/api');
      
      // Shield all transparent funds (passing null amount)
      const result = await zcashApi.shieldFunds();
      
      setShieldResult({
        status: result.status,
        message: result.message,
        operation_id: result.operation_id
      });
      
      // If successful, refresh the balance to show updated amounts
      if (result.status === 'success') {
        setTimeout(() => {
          handleRefreshBalance();
        }, 1000);
      }
      
    } catch (error: any) {
      console.error('Failed to shield funds:', error);
      setShieldResult({
        status: 'error',
        message: error.message || 'Failed to shield transparent funds'
      });
    } finally {
      setShieldingFunds(false);
    }
  };

  const handleCashoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCashoutLoading(true);
    setCashoutResult(null);
    
    try {
      // Import tokenManager here to avoid server-side issues
      const { tokenManager } = await import('@/lib/api');
      
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/api/users/me/cashout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipient_address: cashoutForm.recipientAddress,
          amount: parseFloat(cashoutForm.amount),
          memo: cashoutForm.memo || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to process cashout');
      }

      // Success
      setCashoutResult({
        success: true,
        message: data.message,
        transactionId: data.transaction_id,
      });

      // Clear form on success
      setCashoutForm({
        recipientAddress: '',
        memo: '',
        amount: ''
      });

    } catch (error: any) {
      console.error('Cashout error:', error);
      setCashoutResult({
        success: false,
        message: error.message || 'Failed to process cashout',
      });
    } finally {
      setCashoutLoading(false);
    }
  };

  const checkOperationStatus = async (operationId: string) => {
    setCheckingStatus(true);
    setOperationStatus(null);
    
    try {
      const { tokenManager } = await import('@/lib/api');
      const token = tokenManager.getToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/api/users/me/operation-status/${operationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to check operation status');
      }

      setOperationStatus(data);

    } catch (error: any) {
      console.error('Operation status check error:', error);
      setOperationStatus({
        status: 'error',
        error: error.message || 'Failed to check operation status'
      });
    } finally {
      setCheckingStatus(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.span 
              className="text-4xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              👤
            </motion.span>
            <h1 className="font-baseball text-3xl md:text-5xl font-bold text-banana-800">
              My Profile
            </h1>
            <motion.span 
              className="text-4xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🍌
            </motion.span>
          </div>
          <p className="text-lg text-baseball-600 italic">
            Manage your banana-betting experience! 🎪
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-64"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200">
              {/* User Avatar */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-banana-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">{emoji}</span>
                </div>
                <h3 className="font-bold text-lg text-baseball-800">{user?.username}</h3>
                <p className="text-sm text-baseball-600">{user?.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left',
                      activeTab === tab.id
                        ? 'bg-banana-500 text-white shadow-md'
                        : 'text-baseball-700 hover:bg-banana-100'
                    )}
                  >
                    <span className="text-lg">{tab.emoji}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-baseball-800">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-banana-500 text-white rounded-lg hover:bg-banana-600 transition-colors"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center space-x-2 px-4 py-2 bg-grass-500 text-white rounded-lg hover:bg-grass-600 transition-colors"
                        >
                          <Save size={16} />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <X size={16} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-baseball-700 mb-2">
                        Username
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.username}
                          onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                          className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500"
                        />
                      ) : (
                        <p className="text-lg text-baseball-800">{user?.username}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-baseball-700 mb-2">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                          className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500"
                        />
                      ) : (
                        <p className="text-lg text-baseball-800">{user?.email}</p>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* Wallet Tab */}
              {activeTab === 'wallet' && (
                <div>
                  <h2 className="text-2xl font-bold text-baseball-800 mb-6">Wallet Management</h2>
                  
                  {/* Balance Card */}
                  <div className="bg-gradient-to-r from-banana-400 to-banana-500 rounded-xl p-6 text-white mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-banana-100 mb-1">Total Balance</p>
                        <p className="text-4xl font-bold mb-2">{formatZcash(walletData.balance)}</p>
                        <p className="text-banana-100 text-sm">
                          Last updated: {user?.last_balance_update ? 
                            new Date(user.last_balance_update).toLocaleString() : 
                            'Never'
                          }
                        </p>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-4xl">💰</div>
                        <button
                          onClick={handleRefreshBalance}
                          disabled={refreshingBalance}
                          className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RefreshCw size={20} className={refreshingBalance ? 'animate-spin' : ''} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Addresses */}
                  <div className="mb-6 space-y-4">
                    {/* Shielded Address */}
                    <div>
                      <label className="block text-sm font-medium text-baseball-700 mb-2">
                        Shielded Address (Private)
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 px-4 py-3 bg-gray-50 border border-banana-300 rounded-lg overflow-x-auto min-w-0 w-0">
                          <p className="font-mono text-sm text-gray-800 whitespace-nowrap">
                            {showAddress ? walletData.shieldedAddress : '••••••••••••••••••••••••••••••••••••'}
                          </p>
                        </div>
                        <button
                          onClick={() => setShowAddress(!showAddress)}
                          className="p-3 bg-banana-500 text-white rounded-lg hover:bg-banana-600 transition-colors"
                        >
                          {showAddress ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(walletData.shieldedAddress)}
                          className="p-3 bg-grass-500 text-white rounded-lg hover:bg-grass-600 transition-colors"
                        >
                          <Copy size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Transparent Address */}
                    <div>
                      <label className="block text-sm font-medium text-baseball-700 mb-2">
                        Transparent Address (Public)
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 px-4 py-3 bg-gray-50 border border-banana-300 rounded-lg overflow-x-auto min-w-0 w-0">
                          <p className="font-mono text-sm text-gray-800 whitespace-nowrap">
                            {showAddress ? walletData.transparentAddress : '••••••••••••••••••••••••••••••••••••'}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(walletData.transparentAddress)}
                          className="p-3 bg-grass-500 text-white rounded-lg hover:bg-grass-600 transition-colors"
                        >
                          <Copy size={20} />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Connection Status */}
                  <div className="mb-6">
                    <div className={cn(
                      "flex items-center justify-between p-4 border rounded-lg",
                      walletData.isConnected 
                        ? "bg-grass-50 border-grass-200"
                        : "bg-red-50 border-red-200"
                    )}>
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          walletData.isConnected ? "bg-grass-500" : "bg-red-500"
                        )}></div>
                        <span className={cn(
                          "font-medium",
                          walletData.isConnected ? "text-grass-800" : "text-red-800"
                        )}>
                          {walletData.isConnected ? "Wallet Connected" : "Wallet Not Available"}
                        </span>
                      </div>
                      {walletData.isConnected && (
                        <div className="text-sm text-grass-600">
                          Balance Version: {user?.balance_version || 1}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shield Funds Section */}
                  {user?.transparent_balance && parseFloat(user.transparent_balance.toString()) > 0 && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-blue-800 mb-2">Shield Your Funds</h3>
                          <p className="text-sm text-blue-700 mb-3">
                            You have {formatZcash(parseFloat(user.transparent_balance.toString()))} in your transparent address.
                            Shield these funds for enhanced privacy by moving them to your shielded pool.
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={handleShieldFunds}
                            disabled={shieldingFunds}
                            className={cn(
                              "flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors",
                              shieldingFunds
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            )}
                          >
                            {shieldingFunds ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Shielding...</span>
                              </>
                            ) : (
                              <>
                                <ArrowUpRight size={16} />
                                <span>Shield Funds</span>
                                <Shield size={16} />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Shield Result */}
                      {shieldResult && (
                        <div className={cn(
                          "mt-4 p-3 rounded-lg border",
                          shieldResult.status === 'success' 
                            ? "bg-green-50 border-green-200 text-green-800" 
                            : shieldResult.status === 'no_funds'
                            ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                            : "bg-red-50 border-red-200 text-red-800"
                        )}>
                          <div className="flex items-start space-x-2">
                            <div className="text-lg">
                              {shieldResult.status === 'success' ? '✅' : 
                               shieldResult.status === 'no_funds' ? '⚠️' : '❌'}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{shieldResult.message}</p>
                              {shieldResult.operation_id && (
                                <div className="mt-2">
                                  <p className="text-xs font-medium">Operation ID:</p>
                                  <p className="text-xs font-mono bg-white/50 px-2 py-1 rounded">
                                    {shieldResult.operation_id}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => setShieldResult(null)}
                            className="mt-2 text-xs underline hover:no-underline"
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Refresh Message */}
                  {refreshMessage && (
                    <div className={cn(
                      "mb-6 p-4 rounded-lg border",
                      refreshMessage.type === 'success' 
                        ? "bg-green-50 border-green-200 text-green-800" 
                        : "bg-red-50 border-red-200 text-red-800"
                    )}>
                      <p className="font-medium">{refreshMessage.text}</p>
                    </div>
                  )}

                  {/* Recent Transactions */}
                  <div>
                    <h3 className="text-lg font-bold text-baseball-800 mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                      {walletData.transactions.length > 0 ? (
                        walletData.transactions.map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between p-4 bg-banana-50 border border-banana-200 rounded-lg">
                            <div>
                              <p className="font-medium text-baseball-800">{tx.description}</p>
                              <p className="text-sm text-baseball-600">{tx.date}</p>
                            </div>
                            <div className={cn(
                              'font-bold',
                              tx.type === 'win' ? 'text-grass-600' : 'text-red-600'
                            )}>
                              {tx.type === 'win' ? '+' : ''}{formatZcash(tx.amount)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-8 bg-banana-50 border border-banana-200 rounded-lg">
                          <p className="text-baseball-600 italic">No transactions yet. Start betting to see your transaction history! 🍌</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-baseball-800 mb-6">Settings</h2>
                  
                  <div className="space-y-8">
                    {/* Notifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-baseball-800 mb-4">Notifications</h3>
                      <div className="space-y-3">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                          <label key={key} className="flex items-center justify-between">
                            <span className="text-baseball-700 capitalize">{key} Notifications</span>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setSettings({
                                ...settings,
                                notifications: { ...settings.notifications, [key]: e.target.checked }
                              })}
                              className="w-5 h-5 text-banana-500 rounded focus:ring-banana-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Privacy */}
                    <div>
                      <h3 className="text-lg font-semibold text-baseball-800 mb-4">Privacy</h3>
                      <div className="space-y-3">
                        {Object.entries(settings.privacy).map(([key, value]) => (
                          <label key={key} className="flex items-center justify-between">
                            <span className="text-baseball-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setSettings({
                                ...settings,
                                privacy: { ...settings.privacy, [key]: e.target.checked }
                              })}
                              className="w-5 h-5 text-banana-500 rounded focus:ring-banana-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Betting Preferences */}
                    <div>
                      <h3 className="text-lg font-semibold text-baseball-800 mb-4">Betting Preferences</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-baseball-700">Auto-confirm bets</span>
                          <input
                            type="checkbox"
                            checked={settings.betting.autoConfirm}
                            onChange={(e) => setSettings({
                              ...settings,
                              betting: { ...settings.betting, autoConfirm: e.target.checked }
                            })}
                            className="w-5 h-5 text-banana-500 rounded focus:ring-banana-500"
                          />
                        </label>
                        
                        <div>
                          <label className="block text-sm font-medium text-baseball-700 mb-2">
                            Maximum Bet Amount (ZEC)
                          </label>
                          <input
                            type="number"
                            step="0.001"
                            value={settings.betting.maxBetAmount}
                            onChange={(e) => setSettings({
                              ...settings,
                              betting: { ...settings.betting, maxBetAmount: parseFloat(e.target.value) }
                            })}
                            className="w-full px-3 py-2 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-baseball-700 mb-2">
                            Favorite Category
                          </label>
                          <select
                            value={settings.betting.favoriteCategory}
                            onChange={(e) => setSettings({
                              ...settings,
                              betting: { ...settings.betting, favoriteCategory: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500"
                          >
                            <option value="banana-antics">Banana Antics 🍌</option>
                            <option value="player-props">Player Props ⚾</option>
                            <option value="crowd-fun">Crowd Fun 🎭</option>
                            <option value="baseball">Baseball ⚾</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cashout Tab */}
              {activeTab === 'cashout' && (
                <div>
                  <h2 className="text-2xl font-bold text-baseball-800 mb-6">Send Funds</h2>
                  
                  {/* Current Balance Display */}
                  <div className="bg-gradient-to-r from-banana-400 to-banana-500 rounded-xl p-6 text-white mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-banana-100 mb-1">Available Balance</p>
                        <p className="text-3xl font-bold">{formatZcash(walletData.balance)}</p>
                        <p className="text-banana-100 text-sm mt-1">
                          Ready to send 🚀
                        </p>
                      </div>
                      <div className="text-4xl">💸</div>
                    </div>
                  </div>

                  <form onSubmit={handleCashoutSubmit} className="space-y-6">
                    {/* Recipient Address */}
                    <div>
                      <label className="block text-sm font-medium text-baseball-700 mb-2">
                        Recipient Address *
                      </label>
                      <input
                        type="text"
                        value={cashoutForm.recipientAddress}
                        onChange={(e) => setCashoutForm({ ...cashoutForm, recipientAddress: e.target.value })}
                        placeholder="Enter Zcash address (z... or t...)"
                        className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 font-mono text-sm"
                        required
                      />
                      <p className="text-xs text-baseball-600 mt-1">
                        Supports both shielded (z...) and transparent (t...) addresses
                      </p>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium text-baseball-700 mb-2">
                        Amount (ZEC) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.00000001"
                          min="0.00000001"
                          max={walletData.balance}
                          value={cashoutForm.amount}
                          onChange={(e) => setCashoutForm({ ...cashoutForm, amount: e.target.value })}
                          placeholder="0.00000000"
                          className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setCashoutForm({ ...cashoutForm, amount: walletData.balance.toString() })}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-banana-100 text-banana-700 text-sm rounded hover:bg-banana-200 transition-colors"
                        >
                          Max
                        </button>
                      </div>
                      <p className="text-xs text-baseball-600 mt-1">
                        Available: {formatZcash(walletData.balance)}
                      </p>
                    </div>

                    {/* Memo */}
                    <div>
                      <label className="block text-sm font-medium text-baseball-700 mb-2">
                        Memo (Optional)
                      </label>
                      <textarea
                        value={cashoutForm.memo}
                        onChange={(e) => setCashoutForm({ ...cashoutForm, memo: e.target.value })}
                        placeholder="Add a note to this transaction (only visible for shielded transactions)"
                        rows={3}
                        maxLength={512}
                        className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 resize-none"
                      />
                      <p className="text-xs text-baseball-600 mt-1">
                        {cashoutForm.memo.length}/512 characters
                      </p>
                    </div>

                    {/* Warning */}
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="text-yellow-600 mt-0.5">⚠️</div>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-1">Important Notice</h4>
                          <p className="text-sm text-yellow-700">
                            Double-check the recipient address before sending. Cryptocurrency transactions cannot be reversed.
                            Network fees will be deducted from your balance.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Send Button */}
                    <button
                      type="submit"
                      disabled={cashoutLoading}
                      className={cn(
                        "w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-lg font-semibold text-lg transition-colors",
                        cashoutLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-banana-500 text-white hover:bg-banana-600"
                      )}
                    >
                      {cashoutLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Send Funds</span>
                          <span>💸</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Result Display */}
                  {cashoutResult && (
                    <div className={cn(
                      "mt-6 p-4 rounded-lg border",
                      cashoutResult.success
                        ? "bg-grass-50 border-grass-200"
                        : "bg-red-50 border-red-200"
                    )}>
                      <div className="flex items-start space-x-3">
                        <div className={cn(
                          "mt-0.5 text-lg",
                          cashoutResult.success ? "text-grass-600" : "text-red-600"
                        )}>
                          {cashoutResult.success ? "✅" : "❌"}
                        </div>
                        <div className="flex-1">
                          <h4 className={cn(
                            "font-semibold mb-1",
                            cashoutResult.success ? "text-grass-800" : "text-red-800"
                          )}>
                            {cashoutResult.success ? "Transaction Submitted" : "Transaction Failed"}
                          </h4>
                          <p className={cn(
                            "text-sm mb-2",
                            cashoutResult.success ? "text-grass-700" : "text-red-700"
                          )}>
                            {cashoutResult.message}
                          </p>
                          {cashoutResult.success && cashoutResult.transactionId && (
                            <div className="mt-3">
                              <label className="block text-sm font-medium text-grass-700 mb-1">
                                Operation ID
                              </label>
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded font-mono text-sm overflow-x-auto text-gray-900 font-medium">
                                  {cashoutResult.transactionId}
                                </div>
                                <button
                                  onClick={() => navigator.clipboard.writeText(cashoutResult.transactionId!)}
                                  className="p-2 bg-grass-500 text-white rounded hover:bg-grass-600 transition-colors"
                                  title="Copy Operation ID"
                                >
                                  <Copy size={16} />
                                </button>
                                <button
                                  onClick={() => checkOperationStatus(cashoutResult.transactionId!)}
                                  disabled={checkingStatus}
                                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 text-xs"
                                  title="Check Status"
                                >
                                  {checkingStatus ? 'Checking...' : 'Check Status'}
                                </button>
                              </div>
                              <p className="text-xs text-grass-600 mt-1">
                                This is a Zcash operation ID. The transaction is processing asynchronously. 
                                Save this ID to check the final transaction status later.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setCashoutResult(null)}
                        className="mt-3 text-sm text-gray-600 hover:text-gray-800 underline"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {/* Operation Status Display */}
                  {operationStatus && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="text-blue-600 mt-0.5 text-lg">
                          {operationStatus.status === 'success' ? '✅' : 
                           operationStatus.status === 'failed' || operationStatus.status === 'error' ? '❌' : 
                           operationStatus.status === 'executing' ? '⏳' : '🔄'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-800 mb-1">
                            Operation Status: {operationStatus.status.toUpperCase()}
                          </h4>
                          
                          {operationStatus.status === 'success' && operationStatus.transaction_id && (
                            <div className="mt-2">
                              <label className="block text-sm font-medium text-blue-700 mb-1">
                                Final Transaction Hash
                              </label>
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 px-3 py-2 bg-blue-100 border border-blue-300 rounded font-mono text-sm overflow-x-auto text-blue-900 font-medium">
                                  {operationStatus.transaction_id}
                                </div>
                                <button
                                  onClick={() => navigator.clipboard.writeText(operationStatus.transaction_id!)}
                                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                  title="Copy Transaction Hash"
                                >
                                  <Copy size={16} />
                                </button>
                              </div>
                              <p className="text-xs text-blue-600 mt-1">
                                This is the final Zcash transaction hash. You can look this up on a Zcash block explorer.
                              </p>
                            </div>
                          )}
                          
                          {operationStatus.error && (
                            <p className="text-sm text-red-700 mt-2">
                              Error: {operationStatus.error}
                            </p>
                          )}
                          
                          {operationStatus.status === 'executing' && (
                            <p className="text-sm text-blue-700 mt-2">
                              Transaction is being processed by the Zcash network. This may take a few minutes.
                            </p>
                          )}
                          
                          {operationStatus.status === 'queued' && (
                            <p className="text-sm text-blue-700 mt-2">
                              Transaction is queued for processing.
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setOperationStatus(null)}
                        className="mt-3 text-sm text-gray-600 hover:text-gray-800 underline"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {/* Manual Operation Status Check */}
                  <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-baseball-800 mb-4">Check Previous Operation Status</h3>
                    <p className="text-sm text-baseball-600 mb-4">
                      Enter an operation ID from a previous transaction to check its current status.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-baseball-700 mb-2">
                          Operation ID (opid-...)
                        </label>
                        <input
                          type="text"
                          value={manualOperationId}
                          onChange={(e) => setManualOperationId(e.target.value)}
                          placeholder="opid-2bb8c833-8a30-40b5-bfdb-39785d3f2ef4"
                          className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 font-mono text-sm"
                        />
                      </div>
                      
                      <button
                        onClick={() => {
                          if (manualOperationId.trim()) {
                            checkOperationStatus(manualOperationId.trim());
                          }
                        }}
                        disabled={checkingStatus || !manualOperationId.trim()}
                        className={cn(
                          "px-6 py-3 rounded-lg font-medium transition-colors",
                          checkingStatus || !manualOperationId.trim()
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        )}
                      >
                        {checkingStatus ? 'Checking Status...' : 'Check Operation Status'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-baseball-800 mb-6">Security</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-grass-50 border border-grass-200 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Shield className="text-grass-600" size={24} />
                        <h3 className="text-lg font-semibold text-grass-800">Account Security</h3>
                      </div>
                      <p className="text-sm text-grass-700">Your account is secured with modern encryption and authentication.</p>
                    </div>

                    <button className="w-full p-4 bg-banana-500 text-white rounded-lg hover:bg-banana-600 transition-colors font-semibold">
                      Change Password
                    </button>

                    <button className="w-full p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold">
                      Enable Two-Factor Authentication
                    </button>

                    <div className="pt-6 border-t border-banana-200">
                      <button
                        onClick={logout}
                        className="w-full p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Fun Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-banana-200"
        >
          <p className="text-baseball-600 italic mb-4">
            "Stay secure, have fun, and keep those bananas coming!"
          </p>
          <Disclaimer />
        </motion.div>
      </div>
    </div>
  );
}
