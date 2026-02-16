import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  description?: string;
  image?: string;
  coverImage?: string;
  category?: string;
  author?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogPageCMSProps {
  onNavigate: (page: string, id?: string) => void;
  Header: any;
  Footer: any;
}

export function BlogPageCMS({ onNavigate, Header, Footer }: BlogPageCMSProps) {
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-008a3150/cms/blog`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Filter only published posts
        const publishedPosts = (data.posts || []).filter((post: any) => 
          post.status === 'published' || !post.status
        );
        setArticles(publishedPosts);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const categories = ['همه', 'مواد پایه', 'کشاورزی', 'رنگ و پوشش', 'پلیمرها'];

  const filteredArticles = selectedCategory === 'همه' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Dark Background */}
      <div className="bg-gradient-to-br from-[#0a1221] to-[#1a2737] relative">
        <Header currentPage="blog" onNavigate={onNavigate} />
        
        {/* Blog Hero */}
        <section className="pt-40 pb-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-[56px] font-medium leading-[1.1] tracking-[-1.12px] text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              مقالات و اخبار
            </motion.h1>
            <motion.p 
              className="text-[#a0b3c4] text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              آخرین اخبار، مقالات تخصصی و به‌روزرسانی‌های صنعت شیمی
            </motion.p>
          </div>
        </section>
      </div>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#56CBD7] text-white shadow-lg'
                    : 'bg-white text-[#1a2737] border border-gray-200 hover:border-[#56CBD7]'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#56CBD7]"></div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">هیچ مقاله‌ای یافت نشد</p>
              <p className="text-gray-400 text-sm">به زودی مقالات جدید منتشر خواهد شد</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article 
                  key={article.id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#56CBD7] transition-all duration-300 hover:shadow-xl cursor-pointer"
                  onClick={() => onNavigate('article', article.id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="h-56 overflow-hidden relative">
                    <ImageWithFallback 
                      src={article.image || article.coverImage || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {article.category && (
                      <motion.div 
                        className="absolute top-4 right-4 bg-[#56CBD7] text-white text-xs px-3 py-1 rounded-full"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                      >
                        {article.category}
                      </motion.div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-[#1a2737]/60 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {article.date || (article.createdAt ? new Date(article.createdAt).toLocaleDateString('fa-IR') : 'تاریخ نامشخص')}
                        </span>
                      </div>
                      {article.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-medium text-[#1a2737] mb-3 group-hover:text-[#56CBD7] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[#1a2737]/70 text-sm line-clamp-3 mb-4">
                      {article.excerpt || article.description || article.content?.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center text-[#56CBD7] text-sm font-medium group-hover:gap-3 transition-all">
                      <span>ادامه مطلب</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
