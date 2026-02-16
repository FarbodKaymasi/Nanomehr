import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Trophy, Microscope, Globe, Factory, Instagram, Send, Mail, MapPin, Phone, Calendar, User, ArrowRight } from 'lucide-react';
import svgPaths from "./imports/svg-u4ngvccw05";
import { ArticleDetail } from './components/ArticleDetail';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { ProductPage } from './components/ProductPage';
import { CMSPage } from './components/CMSPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { UserProfile } from './components/UserProfile';
import { ALL_ARTICLES } from './data/articles';

// Chemical industry images from Unsplash
const imgHeroBackground = "https://images.unsplash.com/photo-1768128834301-7811be9d3a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMGZhY3RvcnklMjBpbmR1c3RyaWFsJTIwcGxhbnR8ZW58MXx8fHwxNzY5NjI5MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgPromoBackground = "https://images.unsplash.com/photo-1761095596584-34731de3e568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBsYWJvcmF0b3J5JTIwZXF1aXBtZW50fGVufDF8fHx8MTc2OTYyOTI0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgPolymer = "https://images.unsplash.com/photo-1722440814333-51292da1c59f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2x5bWVyJTIwcGxhc3RpYyUyMG1hdGVyaWFscyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY5NjI5MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgPaint = "https://images.unsplash.com/photo-1768796369926-2e25a1e4fc9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFpbnQlMjBjb2F0aW5ncyUyMGZhY3Rvcnl8ZW58MXx8fHwxNzY5NjI5MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgFertilizer = "https://images.unsplash.com/photo-1557505482-fb5252df1d67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmZXJ0aWxpemVyJTIwY2hlbWljYWxzfGVufDF8fHx8MTc2OTYyOTI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgLaboratory = "https://images.unsplash.com/photo-1748261347718-48afb646c3d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMGluZHVzdHJ5JTIwbGFib3JhdG9yeSUyMHNjaWVuY2V8ZW58MXx8fHwxNzY5NjI5MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgRefinery = "https://images.unsplash.com/photo-1768564206500-5cddb1fea679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMHBsYW50JTIwcmVmaW5lcnklMjBpbmR1c3RyeXxlbnwxfHx8fDE3Njk2MjkyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgStorage = "https://images.unsplash.com/photo-1759329176870-9f0cd6e637b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMHN0b3JhZ2UlMjB0YW5rcyUyMGluDhuzdHJpYWx8ZW58MXx8fHwxNzY5NjI5MjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Article images
const imgArticleSolvent = "https://images.unsplash.com/photo-1684853807644-428f89ce35fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMGxhYm9yYXRvcnklMjBzb2x2ZW50JTIwYm90dGxlc3xlbnwxfHx8fDE3Njk2Mzc4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgArticleFertilizer = "https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmZXJ0aWxpemVyJTIwZmllbGQlMjBncmVlbnxlbnwxfHx8fDE3Njk2Mzc4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgArticlePaint = "https://images.unsplash.com/photo-1768796369926-2e25a1e4fc9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFpbnQlMjBjb2F0aW5ncyUyMGZhY3Rvcnl8ZW58MXx8fHwxNzY5NjI5MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgArticlePolymer = "https://images.unsplash.com/photo-1608163483020-537b04aed43b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBvbHltZXIlMjBwbGFzdGljJTIwcGVsbGV0c3xlbnwxfHx8fDE3Njk2Mzc4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

