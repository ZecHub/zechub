'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  TrendingUp, 
  User, 
  LogOut, 
  Menu, 
  X,
  Trophy,
  Scale
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn, getRandomBananaEmoji } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    emoji: '🏠'
  },
  {
    name: 'Find Bets',
    href: '/betting',
    icon: Search,
    emoji: '🔍'
  },
  {
    name: 'Make Event',
    href: '/make-event',
    icon: Trophy,
    emoji: '🎪'
  },
  {
    name: 'My Bets',
    href: '/my-bets',
    icon: TrendingUp,
    emoji: '📈'
  },
  {
    name: 'Settle Bets',
    href: '/settle-bets',
    icon: Scale,
    emoji: '⚖️'
  },
  {
    name: 'Profile', // This will be dynamically replaced with username
    href: '/profile',
    icon: User,
    emoji: '👤'
  }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userEmoji, setUserEmoji] = useState('🍌');
  const { user, logout, isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Set random emoji after mounting
    setUserEmoji(getRandomBananaEmoji());
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Don't render anything during hydration or when not authenticated
  if (!mounted || loading || !isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 bg-banana-500 shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍌</span>
              <span className="font-baseball text-lg font-bold text-baseball-800">
                Banana Betting
              </span>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-banana-400 text-baseball-800 hover:bg-banana-300 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 20 }}
                className="fixed right-0 top-0 bottom-0 w-64 bg-banana-50 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pt-16 px-4">
                  <div className="mb-6 p-4 bg-banana-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-banana-500 rounded-full flex items-center justify-center">
                        <span className="text-lg">{userEmoji}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-baseball-800">{user?.username}</p>
                        <p className="text-sm text-baseball-600">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const isActive = pathname === item.href;
                      const displayName = item.name === 'Profile' ? (user?.username || 'Profile') : item.name;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                            isActive
                              ? 'bg-banana-500 text-baseball-900 shadow-md'
                              : 'text-baseball-700 hover:bg-banana-200'
                          )}
                        >
                          <span className="text-xl">{item.emoji}</span>
                          <span className="font-medium">{displayName}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-8 pt-4 border-t border-banana-300">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut size={20} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="fixed top-0 left-0 right-0 z-50 bg-banana-500 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <motion.span 
                  className="text-3xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  🍌
                </motion.span>
                <div>
                  <h1 className="font-baseball text-xl font-bold text-baseball-800">
                    Banana Betting
                  </h1>
                  <p className="text-xs text-baseball-600 italic">Savannah Bananas Style!</p>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="flex items-center space-x-6">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  const displayName = item.name === 'Profile' ? (user?.username || 'Profile') : item.name;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 group',
                        isActive
                          ? 'bg-banana-600 text-white shadow-md'
                          : 'text-baseball-800 hover:bg-banana-400'
                      )}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">
                        {item.emoji}
                      </span>
                      <span className="font-medium">{displayName}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="p-2 text-baseball-800 hover:bg-banana-400 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}
