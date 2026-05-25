'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { tokenManager } from '@/lib/api';

/**
 * ValidationStatusCard - Shows validation metrics for betting events
 * 
 * Display Logic:
 * - While event is open: Hidden (returns null)
 * - After event closed but before settlement:
 *   - If user has bet OR already validated: Show current validation metrics
 *   - If user hasn't bet AND hasn't validated: Show placeholder message
 * - After event settled: Show final validation results (same visibility rules)
 * 
 * Authentication: Only shown to authenticated users
 */

interface ValidationData {
  sport_event_id: number;
  total_validations: number;
  outcome_counts: { [key: string]: number };
  consensus_outcome: string | null;
  consensus_percentage: number | null;
  validation_deadline: string | null;
}

interface UserEventStatus {
  event_id: number;
  user_id: number;
  has_bet: boolean;
  has_validated: boolean;
  validation: {
    predicted_outcome: string;
    validated_at: string;
    confidence_level: string | null;
  } | null;
}

interface ValidationStatusCardProps {
  eventId: string;
  eventStatus: string;
  isAuthenticated: boolean;
}

interface EventDetails {
  id: number;
  betting_system_type: string;
  betting_system_data: {
    betting_pools?: Array<{
      outcome_name: string;
      outcome_description: string;
    }>;
  };
}

const API_BASE_URL = 'http://localhost:8000';

