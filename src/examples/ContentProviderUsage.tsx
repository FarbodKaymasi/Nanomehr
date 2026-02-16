// این فایل برای راهنمایی نحوه استفاده از ContentProvider است
// شما می‌توانید از این الگوها در کامپوننت‌های خود استفاده کنید

import { useContent } from './ContentProvider';

// مثال ۱: استفاده در Hero Section  
export function HeroExample() {
  const { content, loading } = useContent();
  const hero = content.hero || {};

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <section>
      <h1>{hero.title || 'نانومهر'}</h1>
      <p>{hero.subtitle || 'پیشرو در صنعت شیمی'}</p>
      <p>{hero.description}</p>
    </section>
  );
}

// مثال ۲: استفاده برای نمایش آمار
export function StatsExample() {
  const { content } = useContent();
  const stats = content.stats || [];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat: any, index: number) => (
        <div key={index}>
          <div className="text-4xl font-bold">{stat.number}</div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// مثال ۳: استفاده برای نمایش خدمات
export function ServicesExample() {
  const { content } = useContent();
  const services = content.services || [];

  return (
    <div className="grid grid-cols-4 gap-6">
      {services.map((service: any) => (
        <div key={service.id} className="bg-white rounded-lg p-6">
          <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
}

// مثال ۴: استفاده برای Footer
export function FooterExample() {
  const { content } = useContent();
  const footer = content.footer || {};
  const contact = content.contact || {};

  return (
    <footer>
      <p>{footer.description}</p>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <p>{footer.copyright}</p>
    </footer>
  );
}

// مثال ۵: بروزرسانی محتوا بعد از تغییرات در CMS
export function RefreshExample() {
  const { refreshContent } = useContent();

  const handleRefresh = async () => {
    await refreshContent();
    alert('محتوا بروزرسانی شد!');
  };

  return (
    <button onClick={handleRefresh}>
      بروزرسانی محتوا
    </button>
  );
}
