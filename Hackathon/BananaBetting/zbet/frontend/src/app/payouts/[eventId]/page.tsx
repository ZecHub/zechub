'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Users, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  RefreshCw,
  AlertCircle,
  Building2,
  ShieldCheck,
  Trophy,
  Receipt,
  Eye,
  CreditCard,
  Banknote,
  Heart
} from 'lucide-react';
import { cn, getRandomBananaEmoji } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { tokenManager } from '@/lib/api';
import Disclaimer from '@/components/Disclaimer';

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// Types for payout processing
interface PayoutRecord {
  user_id: number | null;
  bet_id: number | null;
  payout_amount: number;
  payout_type: 'user_winning' | 'house_fee' | 'creator_fee' | 'validator_fee' | 'charity_fee';
  recipient_address: string;
  house_fee_deducted?: number;
  creator_fee_deducted?: number;
  user?: {
    username: string;
    zcash_address: string;
  };
}

interface Bet {
  id: number;
  user_id: number;
  amount: number;
  predicted_outcome: string;
  outcome: string | null;
  payout_amount: number | null;
  user: {
    username: string;
    zcash_address: string;
  };
}

interface PayoutCalculation {
  event_id: number;
  event_title: string;
  winning_outcome: string;
  total_pool_amount: number;
  winning_pool_amount: number;
  losing_pool_amount: number;
  total_fees: number;
  house_fee: number;
  creator_fee: number;
  validator_fee: number;
  charity_fee: number;
  house_address: string;
  bets: Bet[];
  payout_records: PayoutRecord[];
  nonprofit: {
    id: number;
    name: string;
    zcash_transparent_address: string;
  };
  creator: {
    id: number;
    username: string;
    zcash_address: string;
  };
  fee_percentages: {
    house_fee_percentage: number;
    creator_fee_percentage: number;
    validator_fee_percentage: number;
  };
}

