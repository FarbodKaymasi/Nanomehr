import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ContentContextType {
  content: any;
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType>({
  content: {},
  loading: true,
  error: null,
  refreshContent: async () => {}
});

export const useContent = () => useContext(ContentContext);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/content`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load content');
      }

      const data = await response.json();
      setContent(data);
    } catch (err: any) {
      console.error('Error loading content:', err);
      setError(err.message);
      // Set default content if fetch fails
      setContent(getDefaultContent());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const refreshContent = async () => {
    await loadContent();
  };

  return (
    <ContentContext.Provider value={{ content, loading, error, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
}

// Default fallback content
function getDefaultContent() {
  return {
    hero: {
      title: 'نانومهر',
      subtitle: 'پیشرو در تولید و توزیع مواد شیمیایی صنعتی و راهکارهای نرم افزاری',
      description: 'با بیش از دو دهه تجربه در صنعت شیمی و فناوری'
    },
    stats: [
      { number: '2000+', label: 'مشتری فعال' },
      { number: '500+', label: 'پروژه موفق' },
      { number: '15+', label: 'سال تجربه' },
      { number: '50+', label: 'کارشناس متخصص' }
    ],
    services: [],
    products: {},
    about: {},
    customers: [],
    contact: {
      phone: '021-12345678',
      email: 'info@nanomehr.com',
      address: 'تهران، خیابان ولیعصر'
    },
    footer: {
      description: 'شرکت نانومهر، پیشرو در تولید و توزیع مواد شیمیایی صنعتی',
      copyright: '© 1403 شرکت نانومهر'
    },
    settings: {
      siteName: 'نانومهر',
      language: 'fa'
    }
  };
}
