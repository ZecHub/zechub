'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, DollarSign, Zap } from 'lucide-react';
import { cn, getRandomBananaEmoji } from '@/lib/utils';
import api from '@/lib/api';

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// Betting System Adapters
interface BettingDisplayData {
  primaryMetric: {
    label: string;
    value: string;
    color: string;
  };
  secondaryMetrics: Array<{
    label: string;
    value: string;
  }>;
  additionalInfo?: Array<{
    label: string;
    value: string;
    subtext?: string;
  }>;
  fees?: string;
}

// Adapter for Pari-Mutuel betting system
function adaptPariMutuelData(systemData: BettingSystemData): BettingDisplayData {
  const totalPool = systemData?.total_pool || 0;
  const pools = systemData?.betting_pools || [];
  const houseFee = systemData?.house_fee_percentage || 0.05;
  const creatorFee = systemData?.creator_fee_percentage || 0.02;
  const validatorFee = systemData?.validator_fee_percentage || 0.02;
  const netPool = totalPool * (1 - houseFee - creatorFee - validatorFee);
  
  // Calculate pool percentages and estimated payouts
  const poolData = pools.map(pool => {
    const poolPercentage = totalPool > 0 ? (pool.pool_amount / totalPool) * 100 : 0;
    const estimatedPayout = pool.pool_amount > 0 ? netPool / pool.pool_amount : 0;
    
    return {
      id: pool.id,
      name: pool.outcome_name,
      description: pool.outcome_description,
      amount: pool.pool_amount,
      percentage: Math.round(poolPercentage * 10) / 10,
      betCount: pool.bet_count,
      estimatedPayout: Math.round(estimatedPayout * 100) / 100
    };
  });

  return {
    primaryMetric: {
      label: "Total Pool",
      value: `${totalPool.toFixed(4)} ZEC`,
      color: "text-banana-600"
    },
    secondaryMetrics: [
      {
        label: "Bet Range",
        value: `${systemData?.minimum_bet || 0.001} - ${systemData?.maximum_bet || 1.0} ZEC`
      }
    ],
    additionalInfo: poolData.slice(0, 2).map(pool => ({
      label: pool.description,
      value: `${pool.percentage}%`,
      subtext: `${pool.amount.toFixed(4)} ZEC (${pool.betCount} bets)${pool.estimatedPayout > 0 ? ` • Est. ${pool.estimatedPayout.toFixed(2)}:1` : ''}`,
      outcomeId: pool.name  // Add the actual outcome name for betting
    })),
    fees: `House ${(houseFee * 100).toFixed(1)}% + Creator ${(creatorFee * 100).toFixed(1)}% + Validators ${(validatorFee * 100).toFixed(1)}%`
  };
}

// Adapter for Fixed Odds betting system
function adaptFixedOddsData(systemData: any): BettingDisplayData {
  const odds = systemData?.odds || 2.0;
  const minimumBet = systemData?.minimum_bet || 0.001;
  const maximumBet = systemData?.maximum_bet || 1.0;
  const houseFee = systemData?.house_fee_percentage || 0.05;

  return {
    primaryMetric: {
      label: "Odds",
      value: `${odds.toFixed(1)}x`,
      color: "text-grass-600"
    },
    secondaryMetrics: [
      {
        label: "Bet Range",
        value: `${minimumBet} - ${maximumBet} ZEC`
      },
      {
        label: "Potential Payout",
        value: `${(minimumBet * odds).toFixed(4)} - ${(maximumBet * odds).toFixed(4)} ZEC`
      }
    ],
    fees: `House ${(houseFee * 100).toFixed(1)}%`
  };
}

// Adapter for Spread betting system
function adaptSpreadData(systemData: any): BettingDisplayData {
  const spread = systemData?.spread || 0;
  const overOdds = systemData?.over_odds || 1.9;
  const underOdds = systemData?.under_odds || 1.9;
  const minimumBet = systemData?.minimum_bet || 0.001;
  const maximumBet = systemData?.maximum_bet || 1.0;

  return {
    primaryMetric: {
      label: "Spread",
      value: spread > 0 ? `+${spread}` : `${spread}`,
      color: "text-purple-600"
    },
    secondaryMetrics: [
      {
        label: "Over",
        value: `${overOdds.toFixed(1)}x`
      },
      {
        label: "Under", 
        value: `${underOdds.toFixed(1)}x`
      }
    ],
    additionalInfo: [
      {
        label: "Bet Range",
        value: `${minimumBet} - ${maximumBet} ZEC`,
        subtext: "Applies to both over and under"
      }
    ]
  };
}

