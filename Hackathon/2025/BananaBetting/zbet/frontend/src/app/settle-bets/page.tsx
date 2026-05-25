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
  Scale
} from 'lucide-react';
import { cn, getRandomBananaEmoji } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { tokenManager } from '@/lib/api';
import Disclaimer from '@/components/Disclaimer';

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// Types for settlement
interface SettlementOption {
  id: string;
  label: string;
  description: string;
  color: string;
}

interface SettlableEvent {
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
  betting_system_data?: any;
  emoji: string;
  timeUntilSettlement: string;
  totalPool: number;
  participants: number;
  possibleOutcomes: SettlementOption[];
}

export default function SettleBetsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [emoji, setEmoji] = useState('🍌');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('settlement-time'); // settlement-time, pool-size, participants
  const [settlableEvents, setSettlableEvents] = useState<SettlableEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOutcomes, setSelectedOutcomes] = useState<{[eventId: number]: string}>({});

  useEffect(() => {
    setEmoji(getRandomBananaEmoji());
    if (isAuthenticated) {
      fetchSettlableEvents();
    }
  }, [isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const fetchSettlableEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the authentication token
      const token = tokenManager.getToken();
      if (!token) {
        setError('Please log in to view settlable events');
        return;
      }
      
      // Fetch all events
      const response = await fetch(`${API_BASE_URL}/api/events`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      
      const events = await response.json();
      
      // Filter events that are eligible for settlement
      const now = new Date();
      const eligibleEvents = events.filter((event: any) => {
        const eventEndTime = new Date(event.event_end_time);
        const settlementTime = new Date(event.settlement_time);
        
        // Event must be past its end time but not past settlement time and not already settled
        return eventEndTime < now && 
               settlementTime > now && 
               event.status !== 'settled' && 
               event.status !== 'cancelled';
      });
      
      // Check which events the user has already validated
      const userStatusPromises = eligibleEvents.map((event: any) =>
        fetch(`${API_BASE_URL}/api/events/${event.id}/user-status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
          return { event_id: event.id, has_validated: false };
        }).catch(() => ({ event_id: event.id, has_validated: false }))
      );
      
      const userStatuses = await Promise.all(userStatusPromises);
      
      // Filter out events the user has already validated
      const unvalidatedEvents = eligibleEvents.filter((event: any) => {
        const userStatus = userStatuses.find(status => status.event_id === event.id);
        return !userStatus?.has_validated;
      });
      
      // Transform events for settlement view
      const transformedEvents = unvalidatedEvents.map(transformEventForSettlement);
      setSettlableEvents(transformedEvents);
      
    } catch (err) {
      console.error('Failed to fetch settlable events:', err);
      setError(err instanceof Error ? err.message : 'Failed to load settlable events');
    } finally {
      setLoading(false);
    }
  };

  const transformEventForSettlement = (event: any): SettlableEvent => {
    const now = new Date();
    const settlementTime = new Date(event.settlement_time);
    const timeUntilSettlement = calculateTimeUntilSettlement(settlementTime);
    
    // Get emoji based on category
    const categoryEmojis: { [key: string]: string } = {
      'banana-antics': '🍌',
      'player-props': '⚾',
      'crowd-fun': '🎭',
      'baseball': '⚾'
    };

    // Calculate pool size and participants
    let totalPool = 0;
    let participants = 0;
    let possibleOutcomes: SettlementOption[] = [];

    if (event.betting_system_data && event.betting_system_type === 'pari_mutuel') {
      totalPool = event.betting_system_data.total_pool || 0;
      participants = event.betting_system_data.betting_pools?.reduce((sum: number, pool: any) => sum + pool.bet_count, 0) || 0;
      
      // Create settlement options from betting pools
      possibleOutcomes = event.betting_system_data.betting_pools?.map((pool: any, index: number) => ({
        id: pool.outcome_name,
        label: pool.outcome_description,
        description: `${pool.bet_count} bets, ${pool.pool_amount.toFixed(4)} ZEC`,
        color: index === 0 ? 'text-grass-600' : index === 1 ? 'text-banana-600' : 'text-purple-600'
      })) || [];
    }

    // Add default outcomes if none exist
    if (possibleOutcomes.length === 0) {
      possibleOutcomes = [
        { id: 'yes', label: 'Yes / Happened', description: 'The event occurred as described', color: 'text-grass-600' },
        { id: 'no', label: 'No / Did not happen', description: 'The event did not occur', color: 'text-red-600' },
        { id: 'unclear', label: 'Unclear / Disputed', description: 'The outcome is unclear or disputed', color: 'text-yellow-600' }
      ];
    }

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      category: event.category,
      status: event.status,
      betting_system_type: event.betting_system_type,
      created_at: event.created_at,
      event_start_time: event.event_start_time,
      event_end_time: event.event_end_time,
      settlement_time: event.settlement_time,
      settled_at: event.settled_at,
      betting_system_data: event.betting_system_data,
      emoji: categoryEmojis[event.category] || '🎪',
      timeUntilSettlement,
      totalPool,
      participants,
      possibleOutcomes
    };
  };

  const calculateTimeUntilSettlement = (settlementTime: Date): string => {
    const now = new Date();
    const timeDiff = settlementTime.getTime() - now.getTime();
    
    if (timeDiff <= 0) return "Settlement time passed";
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleOutcomeSelection = (eventId: number, outcomeId: string) => {
    setSelectedOutcomes(prev => ({
      ...prev,
      [eventId]: outcomeId
    }));
  };

  const handleSubmitSettlement = async (eventId: number) => {
    const selectedOutcome = selectedOutcomes[eventId];
    if (!selectedOutcome) {
      alert('Please select an outcome before submitting');
      return;
    }

    try {
      // Get the authentication token
      const token = tokenManager.getToken();
      if (!token) {
        alert('Please log in again to submit validation');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/events/${eventId}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          predicted_outcome: selectedOutcome,
          confidence_level: null,
          validation_notes: null
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Failed to submit validation: ${response.status}`);
      }

      const validationResult = await response.json();
      
      alert(`Thank you for validating! Your settlement vote for "${selectedOutcome}" has been recorded and will contribute to the consensus mechanism.`);
      
      // Remove from local state as the event has been validated by this user
      setSettlableEvents(prev => prev.filter(event => event.id !== eventId));
      
    } catch (err) {
      console.error('Failed to submit settlement:', err);
      alert(err instanceof Error ? err.message : 'Failed to submit settlement validation. Please try again.');
    }
  };

  const categories = [
    { id: 'all', name: 'All Events', emoji: '🎪' },
    { id: 'banana-antics', name: 'Banana Antics', emoji: '🍌' },
    { id: 'player-props', name: 'Player Props', emoji: '⚾' },
    { id: 'crowd-fun', name: 'Crowd Fun', emoji: '🎭' },
    { id: 'baseball', name: 'Baseball', emoji: '⚾' }
  ];

  const filteredEvents = settlableEvents
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'pool-size':
          return b.totalPool - a.totalPool;
        case 'participants':
          return b.participants - a.participants;
        case 'settlement-time':
        default:
          // Sort by time until settlement (earliest first)
          const aTime = new Date(a.settlement_time).getTime();
          const bTime = new Date(b.settlement_time).getTime();
          return aTime - bTime;
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
          <div className="animate-spin text-6xl mb-4">⚖️</div>
          <p className="text-banana-700 text-lg">Loading events for settlement...</p>
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
          <p className="text-red-600 text-lg mb-4">Failed to load settlable events</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchSettlableEvents}
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
              ⚖️
            </motion.span>
            <h1 className="font-baseball text-3xl md:text-5xl font-bold text-banana-800">
              Settle Bets
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
            Help validate bet outcomes and earn rewards! 🎪
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-blue-800 text-sm">
              <strong>How it works:</strong> Help validate the outcomes of completed events. Your votes contribute to the consensus mechanism. 
              Future features will include reputation systems and rewards for accurate validators!
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
              placeholder="Search events to settle..."
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
                <option value="settlement-time">Settlement Deadline</option>
                <option value="pool-size">Pool Size</option>
                <option value="participants">Participants</option>
              </select>
            </div>

            <div className="text-sm text-baseball-600">
              {filteredEvents.length} events available for settlement
            </div>
          </div>
        </motion.div>

        {/* Settlement Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
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
                    <div className="text-3xl">{event.emoji}</div>
                    <div>
                      <h3 className="font-bold text-xl text-baseball-800 mb-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-baseball-600 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-red-600 font-medium mb-1">
                      <Clock size={16} />
                      <span>Settlement in {event.timeUntilSettlement}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-baseball-600">
                      <div className="flex items-center space-x-1">
                        <Scale size={16} />
                        <span>{event.totalPool.toFixed(4)} ZEC</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span>{event.participants} players</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settlement Options */}
                <div className="mb-6">
                  <h4 className="font-medium text-baseball-700 mb-3">Select the actual outcome:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {event.possibleOutcomes.map((outcome) => (
                      <button
                        key={outcome.id}
                        onClick={() => handleOutcomeSelection(event.id, outcome.id)}
                        className={cn(
                          'p-4 rounded-lg border-2 transition-all duration-200 text-left',
                          selectedOutcomes[event.id] === outcome.id
                            ? 'border-banana-500 bg-banana-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-banana-300'
                        )}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          {selectedOutcomes[event.id] === outcome.id ? (
                            <CheckCircle size={20} className="text-banana-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                          <span className={`font-medium ${outcome.color}`}>
                            {outcome.label}
                          </span>
                        </div>
                        <p className="text-xs text-baseball-600">{outcome.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-baseball-600">
                    <AlertTriangle size={16} className="inline mr-1" />
                    Your validation will be recorded and contribute to the final settlement
                  </div>
                  
                  <motion.button
                    onClick={() => handleSubmitSettlement(event.id)}
                    disabled={!selectedOutcomes[event.id]}
                    whileHover={{ scale: selectedOutcomes[event.id] ? 1.05 : 1 }}
                    whileTap={{ scale: selectedOutcomes[event.id] ? 0.95 : 1 }}
                    className={cn(
                      'px-6 py-2 rounded-lg font-medium transition-all duration-200',
                      selectedOutcomes[event.id]
                        ? 'bg-grass-500 hover:bg-grass-600 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    )}
                  >
                    Submit Validation
                  </motion.button>
                </div>
              </motion.div>
            ))}
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
            <div className="text-6xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold text-baseball-800 mb-2">
              No events ready for settlement
            </h3>
            <p className="text-baseball-600 mb-4">
              Events become available for settlement after they end but before the settlement deadline.
            </p>
            <p className="text-sm text-baseball-500">
              Check back later or try adjusting your search filters! 🍌
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
            Help maintain the integrity of Banana Betting! 🎪⚖️🍌
          </p>
          <Disclaimer />
        </motion.div>
      </div>
    </div>
  );
}
