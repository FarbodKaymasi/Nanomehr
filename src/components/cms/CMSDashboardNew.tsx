import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  FileText,
  Package,
  Users,
  Settings,
  LogOut,
  Save,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Image as ImageIcon,
  Upload,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Globe,
  Home,
  Info,
  ShoppingBag,
  X,
  Check,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface CMSDashboardProps {
  token: string;
  user: any;
  onLogout: () => void;
}

type SectionType = 'dashboard' | 'users' | 'blog' | 'products';

export function CMSDashboard({ token, user, onLogout }: CMSDashboardProps) {
  const [activeSection, setActiveSection] = useState<SectionType>('dashboard');
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentToken, setCurrentToken] = useState(token);

  // Refresh token when authentication fails
  const refreshToken = async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        throw new Error('Unable to refresh session');
      }

      // Update token
      setCurrentToken(session.access_token);
      localStorage.setItem('cms_token', session.access_token);
      localStorage.setItem('user_token', session.access_token);
      
      return session.access_token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      showMessage('error', 'نشست شما منقضی شده است. لطفاً دوباره وارد شوید');
      setTimeout(() => {
        onLogout();
      }, 2000);
      return null;
    }
  };

  useEffect(() => {
    loadContent();
    loadBlogPosts();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/content`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
      showMessage('error', 'خطا در بارگذاری محتوا');
    } finally {
      setLoading(false);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/blog`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();
      setContent((prev: any) => ({ ...prev, blog: data.posts || [] }));
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  const saveContent = async (section: string, sectionContent: any) => {
    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/content/${section}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
          },
          body: JSON.stringify({ content: sectionContent })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshToken();
          if (newToken) {
            return saveContent(section, sectionContent);
          }
        }
        throw new Error(data.error || 'خطا در ذخیره محتوا');
      }

      setContent({ ...content, [section]: sectionContent });
      showMessage('success', 'تغییرات با موفقیت ذخیره شد');
    } catch (error: any) {
      console.error('Error saving content:', error);
      showMessage('error', error.message || 'خطا در ذخیره محتوا');
    } finally {
      setSaving(false);
    }
  };

  const initializeContent = async () => {
    setSaving(true);
    try {
      console.log('Initializing content with token:', token ? 'Token exists' : 'No token');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/initialize`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Initialize response status:', response.status);
      const data = await response.json();
      console.log('Initialize response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'خطا در مقداردهی اولیه');
      }

      showMessage('success', 'محتوای پیش‌فرض با موفقیت ایجاد شد');
      await loadContent();
      await loadBlogPosts();
    } catch (error: any) {
      console.error('Error initializing content:', error);
      showMessage('error', error.message || 'خطا در مقداردهی اولیه');
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const menuItems = [
    { id: 'dashboard' as SectionType, label: 'داشبورد', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
    { id: 'users' as SectionType, label: 'کاربران', icon: Users, color: 'from-cyan-500 to-cyan-600' },
    { id: 'blog' as SectionType, label: 'مقالات', icon: Newspaper, color: 'from-red-500 to-red-600' },
    { id: 'products' as SectionType, label: 'محصولات', icon: ShoppingBag, color: 'from-pink-500 to-pink-600' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#56CBD7] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-medium">در حال بارگذاری نل مدیریت...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex" dir="rtl">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="bg-white border-l border-gray-200 flex flex-col shadow-xl relative z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#56CBD7] to-[#45b9c5] bg-clip-text text-transparent">
                  پنل CMS
                </h1>
                <p className="text-sm text-gray-600 mt-1 truncate">{user?.email}</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium truncate">{item.label}</span>}
                {isActive && !sidebarCollapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="mr-auto w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {!sidebarCollapsed && (
            <button
              onClick={initializeContent}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all disabled:opacity-50 shadow-lg"
            >
              <Plus size={20} />
              مقداردهی اولیه
            </button>
          )}
          <button
            onClick={onLogout}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-center gap-2'} px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all shadow-lg`}
          >
            <LogOut size={20} />
            {!sidebarCollapsed && 'خروج'}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Message Toast */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 p-4 rounded-xl shadow-2xl flex items-center gap-3 ${
                  message.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {message.type === 'success' ? <Check size={24} /> : <AlertCircle size={24} />}
                <p className="flex-1 font-medium">{message.text}</p>
                <button onClick={() => setMessage(null)} className="hover:bg-white/20 p-1 rounded">
                  <X size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'dashboard' && (
              <DashboardSection content={content} />
            )}
            {activeSection === 'blog' && (
              <BlogSection
                posts={content.blog || []}
                token={currentToken}
                onRefresh={loadBlogPosts}
                showMessage={showMessage}
              />
            )}
            {activeSection === 'users' && (
              <UsersSection
                token={currentToken}
                showMessage={showMessage}
              />
            )}
            {activeSection !== 'dashboard' && activeSection !== 'blog' && activeSection !== 'users' && (
              <ContentSection
                section={activeSection}
                content={content[activeSection]}
                onSave={(updatedContent) => saveContent(activeSection, updatedContent)}
                saving={saving}
                menuItems={menuItems}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Section
function DashboardSection({ content }: any) {
  const stats = content.stats || [];
  const services = content.services || [];
  const customers = content.customers || [];
  const blogPosts = content.blog || [];

  const dashboardStats = [
    { label: 'خدمات', value: services.length, icon: Package, color: 'from-blue-500 to-blue-600' },
    { label: 'مشتریان', value: customers.length, icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'مقالات', value: blogPosts.length, icon: Newspaper, color: 'from-purple-500 to-purple-600' },
    { label: 'آمار سایت', value: stats.length, icon: BarChart3, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#56CBD7] to-[#45b9c5] rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">خوش آمدید به پنل مدیریت نانومهر</h1>
        <p className="text-white/90">مدیریت کامل محتوای وب‌سایت شما</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon size={32} className="text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">دسترسی سریع</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionCard icon={Home} label="صفحه اصلی" color="from-purple-500 to-purple-600" />
          <QuickActionCard icon={Package} label="خدمات" color="from-orange-500 to-orange-600" />
          <QuickActionCard icon={Newspaper} label="بلاگ" color="from-red-500 to-red-600" />
          <QuickActionCard icon={Settings} label="تنظیمات" color="from-yellow-500 to-yellow-600" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">فعالیت‌های اخیر</h2>
        <div className="space-y-4">
          {blogPosts.slice(0, 5).map((post: any, index: number) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Newspaper size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{post.title || 'بدون عنوان'}</h3>
                <p className="text-sm text-gray-600">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString('fa-IR') : 'تاریخ نامشخص'}
                </p>
              </div>
            </div>
          ))}
          {blogPosts.length === 0 && (
            <p className="text-center text-gray-500 py-8">هیچ مقاله‌ای یافت نشد</p>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon: Icon, label, color }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`bg-gradient-to-r ${color} rounded-xl shadow-lg p-6 text-white cursor-pointer`}
    >
      <Icon size={32} className="mb-3" />
      <p className="font-medium">{label}</p>
    </motion.div>
  );
}

// Content Section
function ContentSection({ section, content, onSave, saving, menuItems }: any) {
  const [editMode, setEditMode] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const sectionInfo = menuItems.find((item: any) => item.id === section);

  if (!content) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <AlertCircle size={64} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">محتوایی یافت نشد</h3>
        <p className="text-gray-600 mb-6">برای این بخش محتوایی وجود ندارد. از دکمه مقداردهی اولیه استفاده کنید.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {sectionInfo && (
              <div className={`w-14 h-14 bg-gradient-to-r ${sectionInfo.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <sectionInfo.icon size={28} className="text-white" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{sectionInfo?.label}</h2>
              <p className="text-gray-600">ویرایش و مدیریت محتوا</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg ${
              editMode
                ? 'bg-gray-200 text-gray-700'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
            }`}
          >
            {editMode ? <Eye size={20} /> : <Edit3 size={20} />}
            {editMode ? 'حالت مشاهده' : 'حالت ویرایش'}
          </motion.button>
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <ContentEditor
          content={localContent}
          editMode={editMode}
          onChange={setLocalContent}
          section={section}
        />

        {editMode && (
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={() => {
                setLocalContent(content);
                setEditMode(false);
              }}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all"
            >
              انصراف
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSave(localContent)}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#56CBD7] to-[#45b9c5] hover:from-[#45b9c5] hover:to-[#56CBD7] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                <>
                  <Save size={20} />
                  ذخیره تغییرات
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

// Content Editor Component
function ContentEditor({ content, editMode, onChange, section }: any) {
  const handleInputChange = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let current: any = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    onChange(newContent);
  };

  const handleArrayItemChange = (index: number, field: string, value: any) => {
    const newContent = [...content];
    if (field) {
      newContent[index] = { ...newContent[index], [field]: value };
    } else {
      newContent[index] = value;
    }
    onChange(newContent);
  };

  const handleArrayAdd = () => {
    let newItem: any = {};
    
    if (section === 'services') {
      newItem = {
        id: `service-${Date.now()}`,
        title: 'خدمت جدید',
        number: `0${content.length + 1}`,
        description: 'توضیحات خدمت',
        image: ''
      };
    } else if (section === 'stats') {
      newItem = { number: '0', label: 'عنوان جدید' };
    } else if (section === 'customers') {
      newItem = { name: 'مشتری جدید', logo: '', industry: 'صنعت' };
    }

    onChange([...content, newItem]);
  };

  const handleArrayRemove = (index: number) => {
    const newContent = [...content];
    newContent.splice(index, 1);
    onChange(newContent);
  };

  const renderField = (label: string, path: string, value: any, type: 'text' | 'textarea' | 'url' = 'text') => {
    if (!editMode) {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          <div className="p-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200">
            {type === 'url' && value ? (
              <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-2">
                <Globe size={16} />
                {value}
              </a>
            ) : (
              value || '-'
            )}
          </div>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          <textarea
            value={value || ''}
            onChange={(e) => handleInputChange(path, e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none transition-all"
            rows={4}
          />
        </div>
      );
    }

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
          type={type === 'url' ? 'url' : 'text'}
          value={value || ''}
          onChange={(e) => handleInputChange(path, e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none transition-all"
          dir={type === 'url' ? 'ltr' : 'rtl'}
        />
      </div>
    );
  };

  if (Array.isArray(content)) {
    return (
      <div className="space-y-4">
        {content.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-800">آیتم {index + 1}</h3>
              {editMode && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleArrayRemove(index)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </motion.button>
              )}
            </div>

            {typeof item === 'object' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{key}</label>
                    {editMode ? (
                      <input
                        type={key === 'image' || key === 'logo' ? 'url' : 'text'}
                        value={value as string || ''}
                        onChange={(e) => handleArrayItemChange(index, key, e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none transition-all"
                        dir={key === 'image' || key === 'logo' ? 'ltr' : 'rtl'}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">{value as string || '-'}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {editMode ? (
                  <input
                    type="text"
                    value={item || ''}
                    onChange={(e) => handleArrayItemChange(index, '', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] outline-none"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl">{item}</div>
                )}
              </div>
            )}
          </motion.div>
        ))}

        {editMode && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleArrayAdd}
            className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all shadow-lg"
          >
            <Plus size={20} />
            افزودن آیتم جدید
          </motion.button>
        )}
      </div>
    );
  }

  if (typeof content === 'object') {
    return (
      <div className="space-y-6">
        {Object.entries(content).map(([key, value]) => {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return (
              <div key={key} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 pb-3 border-b-2 border-gray-200 text-gray-800">{key}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey}>
                      {renderField(
                        subKey,
                        `${key}.${subKey}`,
                        subValue,
                        subKey.includes('image') || subKey.includes('Image') || subKey.includes('logo') || subKey.includes('url')
                          ? 'url'
                          : subKey.includes('description')
                          ? 'textarea'
                          : 'text'
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (Array.isArray(value)) {
            return (
              <div key={key} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 pb-3 border-b-2 border-gray-200 text-gray-800">{key}</h3>
                <div className="space-y-3">
                  {value.map((item, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200">
                      {typeof item === 'string' ? item : JSON.stringify(item)}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return renderField(
            key,
            key,
            value,
            key.includes('image') || key.includes('Image') || key.includes('logo') || key.includes('url')
              ? 'url'
              : key.includes('description')
              ? 'textarea'
              : 'text'
          );
        })}
      </div>
    );
  }

  return <div className="text-center text-gray-500 py-12">محتوای نامعتبر</div>;
}

// Blog Section
function BlogSection({ posts, token, onRefresh, showMessage }: any) {
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter((post: any) =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSavePost = async (post: any) => {
    try {
      console.log('=== START SAVE POST ===');
      console.log('Post data:', post);
      
      // Get fresh token from Supabase session
      const { getCurrentSession } = await import('../../utils/supabase/client');
      console.log('Getting current session...');
      
      const session = await getCurrentSession();
      console.log('Session:', session ? 'Found' : 'Not found');
      
      if (!session?.access_token) {
        console.error('No access token in session');
        throw new Error('نشست شما منقضی شده است. لطفاً دوباره وارد شوید');
      }

      const tokenToUse = session.access_token;
      console.log('Token length:', tokenToUse.length);
      console.log('Token preview:', tokenToUse.substring(0, 20) + '...');
      console.log('User:', session.user?.email);

      const url = editingPost
        ? `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/blog/${editingPost.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/blog`;

      console.log('Request URL:', url);
      console.log('Request method:', editingPost ? 'PUT' : 'POST');
      
      const requestBody = JSON.stringify(post);
      console.log('Request body length:', requestBody.length);
      console.log('Request body:', requestBody);

      console.log('Sending request...');
      const response = await fetch(url, {
        method: editingPost ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenToUse}`
        },
        body: requestBody
      });

      console.log('Response received!');
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Response data:', data);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error(`خطا در دریافت پاسخ سرور: ${responseText}`);
      }

      if (!response.ok) {
        console.error('Request failed with status:', response.status);
        console.error('Error data:', data);
        throw new Error(data.error || `خطا در ذخیره مقاله (کد ${response.status})`);
      }

      console.log('=== SUCCESS ===');
      showMessage('success', editingPost ? 'مقاله با موفقیت ویرایش شد' : 'مقاله با موفقیت ایجاد شد');
      setShowModal(false);
      setEditingPost(null);
      onRefresh();
    } catch (error: any) {
      console.error('=== ERROR IN SAVE POST ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Full error:', error);
      showMessage('error', error.message || 'خطا در ذخیره مقاله');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('آیا از حذف این مقاله اطمینان دارید؟')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/blog/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('خطا در حذف مقاله');
      }

      showMessage('success', 'مقاله با موفقیت حذف شد');
      onRefresh();
    } catch (error: any) {
      showMessage('error', error.message || 'خطا در حذف مقاله');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">مدیریت مقالات</h2>
            <p className="text-gray-600">افزودن، ویرایش و حذف مقالات</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingPost(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium shadow-lg"
          >
            <Plus size={20} />
            افزودن مقاله جدید
          </motion.button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در مقالات..."
            className="w-full pr-12 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none transition-all"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post: any, index: number) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {post.image && (
              <div className="h-48 bg-gray-200">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{post.title || 'بدون عنوان'}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.content || 'بدون محتوا'}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('fa-IR') : 'تاریخ نامشخص'}</span>
                <span>{post.category || 'دسته‌بندی نشده'}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setShowModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                  ویرایش
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  حذف
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Newspaper size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">هیچ مقاله‌ای یافت نشد</h3>
          <p className="text-gray-600">برای شروع، مقاله جدیدی ایجاد کنید</p>
        </div>
      )}

      {/* Blog Modal */}
      {showModal && (
        <BlogModal
          post={editingPost}
          onClose={() => {
            setShowModal(false);
            setEditingPost(null);
          }}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
}

function BlogModal({ post, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    image: post?.image || '',
    category: post?.category || '',
    tags: post?.tags || '',
    author: post?.author || ''
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(post?.image || '');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('لطفاً فقط فایل تصویری انتخاب کنید');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم فایل نباید بیشتر از 5 مگابایت باشد');
      return;
    }

    setUploading(true);
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload to server
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('خطا در آپلود تصویر');
      }

      const data = await response.json();
      const imageUrl = data.url;

      setFormData(prev => ({ ...prev, image: imageUrl }));
      setImagePreview(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between flex-shrink-0 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {post ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">خلاصه</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">محتوا *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none"
              rows={8}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تصویر</label>
            
            {/* Upload Button */}
            <div className="mb-3">
              <label className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-[#56CBD7] rounded-xl cursor-pointer hover:bg-[#56CBD7]/5 transition-colors">
                <Upload size={20} className="text-[#56CBD7]" />
                <span className="text-[#56CBD7] font-medium">
                  {uploading ? 'در حال آپلود...' : 'انتخاب و آپلود تصویر'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3 relative">
                <img 
                  src={imagePreview} 
                  alt="پیش‌نمایش" 
                  className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, image: '' }));
                    setImagePreview('');
                  }}
                  className="absolute top-2 left-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Or URL Input */}
            <div className="text-center text-gray-500 text-sm mb-2">یا</div>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                setImagePreview(e.target.value);
              }}
              placeholder="آدرس URL تصویر را وارد کنید"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none"
              dir="ltr"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نویسنده</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تگ‌ها (با کاما جدا کنید)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none"
              placeholder="تکنولوژی, صنعت, نانو"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#56CBD7] to-[#45b9c5] hover:from-[#45b9c5] hover:to-[#56CBD7] text-white rounded-xl font-medium transition-all shadow-lg"
            >
              {post ? 'ذخیره تغییرات' : 'ایجاد مقاله'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Users Section
function UsersSection({ token, showMessage }: any) {
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user: any) =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/users`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
      showMessage('error', 'خطا در بارگذاری کاربران');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('آیا از حذف این کاربر اطمینان دارید؟')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('خطا در حذف کاربر');
      }

      showMessage('success', 'کاربر با موفقیت حذف شد');
      loadUsers();
    } catch (error: any) {
      showMessage('error', error.message || 'خطا در حذف کاربر');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">مدیریت کاربران</h2>
            <p className="text-gray-600">افزودن، ویرایش و حذف کاربران</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در کاربران..."
            className="w-full pr-12 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#56CBD7] focus:border-[#56CBD7] outline-none transition-all"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user: any, index: number) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="h-48 bg-gray-200">
              <img src={user.avatar || 'https://via.placeholder.com/150'} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{user.name || 'بدون نام'}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{user.email || 'بدون ایمیل'}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{user.role || 'کاربر عادی'}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  حذف
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Users size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">هیچ کاربری یافت نشد</h3>
          <p className="text-gray-600">برای شروع، کاربر جدیدی ایجاد کنید</p>
        </div>
      )}
    </div>
  );
}