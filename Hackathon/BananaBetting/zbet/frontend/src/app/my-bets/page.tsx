'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, TrendingUp, CheckCircle, XCircle, DollarSign, Calendar, Filter, ExternalLink } from 'lucide-react';
import { cn, getRandomBananaEmoji, formatCurrency } from '@/lib/utils';
import { bettingApi } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import Disclaimer from '@/components/Disclaimer';


const statusColors = {
  pending: 'bg-banana-100 text-banana-800 border-banana-300',
  won: 'bg-grass-100 text-grass-800 border-grass-300',
  lost: 'bg-red-100 text-red-800 border-red-300',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-300'
};

const statusIcons = {
  pending: Clock,
  won: CheckCircle,
  lost: XCircle,
  cancelled: XCircle
};

export default function MyBetsPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState('all'); // all, pending, won, lost, cancelled
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, amount
  const [mounted, setMounted] = useState(false);
  const [buttonEmoji, setButtonEmoji] = useState('🍌');
  const [userBets, setUserBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get emoji from category
  const getCategoryEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      'banana-antics': '🍌',
      'player-props': '⚾',
      'crowd-fun': '🎭',
      'baseball': '⚾',
      'other': '🎪'
    };
    return emojiMap[category] || '🎪';
  };

  // Function to transform backend bet to frontend format
  const transformBetData = (bet: any) => {
    return {
      id: bet.id.toString(),
      betId: bet.betId,
      bet: {
        id: bet.bet.id, // Include the sport event ID for navigation
        title: bet.bet.title,
        description: bet.bet.description,
        category: bet.bet.category,
        emoji: getCategoryEmoji(bet.bet.category)
      },
      amount: bet.amount,
      potentialPayout: bet.potentialPayout ?? 0,
      status: bet.status,
      placedAt: bet.placedAt,
      settledAt: bet.settledAt
    };
  };

  const fetchUserBets = async () => {
    if (!isAuthenticated) {
      setUserBets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const bets = await bettingApi.getUserBets();
      const transformedBets = bets.map(transformBetData);
      setUserBets(transformedBets);
    } catch (err) {
      console.error('Failed to fetch user bets:', err);
      setError('Failed to load your bets. Please try again.');
      setUserBets([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBets = userBets
    .filter(bet => filter === 'all' || bet.status === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.placedAt).getTime() - new Date(b.placedAt).getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'newest':
        default:
          return new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime();
      }
    });

  // Calculate stats
  const stats = {
    totalBets: userBets.length,
    pendingBets: userBets.filter(bet => bet.status === 'pending').length,
    wonBets: userBets.filter(bet => bet.status === 'won').length,
    totalWinnings: userBets
      .filter(bet => bet.status === 'won')
      .reduce((total, bet) => total + bet.potentialPayout, 0),
    totalWagered: userBets.reduce((total, bet) => total + bet.amount, 0)
  };

  useEffect(() => {
    setMounted(true);
    setButtonEmoji(getRandomBananaEmoji());
  }, []);

  useEffect(() => {
    if (!authLoading) {
      fetchUserBets();
    }
  }, [isAuthenticated, authLoading]);

  const handleBetClick = (betId: string) => {
    // Navigate to the betting event's statistics page
    router.push(`/betting/${betId}`);
  };

  const formatDate = (dateString: string) => {
    // Use a more deterministic format to avoid hydration mismatches
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${hours}:${minutes}`;
  };

  // Show loading state while auth is loading
  if (authLoading || !mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍌</div>
          <p className="text-xl text-banana-800">Loading your bets...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-banana-800 mb-4">Login Required</h2>
          <p className="text-banana-600 mb-6">
            You need to be logged in to view your betting history.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/login'}
            className="bg-banana-500 hover:bg-banana-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
          >
            <span>Go to Login</span>
            <span>🍌</span>
          </motion.button>
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
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              🏆
            </motion.span>
            <h1 className="font-baseball text-3xl md:text-5xl font-bold text-banana-800">
              My Banana Bets
            </h1>
            <motion.span 
              className="text-4xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📊
            </motion.span>
          </div>
          <p className="text-lg text-baseball-600 italic">
            Track your wins, losses, and banana-tastic adventures! 🎪
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-banana-200 text-center">
            <Trophy className="mx-auto text-banana-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-banana-800">{stats.totalBets}</p>
            <p className="text-xs text-baseball-600">Total Bets</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-banana-200 text-center">
            <Clock className="mx-auto text-banana-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-banana-800">{stats.pendingBets}</p>
            <p className="text-xs text-baseball-600">Pending</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-grass-200 text-center">
            <CheckCircle className="mx-auto text-grass-600 mb-2" size={24} />
            <p className="text-2xl font-bold text-grass-800">{stats.wonBets}</p>
            <p className="text-xs text-baseball-600">Won</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-grass-200 text-center">
            <DollarSign className="mx-auto text-grass-600 mb-2" size={24} />
            <p className="text-lg font-bold text-grass-800">{stats.totalWinnings.toFixed(4)}</p>
            <p className="text-xs text-baseball-600">ZEC Won</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-banana-200 text-center">
            <TrendingUp className="mx-auto text-banana-600 mb-2" size={24} />
            <p className="text-lg font-bold text-banana-800">{stats.totalWagered.toFixed(4)}</p>
            <p className="text-xs text-baseball-600">ZEC Wagered</p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'won', 'lost', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize',
                    filter === status
                      ? 'bg-banana-500 text-white shadow-md'
                      : 'bg-banana-100 text-banana-800 hover:bg-banana-200'
                  )}
                >
                  {status === 'all' ? 'All Bets' : status}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-baseball-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount">Highest Amount</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6"
          >
            <div className="flex items-center space-x-2">
              <XCircle size={20} />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchUserBets}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎪</div>
            <p className="text-xl text-banana-800">Loading your bets...</p>
          </motion.div>
        )}

        {/* Bets List */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
          <AnimatePresence>
            {filteredBets.map((userBet, index) => {
              const StatusIcon = statusIcons[userBet.status as keyof typeof statusIcons];
              return (
                <motion.div
                  key={userBet.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleBetClick(userBet.bet.id)}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200 hover:shadow-xl hover:bg-white hover:border-banana-300 cursor-pointer transition-all duration-200 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Bet Info */}
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-3xl">{userBet.bet.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-lg text-baseball-800">
                            {userBet.bet.title}
                          </h3>
                          <ExternalLink size={16} className="text-banana-600 group-hover:text-banana-700 transition-colors" />
                        </div>
                        <p className="text-sm text-baseball-600 mb-2">
                          {userBet.bet.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-baseball-500">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Placed: {formatDate(userBet.placedAt)}</span>
                          </div>
                          {userBet.settledAt && (
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>Settled: {formatDate(userBet.settledAt)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bet Details */}
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-baseball-600">Amount</p>
                        <p className="font-bold text-banana-800">{userBet.amount.toFixed(4)} ZEC</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-baseball-600">
                          {userBet.status === 'won' ? 'Won' : 'Potential'}
                        </p>
                        <p className={cn(
                          'font-bold',
                          userBet.status === 'won' ? 'text-grass-600' : 'text-banana-800'
                        )}>
                          {userBet.potentialPayout > 0 
                            ? `${userBet.potentialPayout.toFixed(4)} ZEC`
                            : 'Calculating...'
                          }
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={cn(
                          'flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium',
                          statusColors[userBet.status as keyof typeof statusColors]
                        )}>
                          <StatusIcon size={16} />
                          <span className="capitalize">{userBet.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty State */}
          {filteredBets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎪</div>
            <h3 className="text-xl font-bold text-baseball-800 mb-2">
              No bets found!
            </h3>
            <p className="text-baseball-600 mb-6">
              {filter === 'all' 
                ? "You haven't placed any bets yet. Time to join the fun!"
                : `No ${filter} bets found. Try a different filter!`}
            </p>
            {filter === 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/betting'}
                className="bg-banana-500 hover:bg-banana-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
              >
                <span>Find Bets</span>
                <span>{buttonEmoji}</span>
              </motion.button>
            )}
          </motion.div>
          )}
        </motion.div>
        )}

        {/* Fun Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-banana-200"
        >
          <p className="text-baseball-600 italic mb-4">
            "Every bet is an adventure, every win is a celebration!" 🎉⚾🍌
          </p>
          <Disclaimer />
        </motion.div>
      </div>
    </div>
  );
}
