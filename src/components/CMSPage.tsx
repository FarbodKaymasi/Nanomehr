import { useState, useEffect } from 'react';
import { CMSLogin } from './cms/CMSLogin';
import { CMSDashboard } from './cms/CMSDashboard';

export function CMSPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('cms_token');
    const savedUser = localStorage.getItem('cms_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (accessToken: string, userData: any) => {
    setToken(accessToken);
    setUser(userData);
    setIsAuthenticated(true);

    // Save to localStorage
    localStorage.setItem('cms_token', accessToken);
    localStorage.setItem('cms_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    // Clear localStorage
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
  };

  if (!isAuthenticated) {
    return <CMSLogin onLogin={handleLogin} />;
  }

  return <CMSDashboard token={token!} user={user} onLogout={handleLogout} />;
}