export default function PayoutProcessingPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId as string;
  const { user, isAuthenticated } = useAuth();
  
  const [emoji, setEmoji] = useState('🍌');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payoutCalculation, setPayoutCalculation] = useState<PayoutCalculation | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setEmoji(getRandomBananaEmoji());
    if (isAuthenticated && eventId) {
      fetchPayoutCalculation();
    }
  }, [isAuthenticated, eventId]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const fetchPayoutCalculation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the authentication token
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }
      
      // Fetch payout calculation for this event
      const response = await fetch(`${API_BASE_URL}/api/admin/events/${eventId}/payout-calculation`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`Failed to fetch payout calculation: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Payout calculation data:', data); // Debug log
      console.log('Charity fee:', data.charity_fee);
      console.log('Creator fee:', data.creator_fee);
      console.log('Validator fee:', data.validator_fee);
      console.log('Bets:', data.bets);
      console.log('Payout records:', data.payout_records);
      console.log('Fee percentages:', data.fee_percentages);
      console.log('Winning outcome:', data.winning_outcome);
      console.log('Bet details:');
      data.bets.forEach((bet: any, i: number) => {
        console.log(`  Bet ${i+1}: predicted=${bet.predicted_outcome}, outcome=${bet.outcome}, amount=${bet.amount}`);
      });
      setPayoutCalculation(data);
      
    } catch (err) {
      console.error('Failed to fetch payout calculation:', err);
      setError(err instanceof Error ? err.message : 'Failed to load payout calculation');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayouts = async () => {
    if (!payoutCalculation) return;
    
    setProcessing(true);
    try {
      // Get the authentication token
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }
      
      // This will trigger the actual blockchain transactions
      const response = await fetch(`${API_BASE_URL}/api/admin/events/${eventId}/send-payouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to process payouts: ${response.status}`);
      }
      
      const result = await response.json();
      alert(`Payouts sent successfully! ${result.processed_payouts} blockchain transactions completed. Transaction ID: ${result.transaction_id}`);
      
      // Redirect back to payouts page
      router.push('/payouts');
      
    } catch (err) {
      console.error('Failed to process payouts:', err);
      alert(`Failed to process payouts: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">💰</div>
          <p className="text-banana-700 text-lg">Calculating payouts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !payoutCalculation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-red-600 text-lg mb-4">Failed to load payout calculation</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <button 
              onClick={fetchPayoutCalculation}
              className="bg-banana-400 hover:bg-banana-500 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
            <button 
              onClick={() => router.push('/payouts')}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              Back to Payouts
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to get icon and color for payout type
  const getPayoutTypeDisplay = (payoutType: string) => {
    switch (payoutType) {
      case 'user_winning':
        return {
          icon: <Trophy className="text-yellow-500" size={20} />,
          label: 'WINNING BETTOR',
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          addressType: 'Shielded (Private)'
        };
      case 'house_fee':
        return {
          icon: <Building2 className="text-blue-600" size={20} />,
          label: 'PLATFORM FEE',
          color: 'text-blue-700', 
          bgColor: 'bg-blue-50',
          addressType: 'Shielded (Private)'
        };
      case 'creator_fee':
        return {
          icon: <Users className="text-purple-600" size={20} />,
          label: 'EVENT CREATOR',
          color: 'text-purple-700',
          bgColor: 'bg-purple-50',
          addressType: 'Shielded (Private)'
        };
      case 'validator_fee':
        return {
          icon: <CheckCircle className="text-emerald-600" size={20} />,
          label: 'VALIDATOR REWARD',
          color: 'text-emerald-700',
          bgColor: 'bg-emerald-50',
          addressType: 'Shielded (Private)'
        };
      case 'charity_fee':
        return {
          icon: <Heart className="text-red-500" size={20} />,
          label: 'CHARITY DONATION',
          color: 'text-red-700',
          bgColor: 'bg-red-50',
          addressType: 'Transparent (Public)'
        };
      default:
        return {
          icon: <CreditCard className="text-gray-600" size={20} />,
          label: 'UNKNOWN',
          color: 'text-gray-700',
          bgColor: 'bg-gray-50',
          addressType: 'Unknown'
        };
    }
  };

  // Helper function to get recipient name and address
  const getRecipientInfo = (record: PayoutRecord) => {
    // For validator fees with user info
    if (record.payout_type === 'validator_fee' && record.user) {
      return {
        name: record.user.username,
        address: record.user.zcash_address
      };
    }
    
    // For user winnings - find the corresponding bet
    if (record.payout_type === 'user_winning' && record.bet_id) {
      const bet = payoutCalculation.bets.find(b => b.id === record.bet_id);
      if (bet) {
        return {
          name: bet.user.username,
          address: bet.user.zcash_address
        };
      }
    }
    
    // For house fee
    if (record.payout_type === 'house_fee') {
      return {
        name: 'Banana Betting Platform',
        address: record.recipient_address
      };
    }
    
    // For creator fee
    if (record.payout_type === 'creator_fee') {
      return {
        name: payoutCalculation.creator?.username || 'Event Creator',
        address: record.recipient_address
      };
    }
    
    // For charity fee
    if (record.payout_type === 'charity_fee') {
      return {
        name: payoutCalculation.nonprofit?.name || 'Charity Organization',
        address: record.recipient_address
      };
    }
    
    // Fallback
    return {
      name: 'Unknown Recipient',
      address: record.recipient_address
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => router.push('/payouts')}
              className="flex items-center space-x-2 text-banana-600 hover:text-banana-700 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Payouts</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <motion.span 
                className="text-4xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💰
              </motion.span>
              <h1 className="font-baseball text-3xl md:text-5xl font-bold text-banana-800">
                Payout Receipt
              </h1>
              <motion.span 
                className="text-4xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🧾
              </motion.span>
            </div>
            <p className="text-lg text-baseball-600 italic mb-4">
              Detailed payout breakdown for "{payoutCalculation.event_title}"
            </p>
          </div>
        </motion.div>

        {/* Receipt Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-8 shadow-lg border border-gray-300 mb-8 font-mono"
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <div className="text-center border-b-2 border-dashed border-gray-400 pb-6 mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">🍌 BANANA BETTING 🍌</h2>
            <p className="text-sm text-black font-semibold">PAYOUT RECEIPT</p>
            <p className="text-xs text-gray-800 mt-2">Event #{payoutCalculation.event_id}</p>
            <p className="text-xs text-gray-800">{new Date().toLocaleString()}</p>
          </div>
          
          <div className="space-y-3 text-sm text-black">
            <div className="flex justify-between">
              <span className="font-semibold">EVENT:</span>
              <span className="text-right max-w-md truncate font-medium">{payoutCalculation.event_title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">WINNING OUTCOME:</span>
              <span className="text-right font-bold text-green-700">{payoutCalculation.winning_outcome}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">TOTAL POOL:</span>
              <span className="text-right font-bold">{payoutCalculation.total_pool_amount.toFixed(4)} ZEC</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">TOTAL TRANSACTIONS:</span>
              <span className="text-right font-medium">{payoutCalculation.payout_records.length}</span>
            </div>
          </div>
        </motion.div>

        {/* Payout Records - Loop through actual records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 mb-6 font-mono"
          style={{ maxWidth: '800px', margin: '0 auto 24px' }}
        >
          <div className="border-b border-dashed border-gray-400 pb-3 mb-4">
            <h3 className="text-lg font-bold text-black flex items-center space-x-2">
              <Receipt className="text-orange-500" size={20} />
              <span>PAYOUT TRANSACTIONS ({payoutCalculation.payout_records.length})</span>
            </h3>
            <p className="text-xs text-gray-600 mt-2">These are the exact transactions that will be executed</p>
          </div>
          
          <div className="space-y-4">
            {payoutCalculation.payout_records.length > 0 ? payoutCalculation.payout_records.map((record, index) => {
              const display = getPayoutTypeDisplay(record.payout_type);
              const recipient = getRecipientInfo(record);
              
              return (
                <div key={`payout-${index}`} className={`${index !== payoutCalculation.payout_records.length - 1 ? 'border-b border-dashed border-gray-300 pb-4' : ''}`}>
                  <div className="space-y-2 text-sm text-black">
                    <div className="flex items-center space-x-2 mb-2">
                      {display.icon}
                      <span className="font-bold text-base">#{index + 1} {display.label}</span>
                    </div>
                    
                    <div className="ml-7 space-y-1">
                      <div className="flex justify-between">
                        <span className="font-semibold">RECIPIENT:</span>
                        <span className="text-right font-bold">{recipient.name}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="font-semibold">ADDRESS:</span>
                        <span className="text-right text-xs break-all font-medium">{recipient.address}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="font-semibold">TYPE:</span>
                        <span className="text-right font-medium">{display.addressType}</span>
                      </div>
                      
                      {record.payout_type === 'user_winning' && record.bet_id && (
                        <div className="flex justify-between">
                          <span className="font-semibold">BET ID:</span>
                          <span className="text-right font-medium">#{record.bet_id}</span>
                        </div>
                      )}
                      
                      <div className={`flex justify-between font-bold ${display.color} pt-1 border-t border-dashed border-gray-200`}>
                        <span>AMOUNT:</span>
                        <span className="text-right text-lg">{record.payout_amount.toFixed(4)} ZEC</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-4 text-gray-600">
                <p className="text-sm">No payout records found for this event</p>
              </div>
            )}
          </div>
          
          <div className="border-t-2 border-dashed border-gray-400 pt-3 mt-4">
            <div className="flex justify-between font-bold text-lg text-black">
              <span>TOTAL PAYOUT AMOUNT:</span>
              <span className="text-right">
                {payoutCalculation.payout_records.reduce((sum, record) => sum + record.payout_amount, 0).toFixed(4)} ZEC
              </span>
            </div>
          </div>
        </motion.div>

        {/* Receipt Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 mb-6 font-mono"
          style={{ maxWidth: '800px', margin: '0 auto 24px' }}
        >
          <div className="border-b-2 border-dashed border-gray-400 pb-3 mb-4">
            <h3 className="text-lg font-bold text-black text-center">PAYOUT SUMMARY BY TYPE</h3>
          </div>
          
          <div className="space-y-2 text-sm text-black">
            <div className="border-t-2 border-dashed border-gray-400 pt-3 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>TOTAL TRANSACTIONS:</span>
                <span className="text-right">{payoutCalculation.payout_records.length}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>TOTAL AMOUNT:</span>
                <span className="text-right">
                  {payoutCalculation.payout_records.reduce((sum, record) => sum + record.payout_amount, 0).toFixed(4)} ZEC
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Process Payout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-8"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 font-mono"
               style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-bold text-black mb-2">🚀 READY TO PROCESS 🚀</h3>
              <p className="text-black text-sm font-medium">
                This will execute {payoutCalculation.payout_records.length} Zcash transactions
              </p>
              <p className="text-gray-800 text-xs mt-1 font-medium">
                Total: {payoutCalculation.total_pool_amount.toFixed(4)} ZEC
              </p>
            </div>
            
            <motion.button
              onClick={handleProcessPayouts}
              disabled={processing}
              whileHover={{ scale: processing ? 1 : 1.05 }}
              whileTap={{ scale: processing ? 1 : 0.95 }}
              className={cn(
                "flex items-center space-x-3 px-8 py-3 rounded-lg font-bold transition-all duration-200 mx-auto text-lg",
                processing 
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700 text-white"
              )}
            >
              {processing ? (
                <>
                  <RefreshCw className="animate-spin" size={24} />
                  <span>PROCESSING...</span>
                </>
              ) : (
                <>
                  <Banknote size={24} />
                  <span>SEND PAYOUTS</span>
                  <DollarSign size={24} />
                </>
              )}
            </motion.button>
            
            {!processing && (
              <p className="text-xs text-gray-800 mt-3 text-center font-medium">
                ⚠️ WARNING: This action cannot be undone ⚠️
              </p>
            )}
          </div>
        </motion.div>

        {/* Receipt Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 font-mono text-center"
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <div className="border-t-2 border-dashed border-gray-400 pt-4">
            <p className="text-xs text-black font-semibold mb-2">
              THANK YOU FOR USING BANANA BETTING! 🍌
            </p>
            <p className="text-xs text-gray-800 mb-2 font-medium">
              Transparent for charity, shielded for privacy
            </p>
            <p className="text-xs text-gray-800 font-medium">
              Questions? Contact support@bananabetting.com
            </p>
          </div>
          <div className="mt-4">
            <Disclaimer />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
