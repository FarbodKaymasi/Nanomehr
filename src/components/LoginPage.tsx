import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: any, token: string) => void;
}

export function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call the signin API
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/auth/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'خطا در ورود به سیستم');
      }

      if (!data.access_token) {
        throw new Error('خطا در دریافت توکن دسترسی');
      }

      // Save to localStorage
      localStorage.setItem('user_token', data.access_token);
      localStorage.setItem('user_data', JSON.stringify(data.user));

      // Call success callback
      onLoginSuccess(data.user, data.access_token);
      
      // Show success message
      alert('ورود با موفقیت انجام شد!');
      
      // Navigate to home
      onNavigate('home');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1221] to-[#1a2737] flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="bg-gradient-to-br from-[#56CBD7] to-[#45b9c5] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LogIn size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#0a1221] mb-2">ورود به سیستم</h1>
          <p className="text-gray-600">به نانومهر خوش آمدید</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              ایمیل
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none transition-all"
                placeholder="example@email.com"
                required
                dir="ltr"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              رمز عبور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-[#56CBD7] hover:text-[#45b9c5] transition-colors"
            >
              رمز عبور را فراموش کرده‌اید؟
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#56CBD7] to-[#45b9c5] hover:from-[#45b9c5] hover:to-[#56CBD7] text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال ورود...
              </>
            ) : (
              <>
                <LogIn size={20} />
                ورود به حساب کاربری
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">یا</span>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            حساب کاربری ندارید؟
          </p>
          <button
            onClick={() => onNavigate('register')}
            className="text-[#56CBD7] hover:text-[#45b9c5] font-medium transition-colors"
          >
            ثبت‌نام کنید
          </button>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </motion.div>
    </div>
  );
}
