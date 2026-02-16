import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a1221] to-[#1a2737] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.15] tracking-tight text-white mb-6">
              تماس با ما
            </h1>
            <p className="text-[#a0b3c4] text-lg md:text-xl max-w-3xl mx-auto">
              تیم متخصص نانومهر آماده پاسخگویی به سوالات و نیازهای شما است
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-10 mb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <MapPin size={32} />,
                title: 'آدرس دفتر مرکزی',
                content: 'تهران، خیابان ولیعصر، مجتمع تجاری شیمی پارس',
                delay: 0.1
              },
              {
                icon: <Phone size={32} />,
                title: 'تلفن تماس',
                content: '031-33333333',
                dir: 'ltr',
                delay: 0.2
              },
              {
                icon: <Mail size={32} />,
                title: 'ایمیل',
                content: 'info@metakom.com',
                dir: 'ltr',
                delay: 0.3
              },
              {
                icon: <Clock size={32} />,
                title: 'ساعات کاری',
                content: 'شنبه تا پنجشنبه: 8:00 - 17:00',
                delay: 0.4
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:border-[#56CBD7] transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
              >
                <div className="text-[#56CBD7] mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-black mb-2">
                  {item.title}
                </h3>
                <p className={`text-[#1a2737]/70 ${item.dir === 'ltr' ? 'text-left' : ''}`}>
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
                  فرم تماس
                </h2>
                <p className="text-[#1a2737]/70 mb-8">
                  لطفاً اطلاعات خود را وارد کنید تا در اسرع وقت با شما تماس بگیریم
                </p>

                {submitted ? (
                  <motion.div
                    className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="text-green-600 text-5xl mb-4">✓</div>
                    <h3 className="text-xl font-medium text-green-800 mb-2">
                      پیام شما با موفقیت ارسال شد
                    </h3>
                    <p className="text-green-700">
                      به زودی با شما تماس خواهیم گرفت
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#1a2737] font-medium mb-2">
                          نام و نام خانوادگی *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#56CBD7] focus:ring-2 focus:ring-[#56CBD7]/20 outline-none transition-all"
                          placeholder="نام خود را وارد کنید"
                        />
                      </div>
                      <div>
                        <label className="block text-[#1a2737] font-medium mb-2">
                          تلفن همراه *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          dir="ltr"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#56CBD7] focus:ring-2 focus:ring-[#56CBD7]/20 outline-none transition-all text-left"
                          placeholder="09123456789"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#1a2737] font-medium mb-2">
                        ایمیل *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#56CBD7] focus:ring-2 focus:ring-[#56CBD7]/20 outline-none transition-all text-left"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[#1a2737] font-medium mb-2">
                        موضوع *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#56CBD7] focus:ring-2 focus:ring-[#56CBD7]/20 outline-none transition-all"
                      >
                        <option value="">موضوع پیام را انتخاب کنید</option>
                        <option value="product">استعلام محصول</option>
                        <option value="cooperation">همکاری</option>
                        <option value="support">پشتیبانی</option>
                        <option value="complaint">شکایت</option>
                        <option value="other">سایر موارد</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#1a2737] font-medium mb-2">
                        پیام شما *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#56CBD7] focus:ring-2 focus:ring-[#56CBD7]/20 outline-none transition-all resize-none"
                        placeholder="پیام خود را اینجا بنویسید..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-[#56CBD7] hover:bg-[#45b9c5] text-white px-8 py-4 rounded-lg text-base font-medium transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ارسال پیام
                      <Send size={20} />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Map */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-medium text-black mb-6">
                  موقعیت دفتر مرکزی
                </h3>
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.8967427890994!2d51.41886431525855!3d35.70143998019115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0a77c6f9f8c1c6c!2sValiasr%20St%2C%20Tehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="موقعیت دفتر مرکزی"
                  ></iframe>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-[#56CBD7] to-[#45b9c5] rounded-2xl p-8 text-white shadow-lg">
                <h3 className="text-2xl font-medium mb-4">
                  چرا نانومهر؟
                </h3>
                <ul className="space-y-4">
                  {[
                    'بیش از 20 سال تجربه در صنعت شیمی',
                    'تامین محصولات با بالاترین کیفیت',
                    'پشتیبانی فنی تخصصی',
                    'تحویل سریع و به موقع',
                    'قیمت‌های رقابتی و مناسب'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-white/90 mt-1">✓</span>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
              سوالات متداول
            </h2>
            <p className="text-[#1a2737]/70">
              پاسخ سوالات رایج مشتریان
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'چگونه می‌توانم سفارش خود را ثبت کنم؟',
                answer: 'شما می‌توانید از طریق تماس تلفنی، ایمیل یا پر کردن فرم تماس، سفارش خود را ثبت کنید. تیم فروش ما در اسرع وقت با شما تماس خواهد گرفت.'
              },
              {
                question: 'آیا امکان بازدید از انبار و کارخانه وجود دارد؟',
                answer: 'بله، با هماهنگی قبلی می‌توانید از تاسیسات و انبارهای ما بازدید کنید. لطفاً از طریق شماره تماس با واحد فروش هماهنگ کنید.'
              },
              {
                question: 'زمان تحویل محصولات چقدر است؟',
                answer: 'زمان تحویل بستگی به نوع محصول و مقدار سفارش دارد. معمولاً محصولات موجود در انبار ظرف 2-3 روز کاری تحویل داده می‌شوند.'
              },
              {
                question: 'آیا خدمات مشاوره فنی ارائه می‌دهید؟',
                answer: 'بله، تیم متخصص فنی ما آماده ارائه مشاوره رایگان در خصوص انتخاب و استفاده صحیح از محصولات شیمیایی است.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-medium text-black mb-3">
                  {faq.question}
                </h3>
                <p className="text-[#1a2737]/70 leading-relaxed text-justify">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}