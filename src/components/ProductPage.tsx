import { motion } from 'motion/react';
import { Check, Download, ShoppingCart, Phone, Mail, ArrowRight } from 'lucide-react';

interface ProductPageProps {
  productId: string;
  onNavigate: (page: string) => void;
}

const productsData = {
  polymer: {
    title: 'مواد پلیمری',
    subtitle: 'تولید و توزیع انواع پلیمرهای صنعتی',
    heroImage: 'https://images.unsplash.com/photo-1722440814333-51292da1c59f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2x5bWVyJTIwcGxhc3RpYyUyMG1hdGVyaWFscyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY5NjI5MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'شرکت نانومهر با بهره‌گیری از جدیدترین تکنولوژی‌های روز دنیا، در زمینه تولید و توزیع انواع مواد پلیمری فعالیت می‌کند. محصولات پلیمری ما با استانداردهای بین‌المللی تولید شده و در صنایع مختلف کاربرد دارند.',
    features: [
      'پلی‌اتیلن با چگالی بالا (HDPE)',
      'پلی‌اتیلن با چگالی پایین (LDPE)',
      'پلی‌پروپیلن (PP) گرید تزریقی و فیلم',
      'پلی‌استایرن (PS) ضربه‌ای و معمولی',
      'پلی‌وینیل کلراید (PVC)',
      'رزین‌های اپوکسی و پلی‌اورتان'
    ],
    applications: [
      'صنایع بسته‌بندی و فیلم',
      'تولید قطعات خودرو',
      'لوازم خانگی و الکترونیک',
      'صنایع ساختمانی',
      'تولید لوله و اتصالات',
      'ظروف و مخازن صنعتی'
    ],
    specifications: {
      'استانداردهای کیفی': 'ISO 9001:2015, ASTM',
      'بسته‌بندی': 'کیسه 25 کیلوگرمی، بگ 500-1000 کیلوگرمی',
      'انبارداری': 'محیط خشک و خنک، دور از نور مستقیم خورشید',
      'مدت ماندگاری': '24 ماه از تاریخ تولید'
    }
  },
  paint: {
    title: 'رنگ‌های صنعتی',
    subtitle: 'پوشش‌های حرفه‌ای برای صنایع مختلف',
    heroImage: 'https://images.unsplash.com/photo-1768796369926-2e25a1e4fc9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFpbnQlMjBjb2F0aW5ncyUyMGZhY3Rvcnl8ZW58MXx8fHwxNzY5NjI5MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'رنگ‌های صنعتی نانومهر با فرمولاسیون پیشرفته و استفاده از مواد اولیه با کیفیت، دوام و مقاومت بالایی در برابر شرایط سخت محیطی دارند. محصولات ما برای صنایع خودرو، نفت و گاز، دریایی و ساختمانی مناسب است.',
    features: [
      'رنگ‌های اپوکسی صنعتی',
      'رنگ‌های پلی‌اورتان دو جزئی',
      'رنگ‌های آلکیدی و روغنی',
      'پوشش‌های ضد خورندگی',
      'رنگ‌های خودرویی اتومبیل',
      'رنگ‌های کف و کفپوش صنعتی'
    ],
    applications: [
      'صنایع نفت، گاز و پتروشیمی',
      'صنایع خودروسازی',
      'سازه‌های فلزی و فولادی',
      'تاسیسات دریایی و بنادر',
      'ساختمان‌سازی و معماری',
      'کف سالن‌ها و انبارهای صنعتی'
    ],
    specifications: {
      'استانداردهای کیفی': 'ISO 12944, SSPC, NACE',
      'بسته‌بندی': 'سطل 4-20 لیتری، بشکه 200 لیتری',
      'انبارداری': 'محیط خشک و با تهویه مناسب، دور از حرارت',
      'مدت ماندگاری': '12-18 ماه'
    }
  },
  fertilizer: {
    title: 'کود و سموم کشاورزی',
    subtitle: 'محصولات تخصصی برای افزایش بهره‌وری',
    heroImage: 'https://images.unsplash.com/photo-1557505482-fb5252df1d67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmZXJ0aWxpemVyJTIwY2hlbWljYWxzfGVufDF8fHx8MTc2OTYyOTI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'نانومهر با ارائه کودهای شیمیایی و سموم کشاورزی با کیفیت، در افزایش عملکرد و بهره‌وری محصولات کشاورزی نقش مهمی ایفا می‌کند. تمامی محصولات ما با رعایت استانداردهای زیست‌محیطی تولید می‌شوند.',
    features: [
      'کودهای ازته (اوره، نیترات آمونیوم)',
      'کودهای فسفاته (سوپرفسفات)',
      'کودهای پتاسه و مرکب',
      'کودهای ریزمغذی و کلات‌شده',
      'آفت‌کش‌های حشره‌کش و قارچ‌کش',
      'علف‌کش‌های تخصصی'
    ],
    applications: [
      'کشاورزی و زراعت',
      'باغداری و نگهداری فضای سبز',
      'گلخانه‌های تولیدی',
      'مزارع صنعتی',
      'پرورش محصولات هیدروپونیک',
      'کشت و کار ارگانیک'
    ],
    specifications: {
      'استانداردهای کیفی': 'FAO, EU Regulations',
      'بسته‌بندی': 'کیسه 25-50 کیلوگرمی، بگ 500 کیلوگرمی',
      'انبارداری': 'محیط خشک و خنک، دور از مواد غذایی',
      'مدت ماندگاری': '12-36 ماه بسته به نوع محصول'
    }
  },
  software: {
    title: 'نرم افزارهای مرتبط با صنعت شیمی',
    subtitle: 'راهکارهای نرم افزاری تخصصی برای صنایع شیمیایی',
    heroImage: 'https://images.unsplash.com/photo-1763568258533-d0597f86ce62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwaW5kdXN0cmlhbCUyMGF1dG9mYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTE4NDk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'نانومهر با ارائه نرم افزارهای تخصصی و سیستم‌های اتوماسیون صنعتی، به بهبود فرآیندهای توید، کنترل کیفیت و مدیریت منابع در صنایع شیمیایی کمک می‌کند. راهکارهای نرم افزاری ما بر اساس نیازهای واقعی صنعت طراحی شده‌اند.',
    features: [
      'نرم افزار مدیریت تولید (ERP)',
      'سیستم کنترل کیفیت و آزمایشگاه (LIMS)',
      'نرم افزار مدیریت انبار و موجودی',
      'سیستم‌های اتوماسیون صنعتی (SCADA)',
      'نرم افزار برنامه‌ریزی تولید (MES)',
      'داشبورد مدیریتی و گزارش‌گیری'
    ],
    applications: [
      'کارخانجات شیمیایی و پتروشیمی',
      'واحدهای تولید پلیمر و رزین',
      'صنایع رنگ و پوشش',
      'کارخانجات تولید کود و سموم',
      'آزمایشگاه‌های کنترل کیفیت',
      'مراکز تحقیق و توسعه'
    ],
    specifications: {
      'استانداردهای کیفی': 'ISO 27001, CMMI Level 3',
      'پلتفرم': 'Web-Based, Desktop, Mobile',
      'پشتیبانی': 'آموزش رایگان، پشتیبانی 24/7',
      'سفارشی‌سازی': 'امکان توسعه ماژول‌های اختصاصی'
    }
  }
};

