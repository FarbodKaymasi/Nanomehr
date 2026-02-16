import { useState, useEffect } from 'react';
import { CMSLogin } from './cms/CMSLogin';
import { CMSDashboard } from './cms/CMSDashboardNew';
import { getSupabaseClient, getCurrentSession, signOut } from '../utils/supabase/client';

export function CMSPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    checkAndRefreshSession();
  }, []);

  const checkAndRefreshSession = async () => {
    try {
      console.log('Checking session...');
      
      // Get current session using singleton client
      const session = await getCurrentSession();

      if (session?.access_token) {
        // Session is valid
        console.log('Valid session found');
        console.log('Access token:', session.access_token.substring(0, 20) + '...');
        console.log('User:', session.user.email);
        
        setToken(session.access_token);
        setUser(session.user);
        setIsAuthenticated(true);

        // Save to localStorage
        localStorage.setItem('cms_token', session.access_token);
        localStorage.setItem('cms_user', JSON.stringify(session.user));
        localStorage.setItem('user_token', session.access_token);
        localStorage.setItem('user_data', JSON.stringify(session.user));
      } else {
        console.log('No valid session found');
        // Clear localStorage
        localStorage.removeItem('cms_token');
        localStorage.removeItem('cms_user');
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setSessionChecked(true);
    }
  };

  const handleLogin = (accessToken: string, userData: any) => {
    console.log('Login successful');
    console.log('Token:', accessToken.substring(0, 20) + '...');
    
    setToken(accessToken);
    setUser(userData);
    setIsAuthenticated(true);

    // Save to both storages for compatibility
    localStorage.setItem('cms_token', accessToken);
    localStorage.setItem('cms_user', JSON.stringify(userData));
    localStorage.setItem('user_token', accessToken);
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      
      // Sign out using singleton client
      await signOut();
      
      console.log('Logout successful');
    } catch (error) {
      console.error('Error signing out:', error);
    }

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    // Clear all localStorage
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
  };

  // Show loading while checking session
  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#56CBD7] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-medium">در حال بررسی نشست...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <CMSLogin onLogin={handleLogin} />;
  }

  return <CMSDashboard token={token!} user={user} onLogout={handleLogout} />;
}