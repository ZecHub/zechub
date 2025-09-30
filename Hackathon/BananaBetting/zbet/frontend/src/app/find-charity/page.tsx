'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface NonProfit {
  id: number;
  name: string;
  website: string | null;
  description: string | null;
  date_added: string;
  is_verified: boolean;
  is_active: boolean;
  zcash_transparent_address: string;
  zcash_shielded_address: string;
}

interface ApiResponse {
  nonprofits?: NonProfit[];
  error?: string;
}

export default function FindCharityPage() {
  const { user } = useAuth();
  const [nonprofits, setNonprofits] = useState<NonProfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchNonprofits();
  }, []);

  const fetchNonprofits = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/nonprofits?active_only=true`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // The API returns an array directly, not wrapped in an object
      if (Array.isArray(data)) {
        setNonprofits(data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch charities');
      console.error('Error fetching nonprofits:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown';
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      alert(`${type} address copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy address');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-white text-xl">Loading charities...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                onClick={fetchNonprofits}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Find Charities</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover and support verified nonprofits through our platform. You can bet on events that benefit these organizations or donate directly to them using Zcash.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 text-center">
          <div className="text-3xl font-bold text-white mb-2">{nonprofits.length}</div>
          <div className="text-white/90">Registered Charities</div>
        </div>

        {/* Charity Listings */}
        {nonprofits.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">No Charities Found</h3>
            <p className="text-gray-600">
              There are currently no active charities registered on our platform. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nonprofits.map((nonprofit) => (
              <div key={nonprofit.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white truncate">{nonprofit.name}</h3>
                    {nonprofit.is_verified && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Description */}
                  {nonprofit.description && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">About</h4>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {nonprofit.description}
                      </p>
                    </div>
                  )}

                  {/* Website */}
                  {nonprofit.website && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Website</h4>
                      <a
                        href={nonprofit.website.startsWith('http') ? nonprofit.website : `https://${nonprofit.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm underline break-all"
                      >
                        {nonprofit.website}
                      </a>
                    </div>
                  )}

                  {/* Date Added */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Date Added</h4>
                    <p className="text-gray-600 text-sm">{formatDate(nonprofit.date_added)}</p>
                  </div>

                  {/* Zcash Addresses */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Donate Directly with Zcash</h4>
                    
                    {/* Transparent Address */}
                    <div className="mb-3">
                      <label className="text-xs text-gray-500 block mb-1">Transparent Address</label>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono break-all flex-1 min-w-0 text-gray-800">
                          {nonprofit.zcash_transparent_address}
                        </code>
                        <button
                          onClick={() => copyToClipboard(nonprofit.zcash_transparent_address, 'Transparent')}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs flex-shrink-0"
                          title="Copy transparent address"
                        >
                          📋
                        </button>
                      </div>
                    </div>

                    {/* Shielded Address */}
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Shielded Address (Private)</label>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono break-all flex-1 min-w-0 text-gray-800">
                          {nonprofit.zcash_shielded_address}
                        </code>
                        <button
                          onClick={() => copyToClipboard(nonprofit.zcash_shielded_address, 'Shielded')}
                          className="bg-purple-500 hover:bg-purple-600 text-white p-1 rounded text-xs flex-shrink-0"
                          title="Copy shielded address"
                        >
                          📋
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-500">
                      <p>💡 Use the shielded address for private donations</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Info */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Want to Add Your Charity?</h3>
          <p className="text-white/90 mb-4">
            If you represent a nonprofit organization and would like to be listed on our platform, you can add it directly.
          </p>
          <a
            href="/add-nonprofit"
            className="inline-block bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Add Your Nonprofit
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
