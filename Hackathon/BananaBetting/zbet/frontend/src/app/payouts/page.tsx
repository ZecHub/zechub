'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Calendar,
  Trophy,
  Scale,
  DollarSign,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { cn, getRandomBananaEmoji } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { tokenManager } from '@/lib/api';
import Disclaimer from '@/components/Disclaimer';

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// Types for payouts
interface SettledEvent {
  id: number;
  title: string;
  description: string;
  category: string;
  settled_at: string | null;
  hours_since_settlement: number;
  winning_outcome: string | null;
  bet_count: number;
  total_pool_amount: number;
  ready_for_payout: boolean;
}

export default function PayoutsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [emoji, setEmoji] = useState('🍌');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('settlement'); // settlement, amount, count
  const [settledEvents, setSettledEvents] = useState<SettledEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingEventId, setProcessingEventId] = useState<number | null>(null);

  useEffect(() => {
    setEmoji(getRandomBananaEmoji());
    if (isAuthenticated) {
      fetchSettledEvents();
    }
  }, [isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const fetchSettledEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the authentication token
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }
      
      // Get settled events that are ready for payout processing
      const response = await fetch(`${API_BASE_URL}/api/admin/settled-events`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch settled events: ${response.status}`);
      }
      
      const data = await response.json();
      setSettledEvents(data.settled_events || []);
      
    } catch (err) {
      console.error('Failed to fetch settled events:', err);
      setError(err instanceof Error ? err.message : 'Failed to load settled events');
    } finally {
      setLoading(false);
    }
  };

  const handlePayout = async (eventId: number) => {
    try {
      setProcessingEventId(eventId);
      
      // Get the authentication token
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }
      
      // First, call process-payouts to create the payout records
      const response = await fetch(`${API_BASE_URL}/api/admin/events/${eventId}/process-payouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to process payouts: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Payout processing result:', result);
      
      // Navigate to the payout detail page to show the created records
      router.push(`/payouts/${eventId}`);
      
    } catch (err) {
      console.error('Failed to process payouts:', err);
      alert(`Failed to process payouts: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setProcessingEventId(null);
    }
  };

  const getSettlementStatus = (event: SettledEvent) => {
    if (event.winning_outcome) {
      return {
        status: `Settled: ${event.winning_outcome}`,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: CheckCircle
      };
    }
    
    return {
      status: 'Settled (Unknown Outcome)',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: AlertTriangle
    };
  };

  const filteredEvents = settledEvents
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.total_pool_amount - a.total_pool_amount;
        case 'count':
          return b.bet_count - a.bet_count;
        case 'settlement':
        default:
          return b.hours_since_settlement - a.hours_since_settlement;
      }
    });

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">💰</div>
          <p className="text-banana-700 text-lg">Loading settled events...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-red-600 text-lg mb-4">Failed to load settled events</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchSettledEvents}
            className="bg-banana-400 hover:bg-banana-500 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.span 
              className="text-4xl"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💰
            </motion.span>
            <h1 className="font-baseball text-3xl md:text-5xl font-bold text-banana-800">
              Payouts
            </h1>
            <motion.span 
              className="text-4xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.span>
          </div>
          <p className="text-lg text-baseball-600 italic mb-4">
            Process pending payouts for settled events! 💸
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-blue-800 text-sm">
              <strong>How it works:</strong> Events that have been settled (either through consensus or manual settlement) 
              appear here when they have unprocessed payouts. Click "Process Payout" to send Zcash transactions to all winners.
            </p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-baseball-400" size={20} />
            <input
              type="text"
              placeholder="Search events for payout..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors"
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-baseball-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500"
              >
                <option value="settlement">Hours Since Settlement</option>
                <option value="amount">Total Pool Amount</option>
                <option value="count">Number of Bets</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchSettledEvents}
                className="flex items-center space-x-2 text-sm text-banana-600 hover:text-banana-700"
              >
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
              <div className="text-sm text-baseball-600">
                {filteredEvents.length} settled events ready for payout
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payout Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <AnimatePresence>
            {filteredEvents.map((event, index) => {
              const settlementStatus = getSettlementStatus(event);
              const StatusIcon = settlementStatus.icon;
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200"
                >
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">⚾</div>
                      <div>
                        <h3 className="font-bold text-xl text-baseball-800 mb-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-baseball-600">
                          Settled: {event.settled_at ? new Date(event.settled_at).toLocaleString() : 'Unknown'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-green-600 font-medium mb-1">
                        <Clock size={16} />
                        <span>{event.hours_since_settlement.toFixed(1)} hours ago</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-baseball-600">
                        <div className="flex items-center space-x-1">
                          <DollarSign size={16} />
                          <span>{event.total_pool_amount.toFixed(4)} ZEC pool</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={16} />
                          <span>{event.bet_count} bets</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Settlement Status */}
                  <div className="mb-6">
                    <h4 className="font-medium text-baseball-700 mb-3">Settlement Status:</h4>
                    <div className={`flex items-center space-x-3 p-4 rounded-lg ${settlementStatus.bgColor}`}>
                      <StatusIcon size={24} className={settlementStatus.color} />
                      <div>
                        <span className={`font-medium ${settlementStatus.color}`}>
                          {settlementStatus.status}
                        </span>
                        <p className="text-xs text-baseball-600 mt-1">
                          Event outcome determined, ready for payout processing
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payout Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-baseball-600">
                      <AlertCircle size={16} className="inline mr-1" />
                      Ready to calculate and send payouts from {event.total_pool_amount.toFixed(4)} ZEC pool
                    </div>
                    
                    <motion.button
                      onClick={() => handlePayout(event.id)}
                      disabled={processingEventId === event.id}
                      whileHover={{ scale: processingEventId === event.id ? 1 : 1.05 }}
                      whileTap={{ scale: processingEventId === event.id ? 1 : 0.95 }}
                      className={cn(
                        "flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200",
                        processingEventId === event.id
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-grass-500 hover:bg-grass-600 text-white"
                      )}
                    >
                      {processingEventId === event.id ? (
                        <>
                          <RefreshCw className="animate-spin" size={16} />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <DollarSign size={16} />
                          <span>Process Payout</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-baseball-800 mb-2">
              No pending payouts
            </h3>
            <p className="text-baseball-600 mb-4">
              Events appear here when they've been settled but their payouts haven't been processed yet.
            </p>
            <p className="text-sm text-baseball-500">
              All payouts are up to date! 🍌
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-banana-200"
        >
          <p className="text-baseball-600 italic mb-4">
            Keep the payouts flowing! 🎪💰🍌
          </p>
          <Disclaimer />
        </motion.div>
      </div>
    </div>
  );
}
