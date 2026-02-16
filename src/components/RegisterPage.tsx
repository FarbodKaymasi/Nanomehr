import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onRegisterSuccess: (user: any, token: string) => void;
}

export function RegisterPage({ onNavigate, onRegisterSuccess }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('لطفاً نام و نام خانوادگی خود را وارد کنید');
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('لطفاً یک ایمیل معتبر وارد کنید');
      return false;
    }

    if (formData.password.length < 6) {
      setError('رمز عبور باید حداقل 6 کاراکتر باشد');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن یکسان نیستند');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Call the signup API
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            phone: formData.phone
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'خطا در ثبت‌نام');
      }

      // Show success message
      setSuccess(true);

      // Wait a moment then auto-login
      setTimeout(async () => {
        try {
          // Now sign in
          const loginResponse = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/auth/signin`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`
              },
              body: JSON.stringify({
                email: formData.email,
                password: formData.password
              })
            }
          );

          const loginData = await loginResponse.json();

          if (loginData.access_token) {
            // Save to localStorage
            localStorage.setItem('user_token', loginData.access_token);
            localStorage.setItem('user_data', JSON.stringify(loginData.user));

            // Call success callback
            onRegisterSuccess(loginData.user, loginData.access_token);

            // Navigate to home
            alert('ثبت‌نام با موفقیت انجام شد! به نانومهر خوش آمدید.');
            onNavigate('home');
          } else {
            // Registration successful but auto-login failed, redirect to login
            alert('ثبت‌نام با موفقیت انجام شد! لطفاً وارد شوید.');
            onNavigate('login');
          }
        } catch (err) {
          console.error('Auto-login error:', err);
          alert('ثبت‌نام با موفقیت انجام شد! لطفاً وارد شوید.');
          onNavigate('login');
        }
      }, 1500);

    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
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
            <UserPlus size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#0a1221] mb-2">ثبت‌نام</h1>
          <p className="text-gray-600">عضویت در نانومهر</p>
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

        {/* Success Message */}
        {success && (
          <motion.div
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
            <span className="text-sm">ثبت‌نام با موفقیت انجام شد! در حال انتقال...</span>
          </motion.div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              نام و نام خانوادگی
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none transition-all"
                placeholder="علی احمدی"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              ایمیل
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none transition-all"
                placeholder="example@email.com"
                required
                dir="ltr"
              />
            </div>
          </div>

          {/* Phone Field (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              شماره تماس (اختیاری)
            </label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none transition-all"
                placeholder="09123456789"
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
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none transition-all"
                placeholder="حداقل 6 کاراکتر"
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

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              تکرار رمز عبور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none transition-all"
                placeholder="تکرار رمز عبور"
                required
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="text-sm text-gray-600 text-right">
            با ثبت‌نام، شما <button type="button" className="text-[#56CBD7] hover:underline">شرایط و قوانین</button> و <button type="button" className="text-[#56CBD7] hover:underline">حریم خصوصی</button> را می‌پذیرید.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-gradient-to-r from-[#56CBD7] to-[#45b9c5] hover:from-[#45b9c5] hover:to-[#56CBD7] text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال ثبت‌نام...
              </>
            ) : success ? (
              <>
                <CheckCircle size={20} />
                ثبت‌نام موفق
              </>
            ) : (
              <>
                <UserPlus size={20} />
                ثبت‌نام
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

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            قبلاً ثبت‌نام کرده‌اید؟
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="text-[#56CBD7] hover:text-[#45b9c5] font-medium transition-colors"
          >
            وارد شوید
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