function MenuButton() {
  return (
    <div className="h-2.5 relative w-[17px]">
      <div className="absolute bottom-[-5%] left-0 right-0 top-[-5%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 17 12"
        >
          <g id="Group 2085665467">
            <path
              d="M17 6L10.9412 6L5.85087 1H0"
              id="Vector 10"
              stroke="white"
            />
            <path
              d="M0 6L6.05882 6L11.1491 11H17"
              id="Vector 12"
              stroke="white"
            />
            <path
              d="M17 1H10.5"
              id="Vector 11"
              stroke="white"
            />
            <path
              d="M6.5 11H0"
              id="Vector 13"
              stroke="white"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ArrowIcon({ className = "" }) {
  return (
    <div className={`h-[11px] w-[19px] ${className}`}>
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 13"
      >
        <path
          d={svgPaths.p2533c630}
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

function StarIcon() {
  return (
    <div className="size-[25px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 25"
      >
        <path
          d={svgPaths.p2ac03e00}
          fill="#FF4343"
        />
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="h-8 w-[104px]">
      <div className="text-white text-2xl font-bold">نانومهر</div>
    </div>
  );
}

function Header({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      setIsLoggedIn(true);
      try {
        const user = JSON.parse(userData);
        setUserName(user.user_metadata?.name || user.email);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [currentPage]); // Re-check when page changes

  const scrollToProducts = () => {
    // If not on home page, navigate to home first
    if (currentPage !== 'home') {
      onNavigate('home');
      // Wait for page to render, then scroll
      setTimeout(() => {
        const element = document.getElementById('products');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-6 bg-[rgba(9,16,29,0)]">
        <div className="bg-[#0a1221]/95 backdrop-blur-lg border border-white/10 rounded-2xl px-6 md:px-10 py-5">
          <div className="flex items-center justify-between">
            {/* Logo - Right Side */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                نانومهر
              </div>
            </div>

            {/* Center Navigation - Hidden on Mobile */}
            <nav className="hidden lg:flex items-center gap-10">
              <button 
                onClick={() => onNavigate('home')} 
                className="text-white/90 hover:text-white text-lg font-medium transition-colors cursor-pointer"
              >
                خانه
              </button>
              <button 
                onClick={scrollToProducts}
                className="text-white/90 hover:text-white text-lg font-medium transition-colors cursor-pointer"
              >
                محصولات
              </button>
              <button 
                onClick={() => onNavigate('blog')} 
                className="text-white/90 hover:text-white text-lg font-medium transition-colors cursor-pointer"
              >
                مقالات
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="text-white/90 hover:text-white text-lg font-medium transition-colors cursor-pointer"
              >
                درباره ما
              </button>
              <button 
                onClick={() => onNavigate('contact')} 
                className="text-white/90 hover:text-white text-lg font-medium transition-colors cursor-pointer"
              >
                تماس با ما
              </button>
            </nav>

            {/* Left Side - Contact & Menu */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* User Profile or Login */}
              {isLoggedIn ? (
                <button 
                  onClick={() => onNavigate('profile')}
                  className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <User size={20} className="text-white" />
                  <span className="text-white text-sm font-medium">{userName}</span>
                </button>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <button 
                    onClick={() => onNavigate('login')}
                    className="text-white/90 hover:text-white text-sm font-medium transition-colors"
                  >
                    ورود
                  </button>
                  <span className="text-white/40">|</span>
                  <button 
                    onClick={() => onNavigate('register')}
                    className="bg-[#56CBD7] hover:bg-[#45b9c5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    ثبت‌نام
                  </button>
                </div>
              )}

              {/* Phone Number */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-white text-base font-medium tracking-tight" dir="ltr">
                  031-33333333
                </span>
              </div>

              {/* Contact Button */}
              <button className="hidden md:flex items-center justify-center w-11 h-11 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Phone size={20} className="text-white" strokeWidth={1.5} />
              </button>

              {/* Menu Button */}
              <button 
                className="flex items-center justify-center w-11 h-11 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group lg:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className="rotate-180 scale-y-[-1] group-hover:scale-110 transition-transform">
                  <MenuButton />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-2 bg-[#0a1221]/98 backdrop-blur-lg border border-white/10 rounded-2xl">
            <nav className="flex flex-col p-6 gap-4">
              <button 
                onClick={() => { onNavigate('home'); setMenuOpen(false); }} 
                className="text-white/90 hover:text-[#56CBD7] text-base font-medium transition-colors py-2 border-b border-white/10 text-right"
              >
                خانه
              </button>
              <button
                onClick={() => { scrollToProducts(); setMenuOpen(false); }}
                className="text-white/90 hover:text-[#56CBD7] text-base font-medium transition-colors py-2 border-b border-white/10 text-right"
              >
                محصولات
              </button>
              <button 
                onClick={() => { onNavigate('blog'); setMenuOpen(false); }} 
                className="text-white/90 hover:text-[#56CBD7] text-base font-medium transition-colors py-2 border-b border-white/10 text-right"
              >
                مقالات
              </button>
              <button 
                onClick={() => { onNavigate('about'); setMenuOpen(false); }}
                className="text-white/90 hover:text-[#56CBD7] text-base font-medium transition-colors py-2 border-b border-white/10 text-right"
              >
                درباره ما
              </button>
              <button 
                onClick={() => { onNavigate('contact'); setMenuOpen(false); }} 
                className="text-white/90 hover:text-[#56CBD7] text-base font-medium transition-colors py-2 border-b border-white/10 text-right"
              >
                تماس با ما
              </button>
              <div className="flex items-center gap-2 text-white/70 text-sm pt-2">
                <Phone size={16} />
                <span dir="ltr">031-33333333</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section 
      className="relative h-[921px] bg-gradient-to-br from-[#0a1221] to-[#1a2737] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 18, 33, 0.85) 0%, rgba(26, 39, 55, 0.9) 100%), url('${imgHeroBackground}')`,
        backgroundSize: 'auto, cover',
        backgroundPosition: '0% 0%, center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Hero Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-[72px] font-medium text-white leading-[1.1] tracking-[-1.44px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              پیشرو در صنعت<br />
              شیمی ایران
            </motion.h1>

            <motion.p 
              className="text-white text-base tracking-[-0.32px] leading-[1.5] max-w-[440px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              تولید و توزیع مواد شیمیایی صنعتی، پلیمرها، رنگ‌های صنعتی و ارائه راهکارهای نرم افزاری تخصصی با بالاترین استانداردهای کیفی
            </motion.p>

            {/* Call to Action */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.button 
                className="bg-[#56CBD7] hover:bg-[#45b9c5] rounded-lg px-5 py-3 text-white text-sm font-medium tracking-[-0.28px] flex items-center gap-3 justify-center transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                درخواست مشاوره
                <ArrowIcon className="scale-y-[-1]" />
              </motion.button>

              <motion.div 
                className="backdrop-blur-sm bg-white/10 rounded-xl w-[150px] h-[150px] flex items-center justify-center border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:backdrop-blur-lg"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-white text-sm font-medium tracking-[-0.28px] leading-[1.2] transition-colors duration-300 hover:text-white">
                    کاتالوگ<br />محصولات
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PromoSection({ onNavigate }) {
  return (
    <section className="bg-white py-8 -mt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div 
          className="bg-gradient-to-br from-[#56CBD7] to-[#024C53] rounded-xl h-[271px] relative overflow-hidden shadow-2xl cursor-pointer group"
          onClick={() => onNavigate('about')}
        >
          <div className="absolute inset-0">
            <div
              className="absolute h-[957px] w-full bg-cover bg-center bg-no-repeat -top-[336px] -left-[12px] opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              style={{ backgroundImage: `url('${imgPromoBackground}')` }}
            />
          </div>

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>

          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-white text-2xl md:text-[36px] font-medium leading-[1.1] tracking-[-1.8px] mb-4" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
                تیم مجرب مجموعه
              </h3>

              <p className="text-white text-base tracking-[-0.32px] leading-[1.5] max-w-[810px]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                پیشنهاد ویژه برای مشتریان جدید: با سفارش اولیه محصولات شیمیایی صنعتی، آزمایش کیفیت و تحلیل کامل مواد اولیه شما را به صورت رایگان انجام می‌دهیم
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <button className="text-white text-sm font-medium tracking-[-0.28px]" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  جزئیات بیشتر
                </button>
                <ArrowIcon className="scale-y-[-1] text-white drop-shadow-lg" />
              </div>

              <div className="hidden md:flex items-center gap-4">
                <button className="w-[42px] h-[42px] bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                  <ArrowIcon className="text-white rotate-180" />
                </button>
                <button className="w-[42px] h-[42px] bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                  <ArrowIcon className="text-white" />
                </button>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ image, title, number, description, isHovered, onHover, onLeave, onClick }) {
  return (
    <div 
      className={`h-[528px] relative overflow-hidden bg-[#3a3a3a] bg-cover bg-center cursor-pointer transition-all duration-500 ease-out ${
        isHovered ? 'flex-[2]' : 'flex-1'
      }`}
      style={{ backgroundImage: `url('${image}')` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Background overlay with blur effect */}
      <div className={`absolute inset-0 transition-all duration-500 ease-out ${
        isHovered ? 'bg-black/40' : 'bg-black/70 backdrop-blur-sm'
      }`} />
      
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Vertical title - shown when not hovered */}
        <div className={`flex items-center justify-center h-full transition-all duration-500 ease-out ${
          isHovered ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <div className="rotate-[-90deg]">
            <h3 className="text-white text-2xl md:text-[28px] font-medium tracking-[-1.4px] text-center whitespace-nowrap" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}>
              {title}
            </h3>
          </div>
        </div>

        {/* Horizontal content - shown when hovered */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ease-out ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h4 className="text-white text-[28px] font-medium leading-[1.1] tracking-[-1.4px] mb-4" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}>
            {title}
          </h4>
          {description && (
            <>
              <p className="text-white text-base tracking-[-0.32px] leading-[1.5] max-w-[440px] mb-6" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.7)' }}>
                {description}
              </p>
              
              <div className="flex items-center gap-3">
                <button className="text-white text-sm font-medium tracking-[-0.28px] border-b border-white pb-1" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
                  جزئیات بیشتر
                </button>
                <ArrowIcon className="scale-y-[-1] text-white" />
              </div>
            </>
          )}
        </div>

        {/* Number */}
        <div className={`absolute bottom-6 left-6 text-white text-xs font-medium tracking-[-0.24px] transition-all duration-500 ease-out ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`} style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
          {number}
        </div>
      </div>
    </div>
  );
}

function ServicesSection({ onNavigate }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    { 
      image: imgPolymer, 
      title: "مواد پلیمری", 
      number: "01",
      description: "تولید و توزیع انواع پلیمرهای صنعتی شامل پلی‌اتیلن، پلی‌پروپیلن و رزین‌های تخصصی با بالاترین کیفیت",
      productId: "polymer"
    },
    { 
      image: imgPaint, 
      title: "رنگ‌های صنعتی", 
      number: "02",
      description: "رنگ‌های صنعتی، پوشش‌های محافظتی و رنگ‌های خودرویی با استانداردهای بین‌المللی",
      productId: "paint"
    },
    { 
      image: imgFertilizer, 
      title: "کود و سموم", 
      number: "03",
      description: "تولید کودهای شیمیایی، آفت‌کش‌ها و سموم کشاورزی برای افزایش بهره‌وری محصولات کشاورزی",
      productId: "fertilizer"
    },
    { 
      image: "https://images.unsplash.com/photo-1763568258533-d0597f86ce62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwaW5kdXN0cmlhbCUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTE4NDk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", 
      title: "نرم افزارهای مرتبط با صنعت", 
      number: "04",
      description: "طراحی و توسعه نرم افزارهای تخصصی مدیریت تولید، کنترل کیفیت و اتوماسیون صنعتی",
      productId: "software"
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="products">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Desktop Carousel */}
        <div className="hidden md:flex gap-2.5 h-[528px] overflow-hidden">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              onClick={() => onNavigate('product', null, service.productId)}
            />
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative h-[300px] rounded-xl overflow-hidden cursor-pointer"
              style={{ backgroundImage: `url('${service.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              onClick={() => onNavigate('product', null, service.productId)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
              <div className="relative h-full p-6 flex flex-col justify-end">
                <span className="text-[#a0b3c4] text-xs font-medium mb-2">{service.number}</span>
                <h3 className="text-white text-2xl font-medium mb-2">{service.title}</h3>
                <p className="text-[#a0b3c4] text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProtectionSection({ onNavigate }) {
  const services = [
    "تولید و تأمین انواع رزین‌های پلیمری صنعتی",
    "رنگ‌های اپوکسی و پلی‌اورتان صنعتی", 
    "اسیدها، بازها و حلال‌های شیمیایی",
    "کودهای شیمیایی و آفت‌کش‌های تخصصی"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2 
          className="text-3xl md:text-[48px] font-medium leading-[1.1] tracking-[-0.96px] text-black text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          راهکارهای شیمیایی شما
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div 
            className="order-2 lg:order-1 relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url('${imgStorage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Floating Badge */}
            <motion.div 
              className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[#1a2737] text-sm font-medium">تولید و ذخیره‌سازی استاندارد</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Services List */}
          <motion.div 
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="group flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0 hover:border-[#56CBD7] transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ x: 8 }}
              >
                <div className="flex-1">
                  <span className="text-[#1a2737] text-base md:text-lg font-medium leading-relaxed">
                    {service}
                  </span>
                </div>
                <ArrowIcon className="scale-y-[-1] text-gray-400 group-hover:text-[#56CBD7] transition-colors" />
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.button
              onClick={() => onNavigate('contact')}
              className="mt-8 bg-gradient-to-r from-[#56CBD7] to-[#45b9c5] text-white px-8 py-4 rounded-xl text-base font-medium flex items-center gap-3 hover:shadow-xl transition-all w-full lg:w-auto justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(86, 203, 215, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              درخواست مشاوره تخصصی
              <ArrowIcon className="scale-y-[-1]" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0a1221] to-[#1a2737] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-[56px] font-medium leading-[1.1] tracking-[-1.12px] text-white mb-6">
            درباره نانومهر
          </h2>
          <p className="text-[#a0b3c4] text-lg max-w-3xl mx-auto">
            با بیش از نیم قرن تجربه، پیشرو در تولید و توزیع مواد شیمیایی صنعتی در خاورمیانه
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { number: "۵۰+", label: "سال سابقه", delay: 0 },
            { number: "۲۰۰۰+", label: "مشتری فعال", delay: 0.1 },
            { number: "۱۵۰+", label: "محصول متنوع", delay: 0.2 },
            { number: "۹۸٪", label: "رضایت مشتری", delay: 0.3 }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
            >
              <motion.div 
                className="text-[#56CBD7] text-4xl md:text-[56px] font-medium leading-[1.1] tracking-[-2.8px] mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: stat.delay + 0.2 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { Icon: Trophy, title: "کیفیت برتر", desc: "تولید با استانداردهای ISO و گواهینامه‌های بین‌المللی", delay: 0 },
            { Icon: Microscope, title: "تحقیق و توسعه", desc: "آزمایشگاه پیشرفته با تجهیزات روز دنیا", delay: 0.15 },
            { Icon: Globe, title: "صادرات جهانی", desc: "حضور در بیش از ۲۰ کشور جهان", delay: 0.3 }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="text-[#56CBD7] mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <item.Icon size={32} strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-white text-xl font-medium mb-2">{item.title}</h3>
              <p className="text-[#a0b3c4] text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsShowcase() {
  const products = [
    {
      title: "پلی اتیلن سنگین",
      category: "پلیمرها",
      description: "مناسب برای تولید لوله و پروفیل",
      image: imgPolymer
    },
    {
      title: "رنگ اپوکسی صنعتی",
      category: "رنگ و پوشش",
      description: "مقاومت بالا در برابر خوردگی",
      image: imgPaint
    },
    {
      title: "کود NPK مرکب",
      category: "کشاورزی",
      description: "افزایش بهره‌وری محصولات",
      image: imgFertilizer
    },
    {
      title: "نرم افزار مدیریت تولید",
      category: "نرم افزار",
      description: "اتوماسیون و کنترل فرآیندهای صنعتی",
      image: "https://images.unsplash.com/photo-1763568258533-d0597f86ce62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwaW5kdXN0cmlhbCUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTE4NDk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section id="products" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-[56px] font-medium leading-[1.1] tracking-[-1.12px] text-black mb-6">
            محصولات ویژه
          </h2>
          <p className="text-[#1a2737]/70 text-lg max-w-3xl mx-auto">
            مجموعه‌ای منتخب ز محصولات پرفروش با کیفیت تضمین شده
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#56CBD7] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-48 overflow-hidden relative">
                <ImageWithFallback 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#56CBD7] text-white text-xs px-3 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-2">{product.title}</h3>
                <p className="text-[#1a2737]/70 text-sm mb-4">{product.description}</p>
                <button className="text-[#56CBD7] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  اطلاعات بیشتر
                  <ArrowIcon className="scale-y-[-1] text-[#56CBD7]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "مهندس رضا احمدی",
      position: "مدیر تولید",
      company: "پتروشیمی تبریز",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTY1MTMzMHww&ixlib=rb-4.1.0&q=80&w=1080",
      text: "همکاری با نانومهر تجربه‌ای فوق‌العاده برای ما بوده است. کیفیت محصولات و خدمات پس از فروش آنها در سطح بسیار بالایی است و همیشه می‌توانیم روی تحویل به موقع حساب کنیم."
    },
    {
      name: "دکتر سارا کریمی",
      position: "مدیر فنی",
      company: "ایران خودرو",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NjUxMzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      text: "محصولات پلیمری نانومهر با استانداردهای بین‌المللی مطابقت دارند و در خط تولید ما عملکرد بسیار خوبی داشته‌اند. تیم فنی آنها همیشه آماده ارائه مشاوره و پشتیبانی هستند."
    },
    {
      name: "مهندس امیر حسینی",
      position: "مدیر خرید",
      company: "فولاد مبارکه",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTY1MTMwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      text: "قیمت‌گذاری رقابتی و کیفیت عالی دو ویژگی برجسته نانومهر است. بیش از ۱۰ سال است که از محصولات آنها استفاده می‌کنیم و همیشه راضی بوده‌ایم."
    },
    {
      name: "مهندس نیلوفر رضایی",
      position: "مدیر عامل",
      company: "کشت و صنعت مغان",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NjUxMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      text: "کودهای شیمیایی نانومهر به طور قابل توجهی عملکرد محصولات کشاورزی ما را افزایش داده است. تیم آنها با ارائه مشاوره تخصصی، ما را در انتخاب بهترین محصولات یاری کرده‌اند."
    },
    {
      name: "دکتر محمد صادقی",
      position: "مدیر کنترل کیفیت",
      company: "رنگ‌سازی رزین",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTY1MTM2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      text: "مواد اولیه رنگ‌سازی که از نانومهر تهیه می‌کنیم، دارای خلوص بالا و کیفیت استاندارد هستند. این امر به ما کمک کرده تا محصولات با کیفیت بالاتری تولید کنیم."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0a1221] to-[#1a2737] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-[48px] font-medium leading-[1.1] tracking-[-0.96px] text-white mb-4">
            نظرات مشتریان
          </h2>
          <p className="text-[#a0b3c4]">آنچه همکاران ما درباره خدمات ما می‌گویند</p>
        </motion.div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0"
                >
                  <motion.div 
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                      {/* Quote Icon */}
                      <div className="text-[#56CBD7] mb-6">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
                          <path d="M12 21.35l-3.18 8.65H2l3.18-8.65C5.18 21.35 0 16.17 0 10c0-5.52 4.48-10 10-10s10 4.48 10 10c0 6.17-5.18 11.35-8 11.35zm24 0l-3.18 8.65H26l3.18-8.65C29.18 21.35 24 16.17 24 10c0-5.52 4.48-10 10-10s10 4.48 10 10c0 6.17-5.18 11.35-8 11.35z" transform="scale(1.2)" />
                        </svg>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-white text-lg md:text-xl leading-relaxed mb-8">
                        {testimonial.text}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#56CBD7]">
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${testimonial.image}')` }}
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-lg mb-1">{testimonial.name}</h4>
                          <p className="text-[#a0b3c4] text-sm">{testimonial.position} - {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
            >
              <ArrowIcon className="text-white rotate-180 group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide 
                      ? 'w-8 h-2 bg-[#56CBD7]' 
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
            >
              <ArrowIcon className="text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  const scrollToProducts = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <footer className="bg-[#0a1221] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">نانومهر</div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              پیشرو در تولید و توزیع مواد شیمیایی صنعتی با بیش از ۵۰ سال تجربه
            </p>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#56CBD7] transition-colors cursor-pointer">
                <Instagram size={20} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#56CBD7] transition-colors cursor-pointer">
                <Send size={20} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#56CBD7] transition-colors cursor-pointer">
                <Mail size={20} className="text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-[#56CBD7] transition-colors cursor-pointer" onClick={() => onNavigate('about')}>درباره ما</li>
              <li className="hover:text-[#56CBD7] transition-colors cursor-pointer" onClick={scrollToProducts}>محصولات</li>
              <li className="hover:text-[#56CBD7] transition-colors cursor-pointer" onClick={() => onNavigate('blog')}>مقالات</li>
              <li className="hover:text-[#56CBD7] transition-colors cursor-pointer" onClick={() => onNavigate('contact')}>تماس با ما</li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-medium mb-4">محصولات</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-[#56CBD7] transition-colors cursor-pointer" onClick={() => onNavigate('product', null, 'polymer')}>مواد پلیمری</li>
              <li className="hover:text-[#56CBD7] transition-colors cursor-pointer" onClick={() => onNavigate('product', null, 'paint')}>رنگ‌ها صنعتی</li>
              <li className="hover:text-[#56CBD7] transition-colors cursor-pointer" onClick={() => onNavigate('product', null, 'fertilizer')}>کود و سموم</li>
              <li className="hover:text-[#56CBD7] transition-colors cursor-pointer" onClick={() => onNavigate('product', null, 'software')}>نرم افزارهای صنعتی</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">تما�� با ما</h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#56CBD7] mt-1" strokeWidth={1.5} />
                <span>استان اصفهان، شهرستان کاشان، دانشگاه سراسری کاشان</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#56CBD7]" strokeWidth={1.5} />
                <span dir="ltr">031-33333333</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#56CBD7]" strokeWidth={1.5} />
                <span dir="ltr">info@shimipars.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
          <p>© ۱۴۰۴ نانومهر. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}

function ArticlesSection({ onNavigate }) {
  const articles = ALL_ARTICLES.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-[56px] font-medium leading-[1.1] tracking-[-1.12px] text-black mb-6">
            مقالات
          </h2>
          <p className="text-[#1a2737]/70 text-lg max-w-3xl mx-auto">
            مجموعه‌ای منتخب از محصولات پرفروش با کیفیت تضمین شده
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {articles.map((article, index) => (
            <div 
              key={index} 
              onClick={() => onNavigate('article', article.id)}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#56CBD7] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <ImageWithFallback 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#56CBD7] text-white text-xs px-3 py-1 rounded-full">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-2">{article.title}</h3>
                <p className="text-[#1a2737]/70 text-sm mb-4">{article.description}</p>
                <div className="text-[#56CBD7] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  اطلاعات بیشتر
                  <ArrowIcon className="scale-y-[-1] text-[#56CBD7]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <motion.button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-3 bg-[#56CBD7] hover:bg-[#45b9c5] text-white px-8 py-4 rounded-lg text-base font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            مشاهده همه مقالات
            <ArrowIcon className="scale-y-[-1]" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function BlogPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('همه');
  
  const categories = ['همه', 'مواد پایه', 'کشاورزی', 'رنگ و پوشش', 'پلیمرها'];

  const filteredArticles = selectedCategory === 'همه' 
    ? ALL_ARTICLES 
    : ALL_ARTICLES.filter(article => article.category === selectedCategory);

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
              مقالات
            </motion.h1>
            <motion.p 
              className="text-[#a0b3c4] text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              مجموعه‌ای منتخب از محصولات پرفروش با کیفیت تضمین شده
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
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <motion.div 
                    className="absolute top-4 right-4 bg-[#56CBD7] text-white text-xs px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  >
                    {article.category}
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-[#1a2737]/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{article.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-black mb-3">{article.title}</h3>
                  <p className="text-[#1a2737]/70 text-sm mb-4 line-clamp-2">{article.description}</p>
                  <div className="text-[#56CBD7] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    مطالعه مقاله
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <div>
      <Header currentPage="home" onNavigate={onNavigate} />
      <HeroSection />
      <PromoSection onNavigate={onNavigate} />
      <ServicesSection onNavigate={onNavigate} />
      <ProtectionSection onNavigate={onNavigate} />
      <AboutSection />
      <ArticlesSection onNavigate={onNavigate} />
      <TestimonialsSection />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  // Check URL hash on mount for CMS access
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove #
    if (hash === 'cms') {
      setCurrentPage('cms');
    }

    // Check if user is logged in
    const token = localStorage.getItem('user_token');
    const userData = localStorage.getItem('user_data');
    if (token && userData) {
      setUserToken(token);
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Listen to hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      if (newHash === 'cms') {
        setCurrentPage('cms');
      } else if (newHash === '' && currentPage === 'cms') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLoginSuccess = (user: any, token: string) => {
    setCurrentUser(user);
    setUserToken(token);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserToken(null);
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
  };

  const handleNavigate = (page: string, articleId?: number, productId?: string) => {
    setCurrentPage(page);
    if (articleId) {
      setSelectedArticleId(articleId);
    }
    if (productId) {
      setSelectedProductId(productId);
    }
    
    // Update hash for CMS
    if (page === 'cms') {
      window.location.hash = 'cms';
    } else if (window.location.hash === '#cms') {
      window.location.hash = '';
    }
    
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const selectedArticle = selectedArticleId 
    ? ALL_ARTICLES.find(article => article.id === selectedArticleId)
    : null;

  return (
    <div className="min-h-screen">
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}
      {currentPage === 'article' && selectedArticle && (
        <>
          <Header currentPage="article" onNavigate={handleNavigate} />
          <ArticleDetail 
            article={selectedArticle} 
            allArticles={ALL_ARTICLES}
            onNavigate={handleNavigate} 
          />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'product' && selectedProductId && (
        <>
          <Header currentPage="product" onNavigate={handleNavigate} />
          <ProductPage 
            productId={selectedProductId}
            onNavigate={handleNavigate} 
          />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'contact' && (
        <>
          <Header currentPage="contact" onNavigate={handleNavigate} />
          <ContactPage onNavigate={handleNavigate} />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'about' && (
        <>
          <Header currentPage="about" onNavigate={handleNavigate} />
          <AboutPage onNavigate={handleNavigate} />
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      {currentPage === 'login' && (
        <LoginPage 
          onNavigate={handleNavigate}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentPage === 'register' && (
        <RegisterPage 
          onNavigate={handleNavigate}
          onRegisterSuccess={handleLoginSuccess}
        />
      )}
      {currentPage === 'profile' && (
        <UserProfile 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'cms' && <CMSPage />}
    </div>
  );
}