'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Plus, Building, Heart, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { tokenManager } from '@/lib/api';

export default function AddNonProfitPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    ein: '',
    contactEmail: '',
    contactName: '',
    contactPhone: '',
    zcashTransparentAddress: '',
    zcashShieldedAddress: '',
    mission: '',
    verificationNotes: '',
    legalVerification: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setErrorMessage('Please log in to submit a non-profit application.');
      setSubmitStatus('error');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      
      // Combine mission and description for the description field
      const combinedDescription = formData.mission + (formData.description ? '\n\nAdditional Information:\n' + formData.description : '');
      
      const requestBody = {
        name: formData.name,
        website: formData.website,
        federal_tax_id: formData.ein,
        contact_email: formData.contactEmail,
        contact_name: formData.contactName,
        contact_phone: formData.contactPhone,
        zcash_transparent_address: formData.zcashTransparentAddress,
        zcash_shielded_address: formData.zcashShieldedAddress,
        description: combinedDescription,
        verification_notes: formData.verificationNotes || null,
        is_verified: formData.legalVerification
      };
      
      const response = await fetch(`${API_BASE_URL}/api/nonprofits`, {
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
          throw new Error(`Failed to submit non-profit: ${response.status} ${response.statusText}`);
        }
        
        // Handle authentication errors specifically
        if (response.status === 401) {
          setErrorMessage('Your session has expired. Please log in again.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }
        
        throw new Error(errorData.detail || errorData.message || `Failed to submit non-profit: ${response.status} - ${response.statusText}`);
      }
      
      const createdNonProfit = await response.json();
      
      setSubmitStatus('success');
      
      // Reset form and redirect after success
      setFormData({
        name: '',
        description: '',
        website: '',
        ein: '',
        contactEmail: '',
        contactName: '',
        contactPhone: '',
        zcashTransparentAddress: '',
        zcashShieldedAddress: '',
        mission: '',
        verificationNotes: '',
        legalVerification: false
      });
      
      // Redirect to home page after a brief success message
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (err) {
      console.error('Failed to submit non-profit:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to submit non-profit application');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="text-6xl mb-4 block">🏢</span>
            <h1 className="font-baseball text-4xl font-bold text-baseball-800 mb-4">
              Add Your Non-Profit
            </h1>
            <p className="text-xl text-baseball-600">
              Help us expand our network of amazing charitable organizations!
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="font-baseball text-2xl font-bold text-baseball-800 mb-6 flex items-center space-x-2">
                <Plus className="text-banana-600" size={24} />
                <span>Submit Your Organization</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-baseball-700 mb-1">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="ein" className="block text-sm font-medium text-baseball-700 mb-1">
                      EIN (Tax ID) *
                    </label>
                    <input
                      type="text"
                      id="ein"
                      value={formData.ein}
                      onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                      placeholder="XX-XXXXXXX"
                      className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-baseball-700 mb-1">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://example.org"
                      className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-baseball-700 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-baseball-700 mb-1">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="John Smith"
                      className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-baseball-700 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
                
                
                <div>
                  <label htmlFor="mission" className="block text-sm font-medium text-baseball-700 mb-1">
                    Mission Statement *
                  </label>
                  <textarea
                    id="mission"
                    rows={3}
                    value={formData.mission}
                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                    placeholder="Briefly describe your organization's mission..."
                    className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-baseball-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us more about your organization, programs, and impact..."
                    className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zcashTransparent" className="block text-sm font-medium text-baseball-700 mb-1">
                      Zcash Transparent Address *
                    </label>
                    <input
                      type="text"
                      id="zcashTransparent"
                      value={formData.zcashTransparentAddress}
                      onChange={(e) => setFormData({ ...formData, zcashTransparentAddress: e.target.value })}
                      placeholder="t1abc123..."
                      className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zcashShielded" className="block text-sm font-medium text-baseball-700 mb-1">
                      Zcash Shielded Address *
                    </label>
                    <input
                      type="text"
                      id="zcashShielded"
                      value={formData.zcashShieldedAddress}
                      onChange={(e) => setFormData({ ...formData, zcashShieldedAddress: e.target.value })}
                      placeholder="zs1abc123..."
                      className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="verificationNotes" className="block text-sm font-medium text-baseball-700 mb-1">
                    Verification Notes
                  </label>
                  <textarea
                    id="verificationNotes"
                    rows={3}
                    value={formData.verificationNotes}
                    onChange={(e) => setFormData({ ...formData, verificationNotes: e.target.value })}
                    placeholder="Any additional notes or documentation links for verification..."
                    className="w-full px-3 py-2 border border-banana-300 rounded-md focus:outline-none focus:ring-2 focus:ring-banana-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="legalVerification"
                      checked={formData.legalVerification}
                      onChange={(e) => setFormData({ ...formData, legalVerification: e.target.checked })}
                      className="mt-1 h-4 w-4 text-banana-600 focus:ring-banana-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="legalVerification" className="text-sm text-baseball-700">
                      <span className="font-medium">Legal Verification *</span>
                      <br />
                      I legally certify that this is a legitimate non-profit or charity organization with valid 501(c)(3) status (or equivalent). I understand that providing false information may result in legal consequences and immediate removal from the platform.
                    </label>
                  </div>
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    ✅ Thank you! Your non-profit application has been submitted successfully. You'll be redirected to the home page shortly.
                  </div>
                )}
                
                {submitStatus === 'error' && errorMessage && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    ❌ {errorMessage}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full bg-banana-500 hover:bg-banana-600 disabled:bg-banana-300 disabled:cursor-not-allowed text-baseball-800 font-bold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-baseball-800"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      <span>{formData.legalVerification ? 'Submit as Verified Organization' : 'Submit for Review'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-baseball text-xl font-bold text-baseball-800 mb-4 flex items-center space-x-2">
                <Heart className="text-banana-600" size={20} />
                <span>Why Join Us?</span>
              </h3>
              <ul className="space-y-3 text-sm text-baseball-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <span>Receive donations from our betting community</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <span>Increase awareness for your cause</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <span>Connect with engaged supporters</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <span>100% transparent blockchain donations</span>
                </li>
              </ul>
            </div>

            <div className="bg-banana-100 rounded-lg p-6">
              <h3 className="font-baseball text-xl font-bold text-baseball-800 mb-4 flex items-center space-x-2">
                <Building className="text-banana-600" size={20} />
                <span>Requirements</span>
              </h3>
              <ul className="space-y-2 text-sm text-baseball-600">
                <li>• Valid 501(c)(3) status</li>
                <li>• Active website with current information</li>
                <li>• Clear mission and program descriptions</li>
                <li>• Responsive communication contact</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-baseball text-xl font-bold text-baseball-800 mb-4">
                📝 Review Process
              </h3>
              <p className="text-sm text-baseball-600 mb-3">
                We review all applications to ensure they meet our criteria for legitimate 
                charitable organizations.
              </p>
              <p className="text-sm text-baseball-600">
                <strong>Timeline:</strong> Applications are typically reviewed within 5-7 business days.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