// Main adapter function that routes to specific betting system
function getBettingDisplayData(bettingSystemType: string, systemData: any): BettingDisplayData {
  switch (bettingSystemType) {
    case 'pari_mutuel':
      return adaptPariMutuelData(systemData);
    case 'fixed_odds':
      return adaptFixedOddsData(systemData);
    case 'spread':
      return adaptSpreadData(systemData);
    default:
      // For unknown betting systems, return an error state rather than dummy data
      return {
        primaryMetric: {
          label: "Betting System",
          value: bettingSystemType || "Unknown",
          color: "text-red-600"
        },
        secondaryMetrics: [
          {
            label: "Status",
            value: "Not Supported"
          }
        ],
        additionalInfo: [
          {
            label: "Error",
            value: "This betting system is not yet implemented",
            subtext: "Please contact support if you see this message"
          }
        ]
      };
  }
}

// Types for API responses
interface BettingPool {
  id: number;
  outcome_name: string;
  outcome_description: string;
  pool_amount: number;
  bet_count: number;
  payout_ratio?: number;
  is_winning_pool: boolean;
}

interface BettingSystemData {
  id: number;
  minimum_bet: number;
  maximum_bet: number;
  house_fee_percentage: number;
  creator_fee_percentage: number;
  total_pool: number;
  winning_outcome?: string;
  betting_pools: BettingPool[];
}

interface SportEvent {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  betting_system_type: string;
  created_at: string;
  event_start_time: string;
  event_end_time: string;
  settlement_time: string;
  settled_at?: string;
  betting_system_data?: BettingSystemData;
}

// Transform API data to match frontend expectations
function transformEventToFrontendBet(event: SportEvent) {
  const systemData = event.betting_system_data;
  
  // Calculate time left (simplified)
  const eventTime = new Date(event.event_start_time);
  const now = new Date();
  const timeLeft = eventTime > now ? '2h 15m' : '0m'; // Simplified for now
  
  // Get emoji based on category
  const categoryEmojis: { [key: string]: string } = {
    'banana-antics': '🍌',
    'player-props': '⚾',
    'crowd-fun': '🎭',
    'baseball': '⚾'
  };
  
  // Get dynamic betting display data based on system type
  const bettingDisplay = getBettingDisplayData(event.betting_system_type, systemData);
  
  // Calculate participants based on betting system type
  let participants = 0;
  if (event.betting_system_type === 'pari_mutuel') {
    participants = systemData?.betting_pools?.reduce((sum, pool) => sum + pool.bet_count, 0) || 0;
  } else {
    // For other systems, you might track participants differently
    participants = (systemData as any)?.total_bets || 0;
  }
  
  return {
    id: event.id.toString(),
    title: event.title,
    description: event.description,
    bettingSystemType: event.betting_system_type,
    bettingDisplay: bettingDisplay,
    category: event.category,
    status: event.status,
    emoji: categoryEmojis[event.category] || '🎪',
    timeLeft: timeLeft,
    participants: participants
  };
}

const categories = [
  { id: 'all', name: 'All Bets', emoji: '🎪' },
  { id: 'banana-antics', name: 'Banana Antics', emoji: '🍌' },
  { id: 'player-props', name: 'Player Props', emoji: '⚾' },
  { id: 'crowd-fun', name: 'Crowd Fun', emoji: '🎭' },
  { id: 'baseball', name: 'Baseball', emoji: '⚾' }
];

