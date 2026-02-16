import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function useCMSContent() {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      if (!response.ok) {
        throw new Error('Failed to load content');
      }

      const data = await response.json();
      setContent(data);
      setError(null);
    } catch (err: any) {
      console.error('Error loading CMS content:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshContent = () => {
    setLoading(true);
    loadContent();
  };

  return {
    content,
    loading,
    error,
    refreshContent
  };
}

// Helper to get specific section
export function useCMSSection(section: string) {
  const { content, loading, error } = useCMSContent();
  return {
    data: content[section] || null,
    loading,
    error
  };
}
