export interface Author {
  id: string;
  name: string;
  title: string;
  image: string;
  experience: string;
  bio?: string;
  education?: {
    degree: string;
    university: string;
    year: string;
  }[];
  workHistory?: {
    position: string;
    company: string;
    duration: string;
    description: string;
  }[];
  skills?: string[];
  publications?: {
    title: string;
    journal: string;
    year: string;
  }[];
  certifications?: string[];
  contactEmail?: string;
}

export const AUTHORS: Author[] = [
  {
    id: "yaghoobian",
    name: "دکتر محسن یعقوبیان",
    title: "مدیرعامل و عضو هیئت مدیره",
    image: "https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwZ2xhc3Nlc3xlbnwxfHx8fDE3NzExMDg4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    experience: "۱۰ سال تجربه در صنعت شیمی",
    bio: "دکتر محسن یعقوبیان با بیش از ۱۰ سال تجربه در صنعت شیمی و مدیریت پروژه‌های بزرگ صنعتی، هم‌اکنون به عنوان مدیرعامل و عضو هیئت مدیره شرکت نانومهر مشغول به فعالیت می‌باشد. ایشان با تخصص در مهندسی شیمی و مدیریت کسب و کار، توانسته‌اند شرکت را به یکی از پیشگامان صنعت شیمیایی کشور تبدیل کنند.",
    education: [
      {
        degree: "دکتری مهندسی شیمی",
        university: "دانشگاه صنعتی شریف",
        year: "۱۳۹۵"
      },
      {
        degree: "کارشناسی ارشد مهندسی شیمی",
        university: "دانشگاه تهران",
        year: "۱۳۹۰"
      }
    ],
    workHistory: [
      {
        position: "مدیرعامل و عضو هیئت مدیره",
        company: "شرکت نانومهر",
        duration: "۱۴۰۰ - اکنون",
        description: "مدیریت کلیه فعالیت‌های شرکت و توسعه استراتژی‌های کسب و کار"
      },
      {
        position: "مدیر فنی",
        company: "شرکت پتروشیمی اصفهان",
        duration: "۱۳۹۶ - ۱۴۰۰",
        description: "نظارت بر فرآیندهای تولید و توسعه محصولات جدید"
      }
    ],
    skills: [
      "مهندسی شیمی",
      "مدیریت پروژه",
      "توسعه کسب و کار",
      "کنترل کیفیت",
      "مدیریت استراتژیک"
    ],
    publications: [
      {
        title: "بهینه‌سازی فرآیندهای پلیمریزاسیون در صنایع پتروشیمی",
        journal: "مجله علمی مهندسی شیمی ایران",
        year: "۱۳۹۸"
      },
      {
        title: "کاربرد نانوتکنولوژی در صنایع رنگ و پوشش",
        journal: "فصلنامه تخصصی مواد پیشرفته",
        year: "۱۳۹۷"
      }
    ],
    certifications: [
      "مدیریت پروژه PMP",
      "ISO 9001 Lead Auditor",
      "Six Sigma Black Belt"
    ],
    contactEmail: "yaghoobian@nanomehr.ir"
  },
  {
    id: "khajenoori",
    name: "دکتر مسعود خواجه‌نوری",
    title: "رئیس هیئت مدیره",
    image: "https://images.unsplash.com/photo-1722938203650-99afb12419f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwYnVzaW5lc3NtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxMTU3NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    experience: "عضو هیئت علمی دانشگاه کاشان، مدیرگروه رشته مهندسی شیمی",
    bio: "دکتر مسعود خواجه‌نوری، عضو هیئت علمی دانشگاه کاشان و مدیرگروه رشته مهندسی شیمی، با سابقه تدریس و پژوهش در حوزه‌های مختلف مهندسی شیمی، هم‌اکنون به عنوان رئیس هیئت مدیره شرکت نانومهر فعالیت می‌کند. ایشان در زمینه فرآیندهای جداسازی و تصفیه پیشرفته دارای تحقیقات گسترده‌ای می‌باشند.",
    education: [
      {
        degree: "دکتری مهندسی شیمی",
        university: "دانشگاه صنعتی امیرکبیر",
        year: "۱۳۹۲"
      },
      {
        degree: "کارشناسی ارشد مهندسی شیمی",
        university: "دانشگاه کاشان",
        year: "۱۳۸۷"
      }
    ],
    workHistory: [
      {
        position: "رئیس هیئت مدیره",
        company: "شرکت نانومهر",
        duration: "۱۴۰۱ - اکنون",
        description: "تعیین سیاست‌ها و استراتژی‌های کلان شرکت"
      },
      {
        position: "عضو هیئت علمی و مدیر گروه",
        company: "دانشگاه کاشان",
        duration: "۱۳۹۳ - اکنون",
        description: "تدریس و پژوهش در حوزه مهندسی شیمی و فرآیندهای پیشرفته"
      }
    ],
    skills: [
      "فرآیندهای جداسازی",
      "مهندسی واکنش",
      "شبیه‌سازی فرآیندهای شیمیایی",
      "مدیریت تحقیق و توسعه",
      "مشاوره صنعتی"
    ],
    publications: [
      {
        title: "توسعه غشاهای پیشرفته برای جداسازی گازی",
        journal: "Journal of Membrane Science",
        year: "۱۴۰۰"
      },
      {
        title: "بهینه‌سازی راکتورهای شیمیایی با استفاده از CFD",
        journal: "Chemical Engineering Research and Design",
        year: "۱۳۹۹"
      }
    ],
    certifications: [
      "عضو انجمن مهندسین شیمی ایران",
      "داور مجلات بین‌المللی ISI",
      "مشاور صنایع پتروشیمی"
    ],
    contactEmail: "khajenoori@nanomehr.ir"
  },
  {
    id: "amini",
    name: "مهندس امینی",
    title: "نائب رئیس هیئت مدیره",
    image: "https://images.unsplash.com/photo-1687585612660-391377e16c91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JzY2hlJTIwOTExJTIwc3BvcnRzJTIwY2FyJTIwYmx1ZXxlbnwxfHx8fDE3NzExODQ2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    experience: "۱۰ سال تجربه در صنعت شیمی",
    bio: "مهندس امینی با سابقه درخشان در مدیریت مالی و توسعه کسب و کار در صنعت شیمیایی، به عنوان نائب رئیس هیئت مدیره شرکت نانومهر فعالیت می‌کند. ایشان با تجربه گسترده در زمینه سرمایه‌گذاری و بهینه‌سازی منابع مالی، نقش کلیدی در رشد و توسعه شرکت ایفا می‌کنند.",
    education: [
      {
        degree: "کارشناسی ارشد مدیریت کسب و کار MBA",
        university: "دانشگاه علامه طباطبایی",
        year: "۱۳۹۲"
      },
      {
        degree: "کارشناسی مهندسی صنایع",
        university: "دانشگاه صنعتی اصفهان",
        year: "۱۳۸۸"
      }
    ],
    workHistory: [
      {
        position: "نائب رئیس هیئت مدیره",
        company: "شرکت نانومهر",
        duration: "۱۴۰۰ - اکنون",
        description: "مدیریت امور مالی و سرمایه‌گذاری‌های استراتژیک شرکت"
      },
      {
        position: "مدیر توسعه کسب و کار",
        company: "گروه صنعتی فولاد مبارکه",
        duration: "۱۳۹۵ - ۱۴۰۰",
        description: "شناسایی فرصت‌های سرمایه‌گذاری و توسعه بازارهای جدید"
      }
    ],
    skills: [
      "مدیریت مالی",
      "برنامه‌ریزی استراتژیک",
      "تحلیل بازار",
      "مذاکرات تجاری",
      "مدیریت ریسک"
    ],
    certifications: [
      "CFA Level II",
      "مدیریت مالی پیشرفته",
      "مدیریت استراتژیک کسب و کار"
    ],
    contactEmail: "amini@nanomehr.ir"
  },
  {
    id: "shabani",
    name: "خانم دکتر شیما شعبانی",
    title: "دبیر",
    image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvمانJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxMTY3Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    experience: "۱۰ سال تجربه در صنعت شیمی",
    bio: "دکتر شیما شعبانی با تخصص در شیمی آلی و سنتز ترکیبات پیشرفته، به عنوان دبیر هیئت مدیره شرکت نانومهر مشغول به فعالیت است. ایشان در زمینه توسعه محصولات جدید و تحقیق و توسعه نقش مهمی در پیشرفت شرکت ایفا می‌کنند.",
    education: [
      {
        degree: "دکتری شیمی آلی",
        university: "دانشگاه تهران",
        year: "۱۳۹۴"
      },
      {
        degree: "کارشناسی ارشد شیمی آلی",
        university: "دانشگاه اصفهان",
        year: "۱۳۸۹"
      }
    ],
    workHistory: [
      {
        position: "دبیر هیئت مدیره",
        company: "شرکت نانومهر",
        duration: "۱۴۰۰ - اکنون",
        description: "هماهنگی جلسات و پیگیری تصمیمات هیئت مدیره"
      },
      {
        position: "مدیر تحقیق و توسعه",
        company: "شرکت داروسازی سبحان",
        duration: "۱۳۹۵ - ۱۴۰۰",
        description: "سرپرستی پروژه‌های تحقیقاتی و توسعه فرمولاسیون‌های جدید"
      }
    ],
    skills: [
      "شیمی آلی",
      "سنتز مواد",
      "تحقیق و توسعه",
      "کنترل کیفیت",
      "تحلیل طیفی"
    ],
    publications: [
      {
        title: "سنتز نانوذرات کاتالیزوری برای واکنش‌های آلی",
        journal: "Journal of Organic Chemistry",
        year: "۱۳۹۸"
      },
      {
        title: "توسعه روش‌های جدید برای سنتز ترکیبات دارویی",
        journal: "Organic Process Research & Development",
        year: "۱۳۹۷"
      }
    ],
    certifications: [
      "عضو انجمن شیمی ایران",
      "گواهینامه ISO 17025",
      "تحلیل‌گر طیف‌سنجی پیشرفته"
    ],
    contactEmail: "shabani@nanomehr.ir"
  }
];