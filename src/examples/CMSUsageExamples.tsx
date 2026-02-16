// مثال استفاده از CMS Content در کامپوننت‌های سایت
// این فایل نمونه‌ای از نحوه استفاده از داده‌های CMS است

import { useCMSContent, useCMSSection } from '../hooks/useCMSContent';

// مثال 1: استفاده از تمام محتوای CMS
function ExampleWithAllContent() {
  const { content, loading, error } = useCMSContent();

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>خطا: {error}</div>;
  }

  return (
    <div>
      <h1>{content.hero?.title}</h1>
      <p>{content.hero?.subtitle}</p>
    </div>
  );
}

// مثال 2: استفاده از یک بخش خاص
function ExampleWithSection() {
  const { data: heroData, loading, error } = useCMSSection('hero');

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!heroData) {
    return <div>محتوای پیش‌فرض...</div>;
  }

  return (
    <div>
      <h1>{heroData.title}</h1>
      <p>{heroData.subtitle}</p>
      <p>{heroData.description}</p>
    </div>
  );
}

// مثال 3: استفاده در Hero Section
function HeroSectionWithCMS() {
  const { data: hero, loading } = useCMSSection('hero');

  // اگر محتوا در حال بارگذاری است یا موجود نیست، از مقادیر پیش‌فرض استفاده کن
  const title = hero?.title || 'نانومهر';
  const subtitle = hero?.subtitle || 'پیشرو در تولید مواد شیمیایی';
  const description = hero?.description || 'توضیحات پیش‌فرض';
  const backgroundImage = hero?.backgroundImage || '/default-bg.jpg';

  return (
    <section 
      className="hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{description}</p>
    </section>
  );
}

// مثال 4: استفاده برای خدمات
function ServicesWithCMS() {
  const { data: services, loading } = useCMSSection('services');

  if (loading) {
    return <div>در حال بارگذاری خدمات...</div>;
  }

  if (!services || !Array.isArray(services)) {
    return <div>خدماتی یافت نشد</div>;
  }

  return (
    <div className="services-grid">
      {services.map((service) => (
        <div key={service.id} className="service-card">
          <img src={service.image} alt={service.title} />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}

// مثال 5: استفاده برای آمار
function StatsWithCMS() {
  const { data: stats, loading } = useCMSSection('stats');

  if (!stats || !Array.isArray(stats)) {
    return null;
  }

  return (
    <div className="stats-section">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// مثال 6: استفاده با fallback
function ComponentWithFallback() {
  const { data: contact, loading, error } = useCMSSection('contact');

  // داده‌های پیش‌فرض در صورت عدم وجود CMS
  const defaultContact = {
    phone: '021-12345678',
    email: 'info@nanomehr.com',
    address: 'تهران، ایران'
  };

  const contactData = contact || defaultContact;

  return (
    <div>
      <p>تلفن: {contactData.phone}</p>
      <p>ایمیل: {contactData.email}</p>
      <p>آدرس: {contactData.address}</p>
    </div>
  );
}

export {
  ExampleWithAllContent,
  ExampleWithSection,
  HeroSectionWithCMS,
  ServicesWithCMS,
  StatsWithCMS,
  ComponentWithFallback
};
