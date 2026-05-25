'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, TrendingUp, DollarSign, Users, Play, Square, CheckCircle } from 'lucide-react';
import { cn, getRandomBananaEmoji } from '@/lib/utils';
import { bettingApi } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import Disclaimer from '@/components/Disclaimer';
import ValidationStatusCard from '@/components/ValidationStatusCard';

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// Import the same adapter functions from the main betting page
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
function adaptPariMutuelData(systemData: any): BettingDisplayData {
  const totalPool = systemData?.total_pool || 0;
  const pools = systemData?.betting_pools || [];
  const houseFee = systemData?.house_fee_percentage || 0.05;
  const creatorFee = systemData?.creator_fee_percentage || 0.02;
  const validatorFee = systemData?.validator_fee_percentage || 0.02;
  const netPool = totalPool * (1 - houseFee - creatorFee - validatorFee);
  
  // Calculate pool percentages and estimated payouts
  const poolData = pools.map((pool: any) => {
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
    additionalInfo: poolData.map((pool: any) => ({
      label: pool.description,
      value: `${pool.percentage}%`,
      subtext: `${pool.amount.toFixed(4)} ZEC (${pool.betCount} bets)`,
      poolId: pool.id,
      poolName: pool.name,
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
    additionalInfo: [
      {
        label: "Win",
        value: `${odds.toFixed(1)}x`,
        subtext: "Fixed odds betting"
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
        label: "Bet Range",
        value: `${minimumBet} - ${maximumBet} ZEC`
      }
    ],
    additionalInfo: [
      {
        label: `Over ${spread > 0 ? '+' : ''}${spread}`,
        value: `${overOdds.toFixed(1)}x`,
        subtext: "Bet on over the spread"
      },
      {
        label: `Under ${spread > 0 ? '+' : ''}${spread}`,
        value: `${underOdds.toFixed(1)}x`, 
        subtext: "Bet on under the spread"
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

export default function IndividualBettingPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const betId = params.id as string;
  
  const [bet, setBet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string>('');
  const [isPlacing, setIsPlacing] = useState(false);
  const [placementError, setPlacementError] = useState<string | null>(null);
  const [emoji] = useState(getRandomBananaEmoji());

  useEffect(() => {
    fetchBetDetails();
  }, [betId]);

  const fetchBetDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/events/${betId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch bet details: ${response.status}`);
      }
      
      const event = await response.json();
      
      // Transform using the same logic as the main betting page
      const systemData = event.betting_system_data;
      const bettingDisplay = getBettingDisplayData(event.betting_system_type, systemData);
      
      // Get emoji based on category
      const categoryEmojis: { [key: string]: string } = {
        'banana-antics': '🍌',
        'player-props': '⚾',
        'crowd-fun': '🎭',
        'baseball': '⚾'
      };
      
      const transformedBet = {
        id: event.id.toString(),
        title: event.title,
        description: event.description,
        bettingSystemType: event.betting_system_type,
        bettingDisplay: bettingDisplay,
        category: event.category,
        status: event.status,
        emoji: categoryEmojis[event.category] || '🎪',
        participants: systemData?.betting_pools?.reduce((sum: number, pool: any) => sum + pool.bet_count, 0) || 0,
        eventStartTime: event.event_start_time,
        eventEndTime: event.event_end_time,
        settlementTime: event.settlement_time
      };
      
      setBet(transformedBet);
      
    } catch (err) {
      console.error('Failed to fetch bet details:', err);
      setError(err instanceof Error ? err.message : 'Failed to load bet details');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceBet = async () => {
    if (!selectedOutcome || !betAmount || !bet || !isAuthenticated) return;
    
    setIsPlacing(true);
    setPlacementError(null);
    
    try {
      const amount = parseFloat(betAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid bet amount');
      }
      
      const betData = {
        sport_event_id: parseInt(betId),
        predicted_outcome: selectedOutcome,
        amount: amount
      };
      
      const placedBet = await bettingApi.placeBet(betData);
      
      // Success! Show confirmation
      alert(`Bet placed successfully! ${amount} ZEC on "${selectedOutcome}" ${emoji}`);
      
      // Clear the form
      setSelectedOutcome(null);
      setBetAmount('');
      
      // Refresh the event data to show updated statistics
      await fetchBetDetails();
      
    } catch (err: any) {
      console.error('Failed to place bet:', err);
      setPlacementError(err.response?.data?.detail || err.message || 'Failed to place bet');
    } finally {
      setIsPlacing(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🍌</div>
          <p className="text-banana-700 text-lg">Loading bet details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !bet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-red-600 text-lg mb-4">Failed to load bet details</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/betting')}
            className="bg-banana-400 hover:bg-banana-500 text-white px-6 py-2 rounded-lg"
          >
            Back to Betting
          </button>
        </div>
      </div>
    );
  }

  const minBet = bet.bettingDisplay.secondaryMetrics?.find((m: any) => m.label.includes('Range'))?.value?.split(' - ')[0] || '0.001';
  const maxBet = bet.bettingDisplay.secondaryMetrics?.find((m: any) => m.label.includes('Range'))?.value?.split(' - ')[1]?.replace(' ZEC', '') || '1.0';
  
  // Check if betting is allowed based on event status
  const isBettingClosed = bet.status === 'closed' || bet.status === 'settled' || bet.status === 'cancelled';

  return (
    <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <button
            onClick={() => router.push('/betting')}
            className="p-2 hover:bg-banana-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-banana-700" />
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{bet.emoji}</span>
            <div>
              <h1 className="font-baseball text-2xl md:text-3xl font-bold text-banana-800">
                {bet.title}
              </h1>
              <p className="text-baseball-600">{bet.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Bet Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Primary Metric */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200">
              <h3 className="text-lg font-bold text-baseball-800 mb-4">Betting Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-baseball-600">{bet.bettingDisplay.primaryMetric.label}:</span>
                  <span className={`font-bold text-xl ${bet.bettingDisplay.primaryMetric.color}`}>
                    {bet.bettingDisplay.primaryMetric.value}
                  </span>
                </div>
                
                {bet.bettingDisplay.secondaryMetrics.map((metric: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-baseball-600">{metric.label}:</span>
                    <span className="text-baseball-800 font-medium">{metric.value}</span>
                  </div>
                ))}
                
                {bet.bettingDisplay.fees && (
                  <div className="pt-2 border-t border-banana-200">
                    <div className="text-sm text-baseball-500">
                      Fees: {bet.bettingDisplay.fees}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Event Stats */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200">
              <h3 className="text-lg font-bold text-baseball-800 mb-4">Event Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-baseball-600 mb-1">
                    <Users size={16} />
                    <span className="text-sm">Players</span>
                  </div>
                  <div className="text-xl font-bold text-banana-700">{bet.participants}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-baseball-600 mb-1">
                    <TrendingUp size={16} />
                    <span className="text-sm">Status</span>
                  </div>
                  <div className={`text-lg font-bold capitalize ${
                    bet.status === 'open' ? 'text-grass-600' :
                    bet.status === 'closed' ? 'text-orange-600' :
                    bet.status === 'settled' ? 'text-blue-600' :
                    'text-red-600'
                  }`}>{bet.status}</div>
                </div>
              </div>
            </div>

            {/* Event Timing */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200">
              <h3 className="text-lg font-bold text-baseball-800 mb-4">Event Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-grass-600">
                    <Play size={16} />
                    <span className="text-sm font-medium">Start Time (EST)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-baseball-800 font-medium">
                      {new Date(bet.eventStartTime).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-baseball-500">
                      {new Date(bet.eventStartTime).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                <div className="h-px bg-banana-200"></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Square size={16} />
                    <span className="text-sm font-medium">End Time (EST)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-baseball-800 font-medium">
                      {new Date(bet.eventEndTime).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-baseball-500">
                      {new Date(bet.eventEndTime).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                <div className="h-px bg-banana-200"></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-purple-600">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Settlement Time (EST)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-baseball-800 font-medium">
                      {new Date(bet.settlementTime).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-baseball-500">
                      {new Date(bet.settlementTime).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Place Bet */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Outcome Selection */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200">
              <h3 className="text-lg font-bold text-baseball-800 mb-4">Choose Your Outcome</h3>
              {isBettingClosed && (
                <div className="mb-4 p-3 bg-orange-100 border border-orange-300 rounded-lg">
                  <p className="text-orange-800 text-sm font-medium">
                    {bet.status === 'closed' ? 'Event has ended - betting is now closed' :
                     bet.status === 'settled' ? 'Event has been settled' :
                     'Betting is not available for this event'}
                  </p>
                </div>
              )}
              <div className="space-y-3">
                {bet.bettingDisplay.additionalInfo?.map((outcome: any, index: number) => (
                  <motion.button
                    key={index}
                    onClick={() => !isBettingClosed && setSelectedOutcome(outcome.outcomeId || outcome.label)}
                    whileHover={{ scale: isBettingClosed ? 1 : 1.02 }}
                    whileTap={{ scale: isBettingClosed ? 1 : 0.98 }}
                    disabled={isBettingClosed}
                    className={cn(
                      'w-full p-4 border rounded-lg text-left transition-all',
                      isBettingClosed 
                        ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-60'
                        : selectedOutcome === (outcome.outcomeId || outcome.label)
                        ? 'border-banana-500 bg-banana-50 ring-2 ring-banana-200'
                        : 'border-banana-200 hover:border-banana-300 hover:bg-banana-25'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-baseball-800">{outcome.label}</div>
                        {outcome.subtext && (
                          <div className="text-sm text-baseball-500 mt-1">{outcome.subtext}</div>
                        )}
                      </div>
                      <div className="text-grass-600 font-bold text-lg ml-4">
                        {outcome.value}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bet Amount */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200">
              <h3 className="text-lg font-bold text-baseball-800 mb-4">Bet Amount</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-baseball-700 mb-2">
                    Amount (ZEC)
                  </label>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    min={minBet}
                    max={maxBet}
                    step="0.001"
                    placeholder={`${minBet} - ${maxBet} ZEC`}
                    disabled={isBettingClosed}
                    className={`w-full px-4 py-3 border rounded-lg text-lg ${
                      isBettingClosed 
                        ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-60'
                        : 'border-banana-300 focus:ring-2 focus:ring-banana-500 focus:border-banana-500'
                    }`}
                  />
                  <div className="text-sm text-baseball-500 mt-1">
                    Range: {minBet} - {maxBet} ZEC
                  </div>
                </div>

                {/* Error Display */}
                {placementError && (
                  <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg">
                    <p className="text-sm">{placementError}</p>
                  </div>
                )}

                {/* Place Bet Button */}
                {!isAuthenticated ? (
                  <motion.button
                    onClick={() => router.push('/login')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gray-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-3 text-lg"
                  >
                    <span>Login to Place Bet</span>
                    <span className="text-xl">🔒</span>
                  </motion.button>
                ) : isBettingClosed ? (
                  <motion.button
                    disabled={true}
                    className="w-full bg-gray-400 text-white font-bold py-4 px-6 rounded-lg cursor-not-allowed opacity-60 transition-colors flex items-center justify-center space-x-3 text-lg"
                  >
                    <span>
                      {bet.status === 'closed' ? 'Event Closed' :
                       bet.status === 'settled' ? 'Event Settled' :
                       'Betting Unavailable'}
                    </span>
                    <span className="text-xl">🚫</span>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handlePlaceBet}
                    disabled={!selectedOutcome || !betAmount || isPlacing}
                    whileHover={{ scale: !selectedOutcome || !betAmount ? 1 : 1.02 }}
                    whileTap={{ scale: !selectedOutcome || !betAmount ? 1 : 0.98 }}
                    className="w-full bg-banana-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-banana-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-3 text-lg"
                  >
                    {isPlacing ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Placing Bet...</span>
                      </>
                    ) : (
                      <>
                        <DollarSign size={20} />
                        <span>Place Bet</span>
                        <span className="text-xl">{emoji}</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Validation Status Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <ValidationStatusCard 
            eventId={betId}
            eventStatus={bet.status}
            isAuthenticated={isAuthenticated}
          />
        </motion.div>

        {/* Fun Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-banana-200"
        >
          <p className="text-baseball-600 italic mb-4">
            "Place your bets and let the banana magic happen!" 🍌⚾🎪
          </p>
          <Disclaimer />
        </motion.div>
      </div>
    </div>
  );
}