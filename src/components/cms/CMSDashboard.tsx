import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  ChevronLeft
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface CMSDashboardProps {
  token: string;
  user: any;
  onLogout: () => void;
}

export function CMSDashboard({ token, user, onLogout }: CMSDashboardProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadContent();
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

  const saveContent = async (section: string, sectionContent: any) => {
    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/content/${section}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ content: sectionContent })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'خطا در ذخیره محتوا');
      }

      setContent({ ...content, [section]: sectionContent });
      showMessage('success', 'تغییرات با موفقیت ذخیره شد');
      setEditMode(false);
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
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/initialize`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'خطا در مقداردهی اولیه');
      }

      showMessage('success', 'محتوای پیش‌فرض با موفقیت ایجاد شد');
      await loadContent();
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
    { id: 'hero', label: 'صفحه اصلی', icon: LayoutDashboard },
    { id: 'stats', label: 'آمار', icon: FileText },
    { id: 'services', label: 'خدمات', icon: Package },
    { id: 'products', label: 'محصولات', icon: Package },
    { id: 'about', label: 'درباره ما', icon: FileText },
    { id: 'customers', label: 'مشتریان', icon: Users },
    { id: 'contact', label: 'تماس', icon: FileText },
    { id: 'footer', label: 'فوتر', icon: FileText },
    { id: 'settings', label: 'تنظیمات', icon: Settings }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#0a1221]">پنل مدیریت</h1>
          <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#56CBD7] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={initializeContent}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Plus size={20} />
            مقداردهی اولیه
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <LogOut size={20} />
            خروج
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0a1221] mb-2">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h2>
                <p className="text-gray-600">ویرایش و مدیریت محتوا</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    editMode
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {editMode ? <Eye size={20} /> : <Edit3 size={20} />}
                  {editMode ? 'حالت مشاهده' : 'حالت ویرایش'}
                </button>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-4 rounded-lg mb-6 ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Content Editor */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <ContentEditor
              section={activeSection}
              content={content[activeSection]}
              editMode={editMode}
              onSave={(updatedContent) => saveContent(activeSection, updatedContent)}
              saving={saving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentEditor({ section, content, editMode, onSave, saving }: any) {
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  if (!content) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">محتوایی برای این بخش وجود ندارد. لطفاً از دکمه "مقداردهی اولیه" استفاده کنید.</p>
      </div>
    );
  }

  const handleInputChange = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = { ...localContent };
    let current: any = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setLocalContent(newContent);
  };

  const handleArrayItemChange = (index: number, field: string, value: any) => {
    const newContent = [...localContent];
    if (field) {
      newContent[index] = { ...newContent[index], [field]: value };
    } else {
      newContent[index] = value;
    }
    setLocalContent(newContent);
  };

  const handleArrayAdd = () => {
    if (section === 'services') {
      setLocalContent([
        ...localContent,
        {
          id: `service-${Date.now()}`,
          title: 'خدمت جدید',
          number: `0${localContent.length + 1}`,
          description: 'توضیحات خدمت',
          image: ''
        }
      ]);
    } else if (section === 'stats') {
      setLocalContent([
        ...localContent,
        { number: '0', label: 'عنوان جدید' }
      ]);
    } else if (section === 'customers') {
      setLocalContent([
        ...localContent,
        { name: 'مشتری جدید', logo: '', industry: 'صنعت' }
      ]);
    }
  };

  const handleArrayRemove = (index: number) => {
    const newContent = [...localContent];
    newContent.splice(index, 1);
    setLocalContent(newContent);
  };

  const renderField = (label: string, path: string, value: any, type: 'text' | 'textarea' | 'url' = 'text') => {
    if (!editMode) {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
            {type === 'url' && value ? (
              <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none"
          dir={type === 'url' ? 'ltr' : 'rtl'}
        />
      </div>
    );
  };

  const renderContent = () => {
    if (Array.isArray(localContent)) {
      return (
        <div>
          {localContent.map((item, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">آیتم {index + 1}</h3>
                {editMode && (
                  <button
                    onClick={() => handleArrayRemove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              {typeof item === 'object' ? (
                Object.entries(item).map(([key, value]) => (
                  <div key={key} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{key}</label>
                    {editMode ? (
                      <input
                        type={key === 'image' || key === 'logo' ? 'url' : 'text'}
                        value={value as string || ''}
                        onChange={(e) => handleArrayItemChange(index, key, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56CBD7] focus:border-transparent outline-none"
                        dir={key === 'image' || key === 'logo' ? 'ltr' : 'rtl'}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-lg">{value as string}</div>
                    )}
                  </div>
                ))
              ) : (
                <div>
                  {editMode ? (
                    <input
                      type="text"
                      value={item || ''}
                      onChange={(e) => handleArrayItemChange(index, '', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-lg">{item}</div>
                  )}
                </div>
              )}
            </div>
          ))}

          {editMode && (
            <button
              onClick={handleArrayAdd}
              className="flex items-center gap-2 px-4 py-2 bg-[#56CBD7] hover:bg-[#45b9c5] text-white rounded-lg transition-colors"
            >
              <Plus size={20} />
              افزودن آیتم جدید
            </button>
          )}
        </div>
      );
    }

    if (typeof localContent === 'object') {
      return (
        <div>
          {Object.entries(localContent).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              return (
                <div key={key} className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">{key}</h3>
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey}>
                      {renderField(subKey, `${key}.${subKey}`, subValue, subKey.includes('image') || subKey.includes('Image') || subKey.includes('logo') || subKey.includes('url') ? 'url' : subKey.includes('description') ? 'textarea' : 'text')}
                    </div>
                  ))}
                </div>
              );
            }

            return renderField(key, key, value, key.includes('image') || key.includes('Image') || key.includes('logo') || key.includes('url') ? 'url' : key.includes('description') ? 'textarea' : 'text');
          })}
        </div>
      );
    }

    return <div>محتوای نامعتبر</div>;
  };

  return (
    <div>
      {renderContent()}

      {editMode && (
        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => onSave(localContent)}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#56CBD7] hover:bg-[#45b9c5] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          </button>
        </div>
      )}
    </div>
  );
}