export function ProductPage({ productId, onNavigate }: ProductPageProps) {
  const product = productsData[productId];

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-black mb-4">محصول یافت نشد</h2>
          <button
            onClick={() => onNavigate('home')}
            className="text-[#56CBD7] hover:underline"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-gradient-to-br from-[#0a1221] to-[#1a2737] flex items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 18, 33, 0.75) 0%, rgba(26, 39, 55, 0.85) 100%), url('${product.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={() => onNavigate('home')}
              className="text-white/80 hover:text-white mb-6 flex items-center gap-2 transition-colors"
            >
              <ArrowRight size={20} className="rotate-180" />
              بازگشت به صفحه اصلی
            </button>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-medium text-white leading-[1.1] mb-4">
              {product.title}
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-3xl">
              {product.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-black mb-6">
                درباره محصول
              </h2>
              <p className="text-[#1a2737]/70 text-lg leading-relaxed text-justify mb-8">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#56CBD7] hover:bg-[#45b9c5] text-white px-8 py-4 rounded-lg text-base font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  درخواست خرید
                </button>
                <button className="border-2 border-[#56CBD7] text-[#56CBD7] hover:bg-[#56CBD7] hover:text-white px-8 py-4 rounded-lg text-base font-medium transition-all flex items-center justify-center gap-2">
                  <Download size={20} />
                  دانلود کاتالوگ
                </button>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-[#56CBD7]/10 to-[#45b9c5]/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-medium text-black mb-6">مشخصات فنی</h3>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col gap-1 pb-4 border-b border-gray-200 last:border-b-0"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="text-[#56CBD7] font-medium">{key}</span>
                    <span className="text-[#1a2737]/70">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
              محصولات و خدمات
            </h2>
            <p className="text-[#1a2737]/70 text-lg">
              طیف گسترده‌ای از محصولات با کیفیت
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-[#56CBD7]/10 rounded-lg p-2 flex-shrink-0">
                    <Check size={20} className="text-[#56CBD7]" />
                  </div>
                  <p className="text-[#1a2737] font-medium">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
              کاربردها و صنایع
            </h2>
            <p className="text-[#1a2737]/70 text-lg">
              استفاده در صنایع مختلف
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.applications.map((app, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#56CBD7] to-[#45b9c5] text-white rounded-xl p-6 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <p className="font-medium text-lg">{app}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0a1221] to-[#1a2737]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
              آماده همکاری با شما هستیم
            </h2>
            <p className="text-white/80 text-lg mb-8">
              برای دریافت مشاوره رایگان و کسب اطلاعات بیشتر درباره محصولات، با ما تماس بگیرید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#56CBD7] hover:bg-[#45b9c5] text-white px-8 py-4 rounded-lg text-base font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                تماس با ما
              </button>
              <a
                href="mailto:info@nanomehr.com"
                className="border-2 border-white text-white hover:bg-white hover:text-[#1a2737] px-8 py-4 rounded-lg text-base font-medium transition-all flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                ارسال ایمیل
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}