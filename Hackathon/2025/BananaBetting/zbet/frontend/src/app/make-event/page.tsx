'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  AlertCircle,
  Plus,
  Minus,
  CheckCircle
} from 'lucide-react';
import { cn, getRandomBananaEmoji } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { tokenManager } from '@/lib/api';
import NonProfitDropdown from '@/components/NonProfitDropdown';

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// Event Categories
const categories = [
  { id: 'banana-antics', name: 'Banana Antics', emoji: '🍌', description: 'Silly banana-themed antics and stunts' },
  { id: 'player-props', name: 'Player Props', emoji: '⚾', description: 'Individual player performance bets' },
  { id: 'crowd-fun', name: 'Crowd Fun', emoji: '🎭', description: 'Crowd participation and entertainment' },
  { id: 'baseball', name: 'Baseball', emoji: '⚾', description: 'Traditional baseball game outcomes' }
];

// Betting System Types
const bettingSystems = [
  { 
    id: 'pari_mutuel', 
    name: 'Pari-Mutuel Pool', 
    emoji: '🏊', 
    description: 'All bets go into a pool, winnings split among winners',
    tooltip: 'Players bet against each other, not the house. Winners share the total pool after fees.'
  },
  { 
    id: 'fixed_odds', 
    name: 'Fixed Odds', 
    emoji: '🎯', 
    description: 'Fixed payout ratios set by the house',
    tooltip: 'Traditional betting with predetermined odds. Not yet implemented.'
  },
  { 
    id: 'spread', 
    name: 'Point Spread', 
    emoji: '📊', 
    description: 'Bet on margin of victory',
    tooltip: 'Bet on whether the outcome is over/under a spread. Not yet implemented.'
  }
];

interface PariMutuelPool {
  outcome_name: string;
  outcome_description: string;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  betting_system_type: string;
  event_start_time: string;
  event_end_time: string;
  settlement_time: string;
  nonprofit_id: number | null;
  // Pari-mutuel specific fields
  betting_pools: PariMutuelPool[];
}

