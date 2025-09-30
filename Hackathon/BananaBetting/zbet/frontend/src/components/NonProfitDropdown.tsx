'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Check, ChevronDown, Building2, ExternalLink, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NonProfit {
  id: number;
  name: string;
  website?: string;
  is_verified: boolean;
  description?: string;
}

interface NonProfitDropdownProps {
  selectedNonProfitId: number | null;
  onSelect: (nonprofitId: number) => void;
  apiBaseUrl: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export default function NonProfitDropdown({
  selectedNonProfitId,
  onSelect,
  apiBaseUrl,
  className = '',
  placeholder = 'Search for a nonprofit...',
  required = false
}: NonProfitDropdownProps) {
  const [nonprofits, setNonProfits] = useState<NonProfit[]>([]);
  const [filteredNonProfits, setFilteredNonProfits] = useState<NonProfit[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch nonprofits from API
  useEffect(() => {
    const fetchNonProfits = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${apiBaseUrl}/api/nonprofits?active_only=true`);
        if (!response.ok) {
          throw new Error('Failed to fetch nonprofits');
        }
        
        const data = await response.json();
        setNonProfits(data);
        setFilteredNonProfits(data);
      } catch (err) {
        console.error('Error fetching nonprofits:', err);
        setError('Failed to load nonprofits');
        setNonProfits([]);
        setFilteredNonProfits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNonProfits();
  }, [apiBaseUrl]);

  // Filter nonprofits based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredNonProfits(nonprofits);
      return;
    }

    const filtered = nonprofits.filter(nonprofit =>
      nonprofit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (nonprofit.description && nonprofit.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredNonProfits(filtered);
  }, [searchTerm, nonprofits]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedNonProfit = nonprofits.find(np => np.id === selectedNonProfitId);

  const handleSelect = (e: React.MouseEvent, nonprofit: NonProfit) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(nonprofit.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredNonProfits.length === 1) {
        // Create a synthetic mouse event for handleSelect
        const syntheticEvent = e as any;
        handleSelect(syntheticEvent, filteredNonProfits[0]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-baseball-700 mb-2">
        Supporting Nonprofit {required && '*'}
      </label>
      
      <div className="relative">
        <div
          onClick={handleInputClick}
          className="w-full px-4 py-3 border border-banana-300 rounded-lg focus-within:ring-2 focus-within:ring-banana-500 focus-within:border-banana-500 transition-colors bg-white cursor-text"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <Building2 size={18} className="text-gray-400 flex-shrink-0" />
              
              {selectedNonProfit && !isOpen ? (
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <span className="text-gray-900 truncate">{selectedNonProfit.name}</span>
                  {selectedNonProfit.is_verified && (
                    <Shield size={16} className="text-green-600 flex-shrink-0" title="Verified nonprofit" />
                  )}
                </div>
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={selectedNonProfit ? selectedNonProfit.name : placeholder}
                  className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                />
              )}
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              {loading && (
                <div className="animate-spin w-4 h-4 border-2 border-banana-500 border-t-transparent rounded-full"></div>
              )}
              
              {isOpen ? (
                <Search size={18} className="text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}

        {/* Selected nonprofit info */}
        {selectedNonProfit && !isOpen && (
          <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
            {selectedNonProfit.is_verified && (
              <span className="inline-flex items-center space-x-1 text-green-600">
                <Shield size={14} />
                <span>Verified</span>
              </span>
            )}
            {selectedNonProfit.website && (
              <a
                href={selectedNonProfit.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-banana-600 hover:text-banana-700 transition-colors"
              >
                <ExternalLink size={14} />
                <span>Visit website</span>
              </a>
            )}
          </div>
        )}

        {/* Dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-1 bg-white border border-banana-300 rounded-lg shadow-lg max-h-64 overflow-auto"
            >
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin w-6 h-6 border-2 border-banana-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                  Loading nonprofits...
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-600">
                  {error}
                </div>
              ) : filteredNonProfits.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm ? 'No nonprofits found matching your search' : 'No nonprofits available'}
                </div>
              ) : (
                <div className="py-1">
                  {filteredNonProfits.map((nonprofit) => (
                    <motion.button
                      key={nonprofit.id}
                      type="button"
                      onClick={(e) => handleSelect(e, nonprofit)}
                      whileHover={{ backgroundColor: '#fef3c7' }}
                      className="w-full px-4 py-3 text-left hover:bg-banana-50 transition-colors border-none bg-transparent cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Building2 size={18} className="text-gray-400 group-hover:text-banana-600 transition-colors" />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 truncate">
                                {nonprofit.name}
                              </span>
                              {nonprofit.is_verified && (
                                <Shield size={16} className="text-green-600 flex-shrink-0" title="Verified nonprofit" />
                              )}
                            </div>
                            
                            {nonprofit.description && (
                              <p className="text-sm text-gray-500 truncate mt-1">
                                {nonprofit.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {selectedNonProfitId === nonprofit.id && (
                          <Check size={18} className="text-banana-600 flex-shrink-0" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