export default function ValidationStatusCard({ 
  eventId, 
  eventStatus, 
  isAuthenticated 
}: ValidationStatusCardProps) {
  const [validationData, setValidationData] = useState<ValidationData | null>(null);
  const [userStatus, setUserStatus] = useState<UserEventStatus | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && (eventStatus === 'closed' || eventStatus === 'settled' || eventStatus === 'paidout')) {
      // Add a small delay to ensure token is available
      const timer = setTimeout(() => {
        fetchValidationData();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [eventId, eventStatus, isAuthenticated]);

  const fetchValidationData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get the authentication token
      const token = tokenManager.getToken();
      if (!token) {
        console.warn('No authentication token found, skipping validation data fetch');
        return; // Quietly return instead of throwing error
      }

      // Fetch validation summary, user status, and event details in parallel
      const [validationResponse, userStatusResponse, eventResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/events/${eventId}/validation-summary`),
        fetch(`${API_BASE_URL}/api/events/${eventId}/user-status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch(`${API_BASE_URL}/api/events/${eventId}`)
      ]);

      if (!validationResponse.ok) {
        throw new Error('Failed to fetch validation data');
      }

      if (!userStatusResponse.ok) {
        if (userStatusResponse.status === 401) {
          throw new Error('Authentication required. Please log in again.');
        }
        throw new Error('Failed to fetch user status');
      }

      if (!eventResponse.ok) {
        throw new Error('Failed to fetch event details');
      }

      const validation = await validationResponse.json();
      const userStat = await userStatusResponse.json();
      const eventData = await eventResponse.json();

      setValidationData(validation);
      setUserStatus(userStat);
      setEventDetails(eventData);
    } catch (err) {
      console.error('Failed to fetch validation data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load validation data');
    } finally {
      setLoading(false);
    }
  };

  // Don't show card if event is still open
  if (eventStatus === 'open') {
    return null;
  }

  // Don't show card if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="animate-spin w-5 h-5 border-2 border-banana-500 border-t-transparent rounded-full"></div>
          <h3 className="text-lg font-bold text-baseball-800">Loading Validation Status...</h3>
        </div>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="text-red-500" size={20} />
          <h3 className="text-lg font-bold text-red-800">Validation Status Unavailable</h3>
        </div>
        <p className="text-red-600 text-sm">{error}</p>
      </motion.div>
    );
  }

  // Determine if user should see validation metrics
  const shouldShowMetrics = userStatus?.has_bet || userStatus?.has_validated;

  // Create a complete list of outcomes with vote counts (including 0 votes)
  const getCompleteOutcomeData = () => {
    if (!eventDetails?.betting_system_data?.betting_pools || !validationData) {
      return [];
    }

    const allOutcomes = eventDetails.betting_system_data.betting_pools.map(pool => ({
      outcome_name: pool.outcome_name,
      outcome_description: pool.outcome_description,
      vote_count: validationData.outcome_counts[pool.outcome_name] || 0
    }));

    return allOutcomes.sort((a, b) => b.vote_count - a.vote_count); // Sort by vote count descending
  };

  const completeOutcomes = getCompleteOutcomeData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-banana-200"
    >
      <div className="flex items-center space-x-3 mb-4">
        <CheckCircle className="text-purple-600" size={20} />
        <h3 className="text-lg font-bold text-baseball-800">Validation Status</h3>
      </div>

      {eventStatus === 'settled' || eventStatus === 'paidout' ? (
        // Event is settled or paid out - show final results
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle size={16} />
            <span className="font-medium">
              {eventStatus === 'paidout' ? 'Event Paid Out' : 'Event Settled'}
            </span>
          </div>
          
          {shouldShowMetrics && validationData && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-baseball-600">Total Validators:</span>
                  <span className="font-bold text-baseball-800">{validationData.total_validations}</span>
                </div>
                
                {validationData.consensus_outcome && (
                  <div className="flex items-center justify-between">
                    <span className="text-baseball-600">Consensus Result:</span>
                    <span className="font-bold text-green-600">{validationData.consensus_outcome}</span>
                  </div>
                )}
                
                {validationData.consensus_percentage && (
                  <div className="flex items-center justify-between">
                    <span className="text-baseball-600">Consensus:</span>
                    <span className="font-bold text-baseball-800">{validationData.consensus_percentage.toFixed(1)}%</span>
                  </div>
                )}
              </div>

              {completeOutcomes.length > 0 && (
                <div className="pt-3 border-t border-banana-200">
                  <h4 className="text-sm font-medium text-baseball-700 mb-2">Validation Breakdown:</h4>
                  <div className="space-y-2">
                    {completeOutcomes.map((outcome) => (
                      <div key={outcome.outcome_name} className="flex items-center justify-between text-sm">
                        <span className="text-baseball-600">{outcome.outcome_description}:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-baseball-800">{outcome.vote_count} votes</span>
                          <span className="text-xs text-baseball-500">
                            ({validationData && validationData.total_validations > 0 ? ((outcome.vote_count / validationData.total_validations) * 100).toFixed(1) : 0}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {!shouldShowMetrics && (
            <div className="text-center py-4 text-baseball-500">
              <p className="text-sm">
                Validation metrics are only shown to users who bet on this event or participated in validation.
              </p>
            </div>
          )}
        </div>
      ) : (
        // Event is closed but not settled - validation period
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-orange-600">
            <Clock size={16} />
            <span className="font-medium">Validation Period</span>
          </div>

          {validationData?.validation_deadline && (
            <div className="flex items-center justify-between">
              <span className="text-baseball-600">Validation Deadline:</span>
              <div className="text-right">
                <div className="text-baseball-800 font-medium text-sm">
                  {new Date(validationData.validation_deadline).toLocaleDateString()}
                </div>
                <div className="text-xs text-baseball-500">
                  {new Date(validationData.validation_deadline).toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}

          {userStatus?.has_validated && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-green-700 mb-1">
                <CheckCircle size={16} />
                <span className="font-medium text-sm">You've submitted your validation</span>
              </div>
              <div className="text-xs text-green-600">
                Your vote: <strong>{userStatus.validation?.predicted_outcome}</strong>
              </div>
              {userStatus.validation?.validated_at && (
                <div className="text-xs text-green-500 mt-1">
                  Submitted: {new Date(userStatus.validation.validated_at).toLocaleString()}
                </div>
              )}
            </div>
          )}

          {shouldShowMetrics && validationData ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-baseball-600">Current Validators:</span>
                <span className="font-bold text-baseball-800">{validationData.total_validations}</span>
              </div>

              {completeOutcomes.length > 0 && (
                <div className="pt-3 border-t border-banana-200">
                  <h4 className="text-sm font-medium text-baseball-700 mb-2">Current Validation Votes:</h4>
                  <div className="space-y-2">
                    {completeOutcomes.map((outcome) => (
                      <div key={outcome.outcome_name} className="flex items-center justify-between text-sm">
                        <span className="text-baseball-600">{outcome.outcome_description}:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-baseball-800">{outcome.vote_count} votes</span>
                          <span className="text-xs text-baseball-500">
                            ({validationData && validationData.total_validations > 0 ? ((outcome.vote_count / validationData.total_validations) * 100).toFixed(1) : 0}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {validationData.total_validations < 3 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-yellow-700">
                    <AlertTriangle size={16} />
                    <span className="text-sm font-medium">
                      Needs more validators (minimum 3 required for consensus)
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-baseball-500">
              <p className="text-sm">
                {!userStatus?.has_bet && !userStatus?.has_validated 
                  ? "Validation metrics will be shown after you place a bet or submit a validation vote."
                  : "Waiting for validation data..."}
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
