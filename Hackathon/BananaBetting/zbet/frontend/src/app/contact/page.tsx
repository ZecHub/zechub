'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle, Github, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show an alert since this is a demo
    alert('Thanks for your message! This is a demo, so we can\'t actually send emails yet.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
            <span className="text-6xl mb-4 block">📧</span>
            <h1 className="font-baseball text-4xl font-bold text-baseball-800 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-baseball-600">
              Got questions? We'd love to hear from you!
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-baseball text-2xl font-bold text-baseball-800 mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-baseball-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-baseball-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-baseball-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-baseball-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-banana-500 hover:bg-banana-600 text-baseball-800 font-bold py-2 px-4 rounded-md transition-colors duration-200"
              >
                Send Message 🚀
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-baseball text-xl font-bold text-baseball-800 mb-4">
                🍌 Get in Touch
              </h3>
              <p className="text-baseball-600 mb-4">
                We're always excited to hear from our community! Whether you have questions, 
                suggestions, or just want to say hello, don't hesitate to reach out.
              </p>
              
              <div className="flex space-x-4">
                <a
                  href="https://github.com/readymouse/BananaBetting"
                  className="flex items-center space-x-2 text-banana-600 hover:text-banana-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-baseball text-xl font-bold text-baseball-800 mb-4">
                ⚠️ Demo Notice
              </h3>
              <p className="text-sm text-baseball-600">
                This is a hackathon project for demonstration purposes. 
                Contact form submissions are not actually processed, but we'd love to hear 
                your feedback about the concept and implementation!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
