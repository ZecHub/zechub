'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Info, 
  Mail, 
  Shield, 
  FileText, 
  HelpCircle,
  Users,
  Plus,
  DollarSign
} from 'lucide-react';
import Disclaimer from './Disclaimer';

const footerLinks = [
  {
    title: 'Quick Actions',
    links: [
      {
        name: 'Add Non-Profit',
        href: '/add-nonprofit',
        icon: Plus,
        emoji: '🏢'
      },
      {
        name: 'Find Charities',
        href: '/find-charity',
        icon: Heart,
        emoji: '❤️'
      }
    ]
  },
  {
    title: 'About',
    links: [
      {
        name: 'About Us',
        href: '/about',
        icon: Info,
        emoji: '🍌'
      },
      {
        name: 'How It Works',
        href: '/how-it-works',
        icon: HelpCircle,
        emoji: '❓'
      },
      {
        name: 'Community',
        href: '/community',
        icon: Users,
        emoji: '👥'
      }
    ]
  },
  {
    title: 'Support',
    links: [
      {
        name: 'Contact',
        href: '/contact',
        icon: Mail,
        emoji: '📧'
      },
      {
        name: 'Help Center',
        href: '/help',
        icon: HelpCircle,
        emoji: '🆘'
      }
    ]
  },
  {
    title: 'Legal',
    links: [
      {
        name: 'Privacy Policy',
        href: '/privacy',
        icon: Shield,
        emoji: '🔒'
      },
      {
        name: 'Terms of Service',
        href: '/terms',
        icon: FileText,
        emoji: '📄'
      }
    ]
  },
  {
    title: 'Admin',
    links: [
      {
        name: 'Payouts',
        href: '/payouts',
        icon: DollarSign,
        emoji: '💰'
      }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-banana-100 to-white/50 backdrop-blur-sm border-t border-banana-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Footer Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="space-y-4"
            >
              <h3 className="font-baseball font-bold text-baseball-800 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center space-x-2 text-sm text-baseball-700 hover:text-banana-600 transition-colors duration-200"
                    >
                      <span className="text-sm group-hover:scale-110 transition-transform">
                        {link.emoji}
                      </span>
                      <span className="group-hover:underline">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Brand Section */}
        <div className="border-t border-banana-300 pt-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <motion.span 
                className="text-2xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                🍌
              </motion.span>
              <div>
                <h2 className="font-baseball text-lg font-bold text-baseball-800">
                  Banana Betting
                </h2>
                <p className="text-sm text-baseball-600 italic">
                  Savannah Bananas Style Sports Betting!
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-baseball-600">
              <span>© 2025 Banana Betting</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">ZecHub Zcash Hackathon Project</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Disclaimer />
      </div>
    </footer>
  );
}
