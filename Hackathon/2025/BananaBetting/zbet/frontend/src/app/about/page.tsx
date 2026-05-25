'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Users, Heart, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-banana-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-banana-600 hover:text-banana-700 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center">
            <span className="text-6xl mb-4 block">🍌</span>
            <h1 className="font-baseball text-4xl font-bold text-baseball-800 mb-4">
              About Banana Betting
            </h1>
            <p className="text-xl text-baseball-600 italic">
              Savannah Bananas Style Sports Betting!
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-baseball text-2xl font-bold text-baseball-800 mb-4">
              🎪 Our Mission
            </h2>
            <p className="text-baseball-700 leading-relaxed mb-4">
              Banana Betting brings the fun, energy, and entertainment of the Savannah Bananas 
              to the world of sports betting. We're not just about placing bets – we're about 
              creating an experience that's as exciting and unpredictable as a Bananas game!
            </p>
            <p className="text-baseball-700 leading-relaxed">
              Our platform combines cutting-edge blockchain technology with charitable giving, 
              making every bet count for something bigger than just winning or losing.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-baseball text-2xl font-bold text-baseball-800 mb-6">
              🏆 What Makes Us Different
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-banana-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-banana-600" size={32} />
                </div>
                <h3 className="font-bold text-baseball-800 mb-2">Charitable Focus</h3>
                <p className="text-sm text-baseball-600">
                  Every bet supports verified non-profit organizations
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-banana-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-banana-600" size={32} />
                </div>
                <h3 className="font-bold text-baseball-800 mb-2">Blockchain Powered</h3>
                <p className="text-sm text-baseball-600">
                  Private, secure, and decentralized using Zcash
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-banana-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-banana-600" size={32} />
                </div>
                <h3 className="font-bold text-baseball-800 mb-2">Community First</h3>
                <p className="text-sm text-baseball-600">
                  Built by the community, for the community
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-banana-100 rounded-lg p-8"
          >
            <h2 className="font-baseball text-2xl font-bold text-baseball-800 mb-4">
              🚀 Hackathon Project
            </h2>
            <p className="text-baseball-700 leading-relaxed mb-4">
              Banana Betting was created for the 2025 ZecHub Zcash Hackathon, showcasing the 
              power of blockchain technology in creating innovative, community-driven applications.
            </p>
            <p className="text-baseball-700 leading-relaxed">
              This is a demonstration project that explores how we can combine entertainment, 
              technology, and social good into one exciting platform.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
