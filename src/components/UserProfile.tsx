import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Calendar, LogOut, Edit, Save, X, Shield, Key } from 'lucide-react';

interface UserProfileProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function UserProfile({ onNavigate, onLogout }: UserProfileProps) {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    try {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setEditedName(parsedUser.user_metadata?.name || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    
    // Call logout callback
    onLogout();
    
    // Navigate to home
    onNavigate('home');
  };

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          name: editedName
        }
      };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(user?.user_metadata?.name || '');
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#56CBD7] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">لطفاً ابتدا وارد شوید</p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-[#56CBD7] hover:bg-[#45b9c5] text-white px-6 py-3 rounded-lg transition-colors"
          >
            ورود به سیستم
          </button>
        </div>
      </div>
    );
  }

  const createdAt = new Date(user.created_at).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="mb-6 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
        >
          ← بازگشت به صفحه اصلی
        </button>

        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#56CBD7] to-[#45b9c5] p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center">
                  <User size={48} />
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-2xl font-bold bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg px-4 py-2 outline-none"
                      placeholder="نام و نام خانوادگی"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold mb-2">
                      {user.user_metadata?.name || 'کاربر'}
                    </h1>
                  )}
                  <p className="text-white/80 flex items-center gap-2">
                    <Shield size={16} />
                    کاربر نانومهر
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-white text-[#56CBD7] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      <Save size={20} />
                      ذخیره
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                    >
                      <X size={20} />
                      لغو
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                  >
                    <Edit size={20} />
                    ویرایش
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#56CBD7]/10 p-3 rounded-lg">
                    <Mail className="text-[#56CBD7]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ایمیل</p>
                    <p className="font-medium text-gray-800" dir="ltr">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#56CBD7]/10 p-3 rounded-lg">
                    <Phone className="text-[#56CBD7]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">شماره تماس</p>
                    <p className="font-medium text-gray-800" dir="ltr">
                      {user.user_metadata?.phone || 'ثبت نشده'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Created Date */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#56CBD7]/10 p-3 rounded-lg">
                    <Calendar className="text-[#56CBD7]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تاریخ عضویت</p>
                    <p className="font-medium text-gray-800">{createdAt}</p>
                  </div>
                </div>
              </div>

              {/* User ID */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#56CBD7]/10 p-3 rounded-lg">
                    <Key className="text-[#56CBD7]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">شناسه کاربری</p>
                    <p className="font-medium text-gray-800 text-xs truncate" dir="ltr">
                      {user.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="mt-8 bg-gradient-to-r from-[#56CBD7]/10 to-[#45b9c5]/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">آمار حساب کاربری</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-[#56CBD7]">0</p>
                  <p className="text-sm text-gray-600 mt-1">سفارشات</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#56CBD7]">0</p>
                  <p className="text-sm text-gray-600 mt-1">درخواست‌ها</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#56CBD7]">0</p>
                  <p className="text-sm text-gray-600 mt-1">مشاوره‌ها</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors">
                تغییر رمز عبور
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors">
                تنظیمات حساب
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                خروج از حساب
              </button>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold text-blue-900 mb-2">💡 نکته:</h4>
          <p className="text-blue-800 text-sm">
            برای استفاده از امکانات ویژه مانند ثبت سفارش، درخواست مشاوره و دریافت پیشنهادات ویژه، لطفاً پروفایل خود را کامل کنید.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
