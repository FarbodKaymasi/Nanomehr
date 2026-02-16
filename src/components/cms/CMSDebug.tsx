import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function CMSDebug() {
  const [logs, setLogs] = useState<string[]>([]);
  const [token, setToken] = useState('');

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    console.log(message);
  };

  const testAuth = async () => {
    setLogs([]);
    const testToken = token || localStorage.getItem('user_token') || localStorage.getItem('cms_token');
    
    addLog('=== شروع تست احراز هویت ===');
    addLog(`Project ID: ${projectId}`);
    addLog(`Token: ${testToken ? testToken.substring(0, 20) + '...' : 'NO TOKEN'}`);

    try {
      addLog('درخواست به /auth/me...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/auth/me`,
        {
          headers: {
            'Authorization': `Bearer ${testToken}`
          }
        }
      );

      addLog(`Status: ${response.status}`);
      const data = await response.json();
      addLog(`Response: ${JSON.stringify(data, null, 2)}`);

      if (response.ok) {
        addLog('✅ احراز هویت موفق');
      } else {
        addLog('❌ احراز هویت ناموفق');
      }
    } catch (error: any) {
      addLog(`❌ خطا: ${error.message}`);
    }
  };

  const testInitialize = async () => {
    setLogs([]);
    const testToken = token || localStorage.getItem('user_token') || localStorage.getItem('cms_token');
    
    addLog('=== شروع تست Initialize ===');
    addLog(`Token: ${testToken ? 'موجود' : 'ناموجود'}`);

    try {
      addLog('درخواست به /cms/initialize...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/initialize`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${testToken}`
          }
        }
      );

      addLog(`Status: ${response.status}`);
      const data = await response.json();
      addLog(`Response: ${JSON.stringify(data, null, 2)}`);

      if (response.ok) {
        addLog('✅ Initialize موفق');
      } else {
        addLog('❌ Initialize ناموفق');
      }
    } catch (error: any) {
      addLog(`❌ خطا: ${error.message}`);
    }
  };

  const testGetContent = async () => {
    setLogs([]);
    addLog('=== شروع تست Get Content ===');

    try {
      addLog('درخواست به /cms/content...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/content`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      addLog(`Status: ${response.status}`);
      const data = await response.json();
      addLog(`Response keys: ${Object.keys(data).join(', ')}`);
      addLog(`Full Response: ${JSON.stringify(data, null, 2)}`);

      if (response.ok) {
        addLog('✅ دریافت محتوا موفق');
      } else {
        addLog('❌ دریافت محتوا ناموفق');
      }
    } catch (error: any) {
      addLog(`❌ خطا: ${error.message}`);
    }
  };

  const testLogin = async () => {
    setLogs([]);
    addLog('=== شروع تست Login ===');

    try {
      addLog('درخواست login با admin credentials...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/auth/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            email: 'admin@nanomehr.com',
            password: 'Admin@Nanomehr2026'
          })
        }
      );

      addLog(`Status: ${response.status}`);
      const data = await response.json();
      
      if (response.ok) {
        addLog('✅ Login موفق');
        addLog(`Token: ${data.access_token?.substring(0, 30)}...`);
        setToken(data.access_token);
        localStorage.setItem('test_token', data.access_token);
        addLog('Token در state و localStorage ذخیره شد');
      } else {
        addLog('❌ Login ناموفق');
        addLog(`Error: ${data.error}`);
      }
    } catch (error: any) {
      addLog(`❌ خطا: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🔧 CMS Debug Tool</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={testLogin}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              1️⃣ Test Login
            </button>
            <button
              onClick={testAuth}
              className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              2️⃣ Test Auth
            </button>
            <button
              onClick={testGetContent}
              className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
            >
              3️⃣ Test Get Content
            </button>
            <button
              onClick={testInitialize}
              className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              4️⃣ Test Initialize
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Token دستی (اختیاری):
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Token را اینجا وارد کنید..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800">توکن‌های ذخیره شده:</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">user_token: </span>
                <span className="font-mono text-sm">
                  {localStorage.getItem('user_token')?.substring(0, 40) || 'ندارد'}...
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">cms_token: </span>
                <span className="font-mono text-sm">
                  {localStorage.getItem('cms_token')?.substring(0, 40) || 'ندارد'}...
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">📋 Logs</h2>
            <button
              onClick={() => setLogs([])}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
            >
              پاک کردن
            </button>
          </div>
          <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">منتظر شروع تست...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
