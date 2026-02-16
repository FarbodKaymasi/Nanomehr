import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Calendar, User, ArrowRight, ChevronLeft } from 'lucide-react';

export interface Article {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  author: string;
  authorTitle: string;
  authorImage: string;
  content: string;
}

interface ArticleDetailProps {
  article: Article;
  allArticles: Article[];
  onNavigate: (page: string, articleId?: number) => void;
}

export function ArticleDetail({ article, allArticles, onNavigate }: ArticleDetailProps) {
  // Get related articles from the same category
  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a1221] to-[#1a2737] pt-32 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Back Button */}
          <motion.button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChevronLeft size={20} />
            <span className="text-base">بازگشت به مقالات</span>
          </motion.button>

          {/* Category Badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-[#56CBD7] text-white text-sm px-5 py-2 rounded-full font-medium">
              {article.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-5xl lg:text-[56px] font-medium leading-[1.15] tracking-tight text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {article.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            className="flex items-center gap-6 text-[#a0b3c4] text-base flex-row-reverse justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 flex-row-reverse">
              <Calendar size={18} />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#56CBD7]">
                <ImageWithFallback
                  src={article.authorImage}
                  alt={article.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right">
                <div className="font-medium text-white">{article.author}</div>
                <div className="text-xs text-[#a0b3c4]">{article.authorTitle}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative -mt-20 md:-mt-24 mb-16 md:mb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div
            className="relative h-[300px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-[#1a2737] leading-relaxed text-base md:text-lg">
              {article.content.split('\n').map((paragraph, index) => {
                // Handle headings
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-medium text-black mt-10 mb-5 text-right">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl md:text-2xl font-medium text-black mt-8 mb-4 text-right">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                // Handle numbered lists
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <li key={index} className="text-[#1a2737] mb-3 mr-6 leading-relaxed text-justify">
                      {paragraph.replace(/^\d+\.\s*/, '')}
                    </li>
                  );
                }
                // Regular paragraphs
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-[#1a2737] mb-5 leading-relaxed text-justify">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-4xl font-medium text-black mb-10">
              مقالات مرتبط
            </h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {relatedArticles.map((relatedArticle) => (
                <motion.article
                  key={relatedArticle.id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#56CBD7] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                  onClick={() => onNavigate('article', relatedArticle.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 overflow-hidden relative">
                    <ImageWithFallback
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-[#56CBD7] text-white text-xs px-3 py-1 rounded-full">
                      {relatedArticle.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-black mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-[#1a2737]/70 text-sm mb-4 line-clamp-2">
                      {relatedArticle.description}
                    </p>
                    <div className="text-[#56CBD7] text-sm font-medium flex items-center gap-2">
                      ادامه مطلب
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}