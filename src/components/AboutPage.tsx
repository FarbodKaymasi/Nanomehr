import { motion } from 'motion/react';
import { Trophy, Award, Users, Target, TrendingUp, Shield, Calendar, MapPin, Microscope, Factory, Globe } from 'lucide-react';

const imgAboutHero = "https://images.unsplash.com/photo-1768128834301-7811be9d3a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMGZhY3RvcnklMjBpbmR1c3RyaWFsJTIwcGxhbnR8ZW58MXx8fHwxNzY5NjI5MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgTeam = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTY1MTI4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgLaboratory = "https://images.unsplash.com/photo-1748261347718-48afb646c3d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMGluZHVzdHJ5JTIwbGFib3JhdG9yeSUyMHNjaWVuY2V8ZW58MXx8fHwxNzY5NjI5MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const achievements = [
    {
      icon: Calendar,
      title: "۵۰+ سال سابقه",
      description: "نیم قرن تجربه در صنعت شیمی ایران",
      delay: 0
    },
    {
      icon: Users,
      title: "۲۰۰۰+ مشتری فعال",
      description: "همکاری با بزرگترین شرکت‌های صنعتی",
      delay: 0.1
    },
    {
      icon: Trophy,
      title: "۱۵۰+ محصول",
      description: "تنوع بالا در محصولات شیمیایی",
      delay: 0.2
    },
    {
      icon: Globe,
      title: "۲۰+ کشور",
      description: "صادرات به کشورهای منطقه و اروپا",
      delay: 0.3
    },
    {
      icon: Award,
      title: "گواهینامه‌های بین‌المللی",
      description: "ISO 9001, ISO 14001, OHSAS 18001",
      delay: 0.4
    },
    {
      icon: TrendingUp,
      title: "۹۸٪ رضایت مشتری",
      description: "کیفیت برتر و خدمات پس از فروش",
      delay: 0.5
    }
  ];

  const teamMembers = [
    {
      name: "دکتر محسن یعقوبیان",
      position: "مدیرعامل و عضو هیئت مدیره",
      experience: "۱۰ سال تجربه در صنعت شیمی",
      image: "https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwZ2xhc3Nlc3xlbnwxfHx8fDE3NzExMDg4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      delay: 0
    },
    {
      name: "دکتر مسعود خواجه‌نوری",
      position: "رئیس هیئت مدیره",
      experience: "عضو هیئت علمی دانشگاه کاشان، مدیرگروه رشته مهندسی شیمی",
      image: "https://images.unsplash.com/photo-1722938203650-99afb12419f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwYnVzaW5lc3NtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxMTU3NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      delay: 0.1
    },
    {
      name: "مهندس امینی",
      position: "نائب رئیس هیئت مدیره",
      experience: "۱۰ سال تجربه در صنعت شیمی",
      image: "https://images.unsplash.com/photo-1747811853766-7a6612797dc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTE1MjM0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      delay: 0.2
    },
    {
      name: "خانم دکتر شیما شعبانی",
      position: "دبیر",
      experience: "۱۰ سال تجربه در صنعت شیمی",
      image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvمانJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxMTY3Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      delay: 0.3
    }
  ];

  const milestones = [
    {
      year: "۱۳۴۵",
      title: "تأسیس شرکت",
      description: "شروع فعالیت با تولید مواد شیمیایی پایه"
    },
    {
      year: "۱۳۶۰",
      title: "توسعه خط تولید",
      description: "راه‌اندازی کارخانه تولید پلیمرها"
    },
    {
      year: "۱۳۷۵",
      title: "ورود به بازارهای جهانی",
      description: "شروع صادرات به کشورهای منطقه"
    },
    {
      year: "۱۳۹۰",
      title: "دریافت گواهینامه‌های بین‌المللی",
      description: "اخذ استانداردهای ISO و CE"
    },
    {
      year: "۱۴۰۰",
      title: "گسترش سازمانی",
      description: "تشکیل گروه نانومهر با ۵ شرکت تابعه"
    },
    {
      year: "۱۴۰۴",
      title: "پیشرو در نوآوری",
      description: "راه‌اندازی مرکز تحقیق و توسعه پیشرفته"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "کیفیت",
      description: "تعهد به بالاترین استانداردهای کیفی در تولید"
    },
    {
      icon: Target,
      title: "نوآوری",
      description: "تحقیق و توسعه مداوم برای محصولات نوین"
    },
    {
      icon: Users,
      title: "مشتری‌مداری",
      description: "رضایت مشتری در اولویت تمام فعالیت‌ها"
    },
    {
      icon: Globe,
      title: "مسئولیت اجتماعی",
      description: "حفظ محیط زیست و توسعه پایدار"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-[500px] bg-gradient-to-br from-[#0a1221] to-[#1a2737] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 18, 33, 0.85) 0%, rgba(26, 39, 55, 0.9) 100%), url('${imgAboutHero}')`,
          backgroundSize: 'auto, cover',
          backgroundPosition: '0% 0%, center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-[56px] font-medium leading-[1.1] tracking-[-1.12px] text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            درباره نانومهر
          </motion.h1>
          <motion.p 
            className="text-[#a0b3c4] text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            با بیش از نیم قرن تجربه، پیشرو در تولید و توزیع مواد شیمیایی صنعتی در خاورمیانه
          </motion.p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-[48px] font-medium leading-[1.1] tracking-[-0.96px] text-black mb-6">
                پیشگام در صنعت شیمی ایران
              </h2>
              <p className="text-[#1a2737]/70 text-base leading-relaxed mb-4">
                نانومهر از سال ۱۳۴۵ با هدف تولید و توزیع مواد شیمیایی با کیفیت بالا فعالیت خود را آغاز کرد. امروزه با بیش از ۵۰ سال تجربه، به عنوان یکی از بزرگترین تولیدکنندگان مواد شیمیایی صنعتی در منطقه شناخته می‌شویم.
              </p>
              <p className="text-[#1a2737]/70 text-base leading-relaxed mb-4">
                ما با تکیه بر دانش فنی روز، تجهیزات پیشرفته و نیروی انسانی متخصص، محصولاتی با بالاترین استانداردهای کیفی تولید می‌کنیم. محصولات ما در صنایع مختلف از جمله پلیمر، رنگ و پوشش، کشاورزی و پتروشیمی کاربرد دارند.
              </p>
              <p className="text-[#1a2737]/70 text-base leading-relaxed">
                تعهد ما به نوآوری، کیفیت و خدمات مشتری‌محور، باعث شده تا امروز بیش از ۲۰۰۰ مشتری فعال در داخل و خارج از کشور به ما اعتماد کنند.
              </p>
            </motion.div>

            <motion.div
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${imgLaboratory}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-[48px] font-medium leading-[1.1] tracking-[-0.96px] text-black mb-4">
              دستاوردها و افتخارات
            </h2>
            <p className="text-[#1a2737]/70 text-lg max-w-3xl mx-auto">
              نتیجه نیم قرن تلاش و تعهد به کیفیت
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#56CBD7] transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: achievement.delay }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#56CBD7] mb-4">
                  <achievement.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">{achievement.title}</h3>
                <p className="text-[#1a2737]/70 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-[48px] font-medium leading-[1.1] tracking-[-0.96px] text-black mb-4">
              مسیر رشد و توسعه
            </h2>
            <p className="text-[#1a2737]/70 text-lg max-w-3xl mx-auto">
              نگاهی به تاریخچه و نقاط عطف نانومهر
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#56CBD7] to-gray-300"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#56CBD7] transition-all duration-300 hover:shadow-lg">
                      <div className="text-[#56CBD7] text-2xl font-medium mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-medium text-black mb-2">{milestone.title}</h3>
                      <p className="text-[#1a2737]/70 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Circle */}
                  <div className="hidden md:block relative">
                    <div className="w-4 h-4 bg-[#56CBD7] rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-[#0a1221] to-[#1a2737]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-[48px] font-medium leading-[1.1] tracking-[-0.96px] text-white mb-4">
              ارزش‌های ما
            </h2>
            <p className="text-[#a0b3c4] text-lg max-w-3xl mx-auto">
              اصولی که راهنمای تمام فعالیت‌های ماست
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#56CBD7] mb-4">
                  <value.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-white text-xl font-medium mb-2">{value.title}</h3>
                <p className="text-[#a0b3c4] text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-[48px] font-medium leading-[1.1] tracking-[-0.96px] text-black mb-4">
              تیم مدیریت
            </h2>
            <p className="text-[#1a2737]/70 text-lg max-w-3xl mx-auto">
              متخصصان و مدیران با تجربه نانومهر
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#56CBD7] transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: member.delay }}
                whileHover={{ y: -8 }}
              >
                <div className="h-64 overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundImage: `url('${member.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-black mb-1">{member.name}</h3>
                  <p className="text-[#56CBD7] text-sm font-medium mb-2">{member.position}</p>
                  <p className="text-[#1a2737]/70 text-xs">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-[48px] font-medium leading-[1.1] tracking-[-0.96px] text-black mb-4">
              نویسندگان
            </h2>
            <p className="text-[#1a2737]/70 text-lg max-w-3xl mx-auto">
              متخصصان و نویسندگان با تجربه نانومهر در تهیه محتوای تخصصی
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={`author-${index}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#56CBD7] transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: member.delay }}
                whileHover={{ y: -8 }}
              >
                <div className="h-64 overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundImage: `url('${member.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-black mb-1">{member.name}</h3>
                  <p className="text-[#56CBD7] text-sm font-medium mb-2">{member.position}</p>
                  <p className="text-[#1a2737]/70 text-xs">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-[48px] font-medium leading-[1.1] tracking-[-0.96px] text-black mb-6">
              آماده همکاری با شما هستیم
            </h2>
            <p className="text-[#1a2737]/70 text-lg mb-8 max-w-3xl mx-auto">
              برای دریافت مشاوره رایگان و اطلاعات بیشتر درباره محصولات و خدمات ما، همین حالا با ما تماس بگیرید
            </p>
            <motion.button
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-[#56CBD7] to-[#45b9c5] text-white px-10 py-4 rounded-xl text-lg font-medium hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(86, 203, 215, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              تماس با ما
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}