'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn, getRandomBananaEmoji } from '@/lib/utils';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      'Password must contain at least one uppercase, lowercase, digit, and special character (@$!%*?&)'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [emojis, setEmojis] = useState(['🍌', '🍌']);

  useEffect(() => {
    setMounted(true);
    setEmojis([getRandomBananaEmoji(), getRandomBananaEmoji()]);
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');
    try {
      await login(data);
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    try {
      await register({
        email: data.email,
        username: data.username,
        password: data.password,
      });
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    loginForm.reset();
    registerForm.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-banana-100 via-banana-200 to-grass-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block"
          >
            <div className="text-6xl mb-4 banana-spin">🍌</div>
          </motion.div>
          <h1 className="font-baseball text-3xl font-bold text-banana-800 mb-2">
            Banana Betting
          </h1>
          <p className="text-baseball-600 italic">
            Entertaining. Easy. Sports betting for the rest of us.
          </p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-banana-300"
        >
          {/* Toggle Buttons */}
          <div className="flex bg-banana-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                'flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200',
                isLogin
                  ? 'bg-banana-500 text-white shadow-md'
                  : 'text-banana-700 hover:bg-banana-200'
              )}
            >
              <LogIn className="inline w-4 h-4 mr-2" />
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                'flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200',
                !isLogin
                  ? 'bg-banana-500 text-white shadow-md'
                  : 'text-banana-700 hover:bg-banana-200'
              )}
            >
              <UserPlus className="inline w-4 h-4 mr-2" />
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Username
                </label>
                <input
                  {...loginForm.register('username')}
                  type="text"
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-black"
                  placeholder="Enter your username"
                />
                {loginForm.formState.errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...loginForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 pr-12 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-black"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-baseball-400 hover:text-baseball-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-banana-500 hover:bg-banana-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Login</span>
                    <span>{emojis[0]}</span>
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Email
                </label>
                <input
                  {...registerForm.register('email')}
                  type="email"
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-black"
                  placeholder="Enter your email"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Username
                </label>
                <input
                  {...registerForm.register('username')}
                  type="text"
                  className="w-full px-4 py-3 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-black"
                  placeholder="Choose a username"
                />
                {registerForm.formState.errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...registerForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 pr-12 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-black"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-baseball-400 hover:text-baseball-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-baseball-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...registerForm.register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 pr-12 border border-banana-300 rounded-lg focus:ring-2 focus:ring-banana-500 focus:border-banana-500 transition-colors text-black"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-baseball-400 hover:text-baseball-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-grass-500 hover:bg-grass-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus size={20} />
                    <span>Create Account</span>
                    <span>{emojis[0]}</span>
                  </>
                )}
              </motion.button>
            </form>
          )}

          {/* Fun Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-baseball-500 italic">
              Join the most entertaining betting experience!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
