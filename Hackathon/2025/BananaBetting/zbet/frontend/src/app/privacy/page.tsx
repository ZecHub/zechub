'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Users } from 'lucide-react';

export default function PrivacyPage() {
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
            <span className="text-6xl mb-4 block">🔒</span>
            <h1 className="font-baseball text-4xl font-bold text-baseball-800 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-baseball-600">
              Your privacy is as important to us as a perfect banana split
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-banana-100 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="text-banana-600" size={24} />
              <h2 className="font-baseball text-xl font-bold text-baseball-800">
                Demo Project Notice
              </h2>
            </div>
            <p className="text-baseball-700">
              <strong>Important:</strong> This is a hackathon demonstration project created for the 
              2025 ZecHub Zcash Hackathon. This privacy policy is for demonstration purposes only. 
              No real user data is collected or processed beyond what's necessary for the demo.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="text-banana-600" size={24} />
              <h2 className="font-baseball text-2xl font-bold text-baseball-800">
                What We Would Collect
              </h2>
            </div>
            <p className="text-baseball-700 mb-4">
              In a production version of Banana Betting, we would collect:
            </p>
            <ul className="space-y-2 text-baseball-700 ml-6">
              <li>• <strong>Account Information:</strong> Username, email address, and encrypted authentication data</li>
              <li>• <strong>Betting Activity:</strong> Bet history, preferences, and platform interactions</li>
              <li>• <strong>Blockchain Data:</strong> Wallet addresses and transaction hashes (publicly visible on blockchain)</li>
              <li>• <strong>Usage Analytics:</strong> How you interact with our platform to improve user experience</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="text-banana-600" size={24} />
              <h2 className="font-baseball text-2xl font-bold text-baseball-800">
                How We Would Protect Your Data
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-baseball-800 mb-3">🔐 Security Measures</h3>
                <ul className="space-y-2 text-sm text-baseball-700">
                  <li>• End-to-end encryption for sensitive data</li>
                  <li>• Secure authentication protocols</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Limited access controls</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-baseball-800 mb-3">🍌 Privacy by Design</h3>
                <ul className="space-y-2 text-sm text-baseball-700">
                  <li>• Minimal data collection</li>
                  <li>• Blockchain privacy features via Zcash</li>
                  <li>• User control over data sharing</li>
                  <li>• Transparent data practices</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Users className="text-banana-600" size={24} />
              <h2 className="font-baseball text-2xl font-bold text-baseball-800">
                Your Rights
              </h2>
            </div>
            <p className="text-baseball-700 mb-4">
              In a production environment, you would have the right to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-banana-600">✓</span>
                  <span className="text-sm text-baseball-700">Access your personal data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-banana-600">✓</span>
                  <span className="text-sm text-baseball-700">Correct inaccurate information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-banana-600">✓</span>
                  <span className="text-sm text-baseball-700">Delete your account and data</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-banana-600">✓</span>
                  <span className="text-sm text-baseball-700">Export your data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-banana-600">✓</span>
                  <span className="text-sm text-baseball-700">Opt out of marketing communications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-banana-600">✓</span>
                  <span className="text-sm text-baseball-700">Restrict data processing</span>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-banana-100 rounded-lg p-6"
          >
            <h2 className="font-baseball text-xl font-bold text-baseball-800 mb-4">
              🌐 Blockchain Transparency
            </h2>
            <p className="text-baseball-700 mb-3">
              Banana Betting leverages Zcash's privacy features to protect user transaction details 
              while maintaining the transparency and security benefits of blockchain technology.
            </p>
            <p className="text-baseball-700">
              While betting outcomes and charitable donations are recorded on the blockchain for 
              transparency, personal transaction details remain private through Zcash's shielded transactions.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-baseball text-xl font-bold text-baseball-800 mb-4">
              📞 Contact Us About Privacy
            </h2>
            <p className="text-baseball-700 mb-4">
              If you have questions about this privacy policy or how we would handle your data 
              in a production environment, please contact us:
            </p>
            <div className="bg-banana-50 rounded-lg p-4">
              <p className="text-sm text-baseball-600">
                <strong>Email:</strong> privacy@bananabetting.com<br />
                <strong>Note:</strong> This is a demo project, so the email is not monitored.
              </p>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center text-sm text-baseball-500"
          >
            <p>Last updated: September 2025 • This is a demonstration privacy policy for hackathon purposes</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
