import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminSetupProps {
  onNavigate: (page: string) => void;
}

export function AdminSetup({ onNavigate }: AdminSetupProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSetupAdmin = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/auth/create-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            setupKey: 'nanomehr-admin-setup-2026',
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'خطا در ایجاد کاربر ادمین');
        return;
      }

      setResult(data);
    } catch (err) {
      console.error('Admin setup error:', err);
      setError('خطای سرور. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">راه‌اندازی ادمین</h1>
          <p className="text-gray-600">ایجاد کاربر ادمین برای سایت نانومهر</p>
        </div>

        {!result && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ این عملیات فقط یک بار قابل انجام است. پس از ایجاد کاربر ادمین، این صفحه غیرفعال می‌شود.
              </p>
            </div>

            <button
              onClick={handleSetupAdmin}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'در حال ایجاد...' : 'ایجاد کاربر ادمین'}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium mb-2">
                ✅ {result.message}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <h3 className="font-bold text-blue-900 text-lg">اطلاعات ورود:</h3>
              
              <div>
                <label className="text-xs text-blue-600 font-medium">ایمیل:</label>
                <p className="text-blue-900 font-mono bg-white px-3 py-2 rounded mt-1">
                  {result.credentials.email}
                </p>
              </div>

              <div>
                <label className="text-xs text-blue-600 font-medium">رمز عبور:</label>
                <p className="text-blue-900 font-mono bg-white px-3 py-2 rounded mt-1">
                  {result.credentials.password}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3 mt-4">
                <p className="text-xs text-amber-800">
                  📝 <strong>مهم:</strong> لطفاً این اطلاعات را در جای امنی ذخیره کنید. پس از بستن این صفحه، دیگر نمی‌توانید به این اطلاعات دسترسی داشته باشید.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('login')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              رفتن به صفحه ورود
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-gray-600 hover:text-gray-800 text-sm underline"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
}