export default function MakeEventPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [emoji, setEmoji] = useState('🍌');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'banana-antics',
    betting_system_type: 'pari_mutuel',
    event_start_time: '',
    event_end_time: '',
    settlement_time: '',
    nonprofit_id: null,
    betting_pools: [
      { outcome_name: 'option_a', outcome_description: 'Option A' },
      { outcome_name: 'option_b', outcome_description: 'Option B' }
    ]
  });

  useEffect(() => {
    setEmoji(getRandomBananaEmoji());
    
    // Set default times (event in 2 hours, event lasts 1 hour, settlement 2 hours after event ends)
    // All times are in EST timezone
    const now = new Date();
    
    // Convert current time to EST
    const nowInEST = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    
    // Calculate default times in EST
    const eventStartTime = new Date(nowInEST.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
    const eventEndTime = new Date(eventStartTime.getTime() + 1 * 60 * 60 * 1000); // 1 hour after start
    const settlementTime = new Date(eventEndTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours after event ends
    
    // Format for datetime-local input (YYYY-MM-DDTHH:MM format)
    const formatForLocalInput = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    setFormData(prev => ({
      ...prev,
      event_start_time: formatForLocalInput(eventStartTime),
      event_end_time: formatForLocalInput(eventEndTime),
      settlement_time: formatForLocalInput(settlementTime)
    }));
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-banana-50 via-banana-100 to-grass-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🍌</div>
          <p className="text-banana-700 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addBettingPool = () => {
    setFormData(prev => ({
      ...prev,
      betting_pools: [
        ...prev.betting_pools,
        { outcome_name: '', outcome_description: '' }
      ]
    }));
  };

  const removeBettingPool = (index: number) => {
    if (formData.betting_pools.length > 2) { // Keep at least 2 pools
      setFormData(prev => ({
        ...prev,
        betting_pools: prev.betting_pools.filter((_, i) => i !== index)
      }));
    }
  };

  const updateBettingPool = (index: number, field: keyof PariMutuelPool, value: string) => {
    setFormData(prev => ({
      ...prev,
      betting_pools: prev.betting_pools.map((pool, i) => 
        i === index ? { ...pool, [field]: value } : pool
      )
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.description.trim()) return 'Description is required';
    if (!formData.nonprofit_id) return 'Please select a nonprofit organization';
    if (!formData.event_start_time) return 'Event start time is required';
    if (!formData.event_end_time) return 'Event end time is required';
    if (!formData.settlement_time) return 'Settlement time is required';
    
    const eventStartTime = new Date(formData.event_start_time);
    const eventEndTime = new Date(formData.event_end_time);
    const settlementTime = new Date(formData.settlement_time);
    const now = new Date();
    
    if (eventStartTime <= now) return 'Event start time must be in the future';
    if (eventEndTime <= eventStartTime) return 'Event end time must be after event start time';
    if (settlementTime <= eventEndTime) return 'Settlement time must be after event end time';
    
    if (formData.betting_system_type === 'pari_mutuel') {
      for (let i = 0; i < formData.betting_pools.length; i++) {
        const pool = formData.betting_pools[i];
        if (!pool.outcome_name.trim()) return `Pool ${i + 1} outcome name is required`;
        if (!pool.outcome_description.trim()) return `Pool ${i + 1} description is required`;
      }
      
      // Check for duplicate outcome names
      const outcomeNames = formData.betting_pools.map(p => p.outcome_name.toLowerCase().trim());
      const uniqueNames = new Set(outcomeNames);
      if (uniqueNames.size !== outcomeNames.length) return 'Outcome names must be unique';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // Transform the form data to match the API expectations
      // Keep everything in EST - no timezone conversion needed
      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        betting_system_type: formData.betting_system_type,
        event_start_time: formData.event_start_time + ':00', // Add seconds for complete ISO format
        event_end_time: formData.event_end_time + ':00',
        settlement_time: formData.settlement_time + ':00',
        nonprofit_id: formData.nonprofit_id
      };
      
      // Pari-mutuel specific data
      const pariMutuelData = formData.betting_system_type === 'pari_mutuel' ? {
        betting_pools: formData.betting_pools.map(pool => ({
          outcome_name: pool.outcome_name.toLowerCase().trim(),
          outcome_description: pool.outcome_description.trim()
        }))
      } : null;
      
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }

      const requestBody = {
        event_data: eventData,
        pari_mutuel_data: pariMutuelData
      };

      console.log('Sending create event request:', {
        url: `${API_BASE_URL}/api/events`,
        body: requestBody,
        note: 'Times are converted from EST input to UTC for backend storage'
      });

      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          throw new Error(`Failed to create event: ${response.status} ${response.statusText}`);
        }
        
        console.error('Backend error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          headers: Object.fromEntries(response.headers.entries()),
          errorData
        });
        
        // Handle authentication errors specifically
        if (response.status === 401) {
          setErrorMessage('Your session has expired. Please log in again.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }
        
        throw new Error(errorData.detail || errorData.message || `Failed to create event: ${response.status} - ${response.statusText}`);
      }
      
      const createdEvent = await response.json();
      
      setSubmitStatus('success');
      
      // Redirect to the new event after a brief success message
      setTimeout(() => {
        router.push(`/betting/${createdEvent.id}`);
      }, 2000);
      
    } catch (err) {
      console.error('Failed to create event:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to create event');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find(c => c.id === formData.category);
  const selectedBettingSystem = bettingSystems.find(s => s.id === formData.betting_system_type);

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
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              🎪
            </motion.span>
            <h1 className="font-baseball text-3xl md:text-5xl font-bold text-banana-800">
              Create Betting Event
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
            Design your own banana-tastic betting experience! 🎯
          </p>
        </motion.div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2"
          >
            <CheckCircle size={20} />
            <span>Event created successfully! Redirecting to event page...</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2"
          >
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-banana-200"
        >
          {/* Basic Event Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-baseball-800 mb-6 flex items-center space-x-2">
              <Trophy className="text-banana-600" />
              <span>Event Details</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Will the banana dance last more than 30 seconds?"
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-gray-900"
                  maxLength={255}
                />
              </div>

              {/* Event Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Event Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a detailed description of the event, rules, and how it will be determined..."
                  rows={4}
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-gray-900"
                />
              </div>

              {/* Nonprofit Selection */}
              <div className="md:col-span-2">
                <NonProfitDropdown
                  selectedNonProfitId={formData.nonprofit_id}
                  onSelect={(nonprofitId) => handleInputChange('nonprofit_id', nonprofitId)}
                  apiBaseUrl={API_BASE_URL}
                  required={true}
                  placeholder="Search and select a nonprofit to support..."
                />
                <p className="text-sm text-baseball-600 mt-1">
                  💝 All events must support a nonprofit organization. Betting proceeds will help fund their mission!
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-gray-900"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.emoji} {category.name}
                    </option>
                  ))}
                </select>
                {selectedCategory && (
                  <p className="text-sm text-baseball-600 mt-1">{selectedCategory.description}</p>
                )}
              </div>

              {/* Betting System */}
              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Betting System *
                </label>
                <select
                  value={formData.betting_system_type}
                  onChange={(e) => handleInputChange('betting_system_type', e.target.value)}
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-gray-900"
                >
                  {bettingSystems.map(system => (
                    <option key={system.id} value={system.id} disabled={system.id !== 'pari_mutuel'}>
                      {system.emoji} {system.name} {system.id !== 'pari_mutuel' ? '(Coming Soon)' : ''}
                    </option>
                  ))}
                </select>
                {selectedBettingSystem && (
                  <p className="text-sm text-baseball-600 mt-1" title={selectedBettingSystem.tooltip}>
                    {selectedBettingSystem.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Timing */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-baseball-800 mb-6 flex items-center space-x-2">
              <Clock className="text-banana-600" />
              <span>Event Timing</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Event Start Time */}
              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Event Start Time * (EST)
                </label>
                <input
                  type="datetime-local"
                  value={formData.event_start_time}
                  onChange={(e) => handleInputChange('event_start_time', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-gray-900"
                />
                <p className="text-sm text-baseball-600 mt-1">When the actual event begins (Eastern Time)</p>
              </div>

              {/* Event End Time */}
              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Event End Time * (EST)
                </label>
                <input
                  type="datetime-local"
                  value={formData.event_end_time}
                  onChange={(e) => handleInputChange('event_end_time', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-gray-900"
                />
                <p className="text-sm text-baseball-600 mt-1">When the actual event ends (Eastern Time)</p>
              </div>

              {/* Settlement Time */}
              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Settlement Time * (EST)
                </label>
                <input
                  type="datetime-local"
                  value={formData.settlement_time}
                  onChange={(e) => handleInputChange('settlement_time', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-gray-900"
                />
                <p className="text-sm text-baseball-600 mt-1">When the event outcome must be determined and payouts processed (Eastern Time)</p>
              </div>
            </div>
          </div>

          {/* Betting Pools */}
          {formData.betting_system_type === 'pari_mutuel' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-baseball-800 mb-6 flex items-center space-x-2">
                <Users className="text-banana-600" />
                <span>Betting Outcomes</span>
              </h2>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-baseball-700">Define the possible outcomes for this event</h3>
                  <button
                    type="button"
                    onClick={addBettingPool}
                    className="flex items-center space-x-2 px-4 py-2 bg-banana-500 hover:bg-banana-600 text-white rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Outcome</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.betting_pools.map((pool, index) => (
                    <div key={index} className="border border-banana-200 rounded-lg p-4 bg-banana-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-baseball-800">Outcome {index + 1}</h4>
                        {formData.betting_pools.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeBettingPool(index)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-baseball-700 mb-1">
                            Outcome Name * (lowercase, no spaces)
                          </label>
                          <input
                            type="text"
                            value={pool.outcome_name}
                            onChange={(e) => updateBettingPool(index, 'outcome_name', e.target.value)}
                            placeholder="e.g., option_a, team_wins, over_5"
                            className="w-full px-3 py-2 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-baseball-700 mb-1">
                            Description *
                          </label>
                          <input
                            type="text"
                            value={pool.outcome_description}
                            onChange={(e) => updateBettingPool(index, 'outcome_description', e.target.value)}
                            placeholder="e.g., This outcome will occur"
                            className="w-full px-3 py-2 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-center space-x-4">
            <motion.button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              className={cn(
                "px-8 py-3 font-bold rounded-lg transition-colors flex items-center space-x-2",
                isSubmitting
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-banana-500 hover:bg-banana-600 text-white"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full"></div>
                  <span>Creating Event...</span>
                </>
              ) : (
                <>
                  <Trophy size={20} />
                  <span>Create Event</span>
                  <span>{emoji}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-banana-200"
        >
          <p className="text-baseball-600 italic">
            💡 Tip: Make sure your event description is clear and specific about how the outcome will be determined!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
