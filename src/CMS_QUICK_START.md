# دسترسی سریع به CMS

## روش 1: از طریق URL

در مرورگر خود، به انتهای آدرس سایت `#cms` اضافه کنید:

```
https://your-site.com/#cms
```

یا از کنسول مرورگر:

```javascript
window.location.hash = 'cms';
```

## روش 2: ایجاد حساب ادمین

اگر هنوز حساب کاربری ندارید، از کنسول مرورگر (F12 > Console) این کد را اجرا کنید:

```javascript
// جایگزین کردن PROJECT_ID و ANON_KEY با مقادیر واقعی
const projectId = 'YOUR_PROJECT_ID';
const anonKey = 'YOUR_ANON_KEY';

fetch(`https://${projectId}.supabase.co/functions/v1/make-server-008a3150/auth/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${anonKey}`
  },
  body: JSON.stringify({
    email: 'admin@nanomehr.com',
    password: 'SecurePassword123!',
    name: 'Admin'
  })
}).then(res => res.json()).then(data => {
  console.log('✅ حساب کاربری ایجاد شد:', data);
  console.log('📧 ایمیل:', 'admin@nanomehr.com');
  console.log('🔑 رمز عبور:', 'SecurePassword123!');
});
```

## روش 3: مقداردهی اولیه محتوا

بعد از ورود به CMS، روی دکمه **"مقداردهی اولیه"** در سایدبار کلیک کنید تا تمام محتوای پیش‌فرض ایجاد شود.

## نکات:

- ✅ اطلاعات ورود را در جای امن نگهداری کنید
- ✅ بعد از اولین ورود، رمز عبور را تغییر دهید
- ✅ قبل از ویرایش، از محتوای فعلی backup بگیرید

---

**برای راهنمای کامل، فایل `CMS_GUIDE.md` را مطالعه کنید.**