export default function BettingPage() {
  const router = useRouter();
  const [emoji, setEmoji] = useState('🍌');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('time'); // time, odds, participants
  const [showFilters, setShowFilters] = useState(false);
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmoji(getRandomBananaEmoji());
    fetchBettingEvents();
  }, []);

  const fetchBettingEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use fetch for public endpoints to avoid auth headers  
      // Get all events first, then filter on frontend if needed
      const response = await fetch(`${API_BASE_URL}/api/events`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      
      const events: SportEvent[] = await response.json();
      const transformedBets = events.map(transformEventToFrontendBet);
      setBets(transformedBets);
      
    } catch (err) {
      console.error('Failed to fetch betting events:', err);
      setError(err instanceof Error ? err.message : 'Failed to load betting events');
    } finally {
      setLoading(false);
    }
  };

  const filteredBets = bets
    .filter(bet => {
      const matchesSearch = bet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bet.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || bet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'pool':
          // For pari-mutuel, sort by total pool; for others, could be by stake or other metrics
          if (a.bettingSystemType === 'pari_mutuel' && b.bettingSystemType === 'pari_mutuel') {
            // Extract numeric value from primary metric (e.g., "0.1234 ZEC" -> 0.1234)
            const aValue = parseFloat(a.bettingDisplay.primaryMetric.value.split(' ')[0]) || 0;
            const bValue = parseFloat(b.bettingDisplay.primaryMetric.value.split(' ')[0]) || 0;
            return bValue - aValue;
          }
          return 0; // Keep original order if not comparable
        case 'participants':
          return b.participants - a.participants;
        case 'time':
        default:
          return a.timeLeft.localeCompare(b.timeLeft);
      }
    });

  const handlePlaceBet = (betId: string) => {
    // Navigate to the individual bet page
    router.push(`/betting/${betId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🍌</div>
          <p className="text-banana-700 text-lg">Loading betting events...</p>
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
          <p className="text-red-600 text-lg mb-4">Failed to load betting events</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchBettingEvents}
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
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              🔍
            </motion.span>
            <h1 className="font-baseball text-3xl md:text-5xl font-bold text-banana-800">
              Find Your Next Win!
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
            Discover banana-tastic betting opportunities! 🎪
          </p>
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
              placeholder="Search for bets... (try 'banana', 'dance', 'crowd')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  selectedCategory === category.id
                    ? 'bg-banana-500 text-white shadow-md'
                    : 'bg-banana-100 text-banana-800 hover:bg-banana-200'
                )}
              >
                <span>{category.emoji}</span>
                <span>{category.name}</span>
              </button>
            ))}
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
                <option value="time">Time Remaining</option>
                <option value="pool">Largest Pool</option>
                <option value="participants">Most Popular</option>
              </select>
            </div>

            <div className="text-sm text-baseball-600">
              {filteredBets.length} bets found
            </div>
          </div>
        </motion.div>

        {/* Betting Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredBets.map((bet, index) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => router.push(`/betting/${bet.id}`)}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200 group cursor-pointer"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl group-hover:scale-110 transition-transform">
                      {bet.emoji}
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                      bet.status === 'open' ? 'bg-green-100 text-green-800' :
                      bet.status === 'closed' ? 'bg-orange-100 text-orange-800' :
                      bet.status === 'settled' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {bet.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-baseball-600">
                      <Clock size={16} />
                      <span>{bet.timeLeft}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-baseball-600">
                      <TrendingUp size={16} />
                      <span>{bet.participants} players</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <h3 className="font-bold text-lg text-baseball-800 mb-2 group-hover:text-banana-800 transition-colors">
                  {bet.title}
                </h3>
                <p className="text-sm text-baseball-600 mb-4 line-clamp-2">
                  {bet.description}
                </p>

                {/* Dynamic Betting Information */}
                <div className="space-y-3 mb-4">
                  {/* Primary Metric */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-baseball-600">{bet.bettingDisplay.primaryMetric.label}:</span>
                    <span className={`font-bold text-lg ${bet.bettingDisplay.primaryMetric.color}`}>
                      {bet.bettingDisplay.primaryMetric.value}
                    </span>
                  </div>
                  
                  {/* Secondary Metrics */}
                  {bet.bettingDisplay.secondaryMetrics.map((metric: any, index: number) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-baseball-600">{metric.label}:</span>
                      <span className="text-baseball-800">{metric.value}</span>
                    </div>
                  ))}
                  
                  {/* Additional Info (Pool Distribution, Outcomes, etc.) */}
                  {bet.bettingDisplay.additionalInfo && bet.bettingDisplay.additionalInfo.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-sm text-baseball-600 font-medium">
                        {bet.bettingSystemType === 'pari_mutuel' ? 'Pool Distribution:' : 
                         bet.bettingSystemType === 'spread' ? 'Betting Options:' : 
                         'Additional Info:'}
                      </span>
                      {bet.bettingDisplay.additionalInfo.slice(0, 2).map((info: any, index: number) => (
                        <div key={index} className="text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-baseball-700 truncate">{info.label}</span>
                            <span className="text-grass-600 font-medium ml-2">{info.value}</span>
                          </div>
                          {info.subtext && (
                            <div className="text-xs text-baseball-500 mt-1">
                              {info.subtext}
                            </div>
                          )}
                        </div>
                      ))}
                      {bet.bettingDisplay.additionalInfo.length > 2 && (
                        <div className="text-xs text-baseball-500 text-center">
                          +{bet.bettingDisplay.additionalInfo.length - 2} more options
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Fees */}
                  {bet.bettingDisplay.fees && (
                    <div className="text-xs text-baseball-500">
                      Fees: {bet.bettingDisplay.fees}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from firing
                    handlePlaceBet(bet.id);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-banana-500 hover:bg-banana-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <DollarSign size={20} />
                  <span>Place Bet</span>
                  <span>{emoji}</span>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredBets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-baseball-800 mb-2">
              No bets found!
            </h3>
            <p className="text-baseball-600">
              Try adjusting your search or category filters. 🍌
            </p>
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
            Remember: Bet responsibly and have fun! 🎪⚾🍌
          </p>
        </motion.div>
      </div>
    </div>
  );
}
