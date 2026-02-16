import { motion } from 'motion/react';
import { Mail, GraduationCap, Briefcase, Award, BookOpen, CheckCircle, ArrowRight, Phone, MapPin } from 'lucide-react';
import { AUTHORS, Author } from '../data/authors';
import { useState } from 'react';

interface PersonProfileProps {
  personId: string;
  onNavigate: (page: string) => void;
}

export function PersonProfile({ personId, onNavigate }: PersonProfileProps) {
  const person = AUTHORS.find(a => a.id === personId);
  const [imageError, setImageError] = useState(false);

  if (!person) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1221] to-[#1a2737] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl text-white mb-4">شخص مورد نظر یافت نشد</h2>
          <button
            onClick={() => onNavigate('home')}
            className="bg-[#56CBD7] hover:bg-[#45b9c5] text-white px-6 py-3 rounded-lg transition-colors"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1221] to-[#1a2737]">
      {/* Header with back button */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <motion.button
          onClick={() => onNavigate('about')}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 5 }}
        >
          <ArrowRight size={20} />
          <span>بازگشت به تیم مدیریت</span>
        </motion.button>

        {/* Hero Section with Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 sticky top-24">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#56CBD7] to-[#45b9c5] p-1">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover rounded-xl"
                    onError={() => setImageError(true)}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#56CBD7]/20 rounded-full blur-2xl"></div>
              </div>

              {/* Name & Title */}
              <h1 className="text-2xl font-bold text-white mb-2">{person.name}</h1>
              <p className="text-[#56CBD7] text-lg mb-4">{person.title}</p>
              <p className="text-white/70 text-sm mb-6">{person.experience}</p>

              {/* Contact Info */}
              {person.contactEmail && (
                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  <a
                    href={`mailto:${person.contactEmail}`}
                    className="flex items-center gap-3 text-white/80 hover:text-[#56CBD7] transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#56CBD7]/20 transition-colors">
                      <Mail size={18} />
                    </div>
                    <span className="text-sm" dir="ltr">{person.contactEmail}</span>
                  </a>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {person.publications && person.publications.length > 0 && (
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#56CBD7] mb-1">
                      {person.publications.length}
                    </div>
                    <div className="text-white/70 text-xs">مقاله منتشر شده</div>
                  </div>
                )}
                {person.skills && person.skills.length > 0 && (
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#56CBD7] mb-1">
                      {person.skills.length}
                    </div>
                    <div className="text-white/70 text-xs">مهارت تخصصی</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            {person.bio && (
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#56CBD7]/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="text-[#56CBD7]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">درباره</h2>
                </div>
                <p className="text-white/80 leading-relaxed text-lg">{person.bio}</p>
              </motion.div>
            )}

            {/* Education Section */}
            {person.education && person.education.length > 0 && (
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#56CBD7]/20 rounded-xl flex items-center justify-center">
                    <GraduationCap className="text-[#56CBD7]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">تحصیلات</h2>
                </div>
                <div className="space-y-6">
                  {person.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="relative pr-8 pb-6 border-r-2 border-[#56CBD7]/30 last:border-r-0 last:pb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="absolute right-[-9px] top-0 w-4 h-4 bg-[#56CBD7] rounded-full border-4 border-[#0a1221]"></div>
                      <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                        <h3 className="text-white font-bold text-lg mb-2">{edu.degree}</h3>
                        <p className="text-[#56CBD7] mb-1">{edu.university}</p>
                        <p className="text-white/60 text-sm">{edu.year}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Work History Section */}
            {person.workHistory && person.workHistory.length > 0 && (
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#56CBD7]/20 rounded-xl flex items-center justify-center">
                    <Briefcase className="text-[#56CBD7]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">سوابق کاری</h2>
                </div>
                <div className="space-y-6">
                  {person.workHistory.map((work, index) => (
                    <motion.div
                      key={index}
                      className="relative pr-8 pb-6 border-r-2 border-[#56CBD7]/30 last:border-r-0 last:pb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="absolute right-[-9px] top-0 w-4 h-4 bg-[#56CBD7] rounded-full border-4 border-[#0a1221]"></div>
                      <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                        <h3 className="text-white font-bold text-lg mb-2">{work.position}</h3>
                        <p className="text-[#56CBD7] mb-1">{work.company}</p>
                        <p className="text-white/60 text-sm mb-3">{work.duration}</p>
                        <p className="text-white/70 text-sm leading-relaxed">{work.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skills Section */}
            {person.skills && person.skills.length > 0 && (
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#56CBD7]/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-[#56CBD7]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">مهارت‌ها</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {person.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-[#56CBD7]/20 to-[#45b9c5]/10 border border-[#56CBD7]/30 rounded-lg px-4 py-2 text-white hover:from-[#56CBD7]/30 hover:to-[#45b9c5]/20 transition-all cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Publications Section */}
            {person.publications && person.publications.length > 0 && (
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#56CBD7]/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="text-[#56CBD7]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">مقالات و پژوهش‌ها</h2>
                </div>
                <div className="space-y-4">
                  {person.publications.map((pub, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors border border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <h3 className="text-white font-medium text-lg mb-2">{pub.title}</h3>
                      <p className="text-[#56CBD7] text-sm mb-1">{pub.journal}</p>
                      <p className="text-white/60 text-sm">{pub.year}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certifications Section */}
            {person.certifications && person.certifications.length > 0 && (
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#56CBD7]/20 rounded-xl flex items-center justify-center">
                    <Award className="text-[#56CBD7]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">گواهینامه‌ها و افتخارات</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {person.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    >
                      <CheckCircle className="text-[#56CBD7] flex-shrink-0" size={20} />
                      <span className="text-white">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact CTA */}
            <motion.div
              className="bg-gradient-to-br from-[#56CBD7] to-[#45b9c5] rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                آیا می‌خواهید با {person.name.split(' ')[person.name.split(' ').length - 1]} در ارتباط باشید؟
              </h2>
              <p className="text-white/90 mb-6">
                برای مشاوره تخصصی و همکاری می‌توانید با ما در ارتباط باشید
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white text-[#56CBD7] px-8 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors inline-flex items-center gap-2"
              >
                <span>تماس با ما</span>
                <Mail size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
