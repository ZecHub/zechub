'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, Scale, Users } from 'lucide-react';

export default function TermsPage() {
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
            <span className="text-6xl mb-4 block">📄</span>
            <h1 className="font-baseball text-4xl font-bold text-baseball-800 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-baseball-600">
              The rules of our banana-filled playground
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-red-100 border border-red-300 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="text-red-600" size={24} />
              <h2 className="font-baseball text-xl font-bold text-red-800">
                IMPORTANT DEMO NOTICE
              </h2>
            </div>
            <div className="space-y-3 text-red-700">
              <p>
                <strong>This is a hackathon demonstration project</strong> created for the 2025 ZecHub Zcash Hackathon.
              </p>
              <p>
                <strong>NO REAL GAMBLING:</strong> This platform cannot and should not be used for actual betting 
                or gambling activities. We do not have legal jurisdiction for gambling operations.
              </p>
              <p>
                <strong>DEMONSTRATION ONLY:</strong> All betting activities are simulated and for 
                educational/demonstration purposes only.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="text-banana-600" size={24} />
              <h2 className="font-baseball text-2xl font-bold text-baseball-800">
                Acceptance of Terms
              </h2>
            </div>
            <p className="text-baseball-700 mb-4">
              By accessing and using the Banana Betting demonstration platform, you acknowledge that:
            </p>
            <ul className="space-y-2 text-baseball-700 ml-6">
              <li>• This is a demonstration project and not a real betting platform</li>
              <li>• No real money or cryptocurrency will be wagered</li>
              <li>• All activities are simulated for educational purposes</li>
              <li>• You understand this is a hackathon project showcasing blockchain technology</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Scale className="text-banana-600" size={24} />
              <h2 className="font-baseball text-2xl font-bold text-baseball-800">
                Platform Usage
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-baseball-800 mb-2">✅ Permitted Uses</h3>
                <ul className="space-y-1 text-sm text-baseball-700 ml-4">
                  <li>• Exploring the demonstration features</li>
                  <li>• Learning about blockchain technology</li>
                  <li>• Testing the user interface and experience</li>
                  <li>• Providing feedback for improvement</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-baseball-800 mb-2">❌ Prohibited Uses</h3>
                <ul className="space-y-1 text-sm text-baseball-700 ml-4">
                  <li>• Attempting to use for real gambling</li>
                  <li>• Trying to exploit or hack the system</li>
                  <li>• Submitting false or misleading information</li>
                  <li>• Using the platform for any illegal activities</li>
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
                User Responsibilities
              </h2>
            </div>
            <p className="text-baseball-700 mb-4">
              When using our demonstration platform, you agree to:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-baseball-800 mb-3">🍌 Be Respectful</h3>
                <ul className="space-y-1 text-sm text-baseball-700">
                  <li>• Treat other users with respect</li>
                  <li>• Use appropriate language</li>
                  <li>• Respect the demo nature of the platform</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-baseball-800 mb-3">🔒 Protect Access</h3>
                <ul className="space-y-1 text-sm text-baseball-700">
                  <li>• Keep your demo account secure</li>
                  <li>• Don't share login credentials</li>
                  <li>• Report any security issues</li>
                </ul>
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
              🎯 Charitable Component
            </h2>
            <p className="text-baseball-700 mb-3">
              While this is a demonstration, the charitable giving concept is real. In a production version:
            </p>
            <ul className="space-y-2 text-baseball-700 ml-6">
              <li>• All non-profits would be verified 501(c)(3) organizations</li>
              <li>• Donations would be processed through legitimate channels</li>
              <li>• Full transparency would be maintained through blockchain records</li>
              <li>• Users would receive proper tax documentation</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-baseball text-xl font-bold text-baseball-800 mb-4">
              ⚠️ Disclaimers and Limitations
            </h2>
            <div className="space-y-4 text-sm text-baseball-700">
              <p>
                <strong>No Warranty:</strong> This demonstration is provided "as is" without any warranties. 
                Features may not work perfectly as this is a hackathon project.
              </p>
              <p>
                <strong>Educational Purpose:</strong> This platform is designed to showcase blockchain 
                technology and innovative applications, not to provide gambling services.
              </p>
              <p>
                <strong>No Financial Liability:</strong> Since no real money is involved, there are no 
                financial obligations or liabilities.
              </p>
              <p>
                <strong>Temporary Nature:</strong> This demonstration may be taken offline at any time 
                after the hackathon concludes.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-baseball text-xl font-bold text-baseball-800 mb-4">
              📞 Questions or Concerns?
            </h2>
            <p className="text-baseball-700 mb-4">
              If you have questions about these terms or the demonstration platform:
            </p>
            <div className="bg-banana-50 rounded-lg p-4">
              <p className="text-sm text-baseball-600">
                <strong>Contact:</strong> terms@bananabetting.com<br />
                <strong>Note:</strong> This is a demo project, so responses may be limited.
              </p>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-baseball-500"
          >
            <p>Last updated: September 2025 • Demonstration Terms for ZecHub Zcash Hackathon</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
