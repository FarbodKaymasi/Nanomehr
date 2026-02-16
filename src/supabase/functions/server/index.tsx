import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ============= Authentication Middleware =============
async function authenticateUser(authHeader: string | undefined) {
  console.log('=== Authentication Check ===');
  console.log('Auth header received:', authHeader ? `Bearer ${authHeader.substring(7, 20)}...` : 'No header');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Auth failed: No auth header or wrong format');
    return { authorized: false, userId: null, userRole: null };
  }
  
  const accessToken = authHeader.split(' ')[1];
  console.log('Access token length:', accessToken.length);
  
  // Use ANON_KEY client for verifying user tokens
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );
  
  try {
    const { data: { user }, error } = await supabaseClient.auth.getUser(accessToken);
    
    if (error) {
      console.log('Auth failed - Supabase error:', error.message);
      console.log('Error details:', JSON.stringify(error));
      return { authorized: false, userId: null, userRole: null };
    }
    
    if (!user) {
      console.log('Auth failed: No user found');
      return { authorized: false, userId: null, userRole: null };
    }
    
    const userRole = user.user_metadata?.role || 'author'; // Default to author
    console.log('Auth successful!');
    console.log('User email:', user.email);
    console.log('User ID:', user.id);
    console.log('User role:', userRole);
    console.log('===========================');
    
    return { authorized: true, userId: user.id, userRole, userEmail: user.email };
  } catch (err) {
    console.log('Auth failed - Exception:', err);
    return { authorized: false, userId: null, userRole: null };
  }
}

// Check if user is admin
function isAdmin(userRole: string | null): boolean {
  return userRole === 'admin';
}

// ============= Health Check =============
app.get("/make-server-008a3150/health", (c) => {
  return c.json({ status: "ok" });
});

// ============= AUTH ROUTES =============

// Create Admin User (one-time setup)
app.post("/make-server-008a3150/auth/create-admin", async (c) => {
  try {
    const body = await c.req.json();
    const { setupKey } = body;

    // Simple protection - you can change this key
    if (setupKey !== 'nanomehr-admin-setup-2026') {
      return c.json({ error: 'Invalid setup key' }, 403);
    }

    // Check if admin already exists
    const existingAdmin = await kv.get('admin:created');
    if (existingAdmin) {
      return c.json({ error: 'Admin user already exists. Use login instead.' }, 400);
    }

    // Create admin user
    const adminEmail = 'admin@nanomehr.com';
    const adminPassword = 'Admin@Nanomehr2026';
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      user_metadata: { 
        name: 'Admin',
        role: 'admin'
      },
      email_confirm: true
    });

    if (error) {
      console.log('Admin creation error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Mark admin as created
    await kv.set('admin:created', {
      email: adminEmail,
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true,
      message: 'Admin user created successfully',
      credentials: {
        email: adminEmail,
        password: adminPassword
      },
      user: data.user 
    });
  } catch (error) {
    console.log('Admin creation exception:', error);
    return c.json({ error: 'Internal server error during admin creation' }, 500);
  }
});

// Sign Up
app.post("/make-server-008a3150/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup exception:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Sign In
app.post("/make-server-008a3150/auth/signin", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: 'Missing email or password' }, 400);
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Signin error:', error);
      return c.json({ error: error.message }, 401);
    }

    return c.json({ 
      access_token: data.session?.access_token,
      user: data.user 
    });
  } catch (error) {
    console.log('Signin exception:', error);
    return c.json({ error: 'Internal server error during signin' }, 500);
  }
});

// Get Current User
app.get("/make-server-008a3150/auth/me", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userId } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  const accessToken = authHeader!.split(' ')[1];
  const { data: { user }, error } = await supabaseClient.auth.getUser(accessToken);

  if (error) {
    return c.json({ error: 'Failed to get user' }, 401);
  }

  return c.json({ user });
});

// ============= CMS CONTENT ROUTES =============

// Get all content (public)
app.get("/make-server-008a3150/cms/content", async (c) => {
  try {
    const contentKeys = [
      'cms:hero',
      'cms:stats',
      'cms:services',
      'cms:products',
      'cms:about',
      'cms:customers',
      'cms:contact',
      'cms:footer',
      'cms:settings'
    ];

    const contents = await kv.mget(contentKeys);
    
    const contentMap: Record<string, any> = {};
    contentKeys.forEach((key, index) => {
      const shortKey = key.replace('cms:', '');
      contentMap[shortKey] = contents[index] || null;
    });

    return c.json(contentMap);
  } catch (error) {
    console.log('Error fetching content:', error);
    return c.json({ error: 'Failed to fetch content' }, 500);
  }
});

// Get specific content section (public)
app.get("/make-server-008a3150/cms/content/:section", async (c) => {
  try {
    const section = c.req.param('section');
    const content = await kv.get(`cms:${section}`);
    
    if (!content) {
      return c.json({ error: 'Content not found' }, 404);
    }

    return c.json({ section, content });
  } catch (error) {
    console.log('Error fetching section content:', error);
    return c.json({ error: 'Failed to fetch section content' }, 500);
  }
});

// Update content section (protected)
app.put("/make-server-008a3150/cms/content/:section", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const section = c.req.param('section');
    const body = await c.req.json();

    await kv.set(`cms:${section}`, body.content);

    return c.json({ 
      success: true, 
      message: `Content section '${section}' updated successfully` 
    });
  } catch (error) {
    console.log('Error updating content:', error);
    return c.json({ error: 'Failed to update content' }, 500);
  }
});

// Initialize default content (protected)
app.post("/make-server-008a3150/cms/initialize", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const defaultContent = {
      'cms:hero': {
        title: 'نانومهر',
        subtitle: 'پیشرو در تولید و توزیع مواد شیمیایی صنعتی و راهکارهای نرم‌افزاری',
        description: 'با بیش از دو دهه تجربه در صنعت شیمی و فناوری، نانومهر ارائه‌دهنده محصولات و خدمات با کیفیت به صنایع مختلف است',
        backgroundImage: 'https://images.unsplash.com/photo-1768564206500-5cddb1fea679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMHBsYW50JTIwcmVmaW5lcnklMjBpbmR1c3RyeXxlbnwxfHx8fDE3Njk2MjkyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      'cms:stats': [
        { number: '2000+', label: 'مشتری فع' },
        { number: '500+', label: 'پروژه موفق' },
        { number: '15+', label: 'سال تجربه' },
        { number: '50+', label: 'کارشناس متخصص' }
      ],
      'cms:services': [
        {
          id: 'polymer',
          image: 'https://images.unsplash.com/photo-1722440814333-51292da1c59f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2x5bWVyJTIwcGxhc3RpYyUyMG1hdGVyaWFscyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY5NjI5MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'مواد پلیمری',
          number: '01',
          description: 'تولید و توزیع انواع پلیمرهای صنعتی شامل پلی‌اتیلن، پلی‌پروپیلن و رزین‌های تخصصی با بالاترین کیفیت'
        },
        {
          id: 'paint',
          image: 'https://images.unsplash.com/photo-1768796369926-2e25a1e4fc9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFpbnQlMjBjb2F0aW5ncyUyMGZhY3Rvcnl8ZW58MXx8fHwxNzY5NjI5MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'رنگ‌های صنعتی',
          number: '02',
          description: 'رنگ‌ا صنعتی، پوشش‌های محافظتی و رنگ‌های خودرویی با استانداردهای بین‌المللی'
        },
        {
          id: 'fertilizer',
          image: 'https://images.unsplash.com/photo-1557505482-fb5252df1d67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmZXJ0aWxpemVyJTIwY2hlbWljYWxzfGVufDF8fHx8MTc2OTYyOTI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'کود و سموم',
          number: '03',
          description: 'تولید کودهای شیمیایی، آفت‌کش‌ها و سموم کشاورزی برای افزایش بهره‌وری محصولات کشاورزی'
        },
        {
          id: 'software',
          image: 'https://images.unsplash.com/photo-1763568258533-d0597f86ce62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwaW5kdXN0cmlhbCUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTE4NDk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          title: 'نرم افزارهای مرتبط با صنعت',
          number: '04',
          description: 'طراحی و توسعه نرم افزارهای تخصصی مدریت تولید، کنترل کیفیت و اتوماسیون صنعتی'
        }
      ],
      'cms:products': {
        polymer: {
          title: 'مواد پلیمری',
          subtitle: 'تولید و توزیع انواع پلیمرهای صنعتی',
          heroImage: 'https://images.unsplash.com/photo-1722440814333-51292da1c59f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2x5bWVyJTIwcGxhc3RpYyUyMG1hdGVyaWFscyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY5NjI5MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          description: 'شرکت نانومهر با بهره‌گیری از جدیدترین تکنولوژی‌های روز دنیا، در زمینه تولید و توزیع انواع مواد پلیمری فعالیت می‌کند.',
          features: [
            'پلی‌اتیلن با چگالی بالا (HDPE)',
            'پلی‌اتیلن با چگالی پایین (LDPE)',
            'پلی‌پروپیلن (PP) گرید تزریقی و فیلم'
          ],
          applications: [
            'صنایع بسته‌بندی و فیلم',
            'تولید قطعات خودرو',
            'لوازم خانگی و الکترونیک'
          ],
          specifications: {
            'استانداردهای کیفی': 'ISO 9001:2015, ASTM',
            'بسته‌بندی': 'کیسه 25 کیلوگرمی',
            'مدت ماندگاری': '24 ماه از تاریخ تولید'
          }
        },
        paint: {
          title: 'رنگ‌های صنعتی',
          subtitle: 'پوشش‌های حرفه‌ای برای صنایع مختلف',
          heroImage: 'https://images.unsplash.com/photo-1768796369926-2e25a1e4fc9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFpbnQlMjBjb2F0aW5ncyUyMGZhY3Rvcnl8ZW58MXx8fHwxNzY5NjI5MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          description: 'رنگ‌های صنعتی نانومهر با فرمولاسیون پیشرفته و استفاده از مواد اولیه با کیفیت، دوام و مقاومت بالایی دارند.',
          features: [
            'رنگ‌های اپوکسی صنعتی',
            'رنگ‌های پلی‌اورتان دو جزئی',
            'پوشش‌های ضد خورندگی'
          ],
          applications: [
            'صنایع نفت، گاز و پتروشیمی',
            'صنایع خودروسازی',
            'سازه‌های فلزی و فولادی'
          ],
          specifications: {
            'استانداردهای کیفی': 'ISO 12944, SSPC',
            'بسته‌بندی': 'سطل 4-20 لیتری',
            'مدت ماندگاری': '12-18 ماه'
          }
        },
        fertilizer: {
          title: 'کود و سموم کشاورزی',
          subtitle: 'محصولات تخصصی برای افزایش بهره‌وری',
          heroImage: 'https://images.unsplash.com/photo-1557505482-fb5252df1d67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmZXJ0aWxpemVyJTIwY2hlbWljYWxzfGVufDF8fHx8MTc2OTYyOTI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          description: 'نانومهر با ارائه کودهای شیمیایی و سموم کشاورزی با کیفیت، در افزایش عملکرد محصولات کشاورزی نقش مهمی ایفا می‌کند.',
          features: [
            'کودهای ازته (اوره، نیترات آمونیوم)',
            'کودهای فسفاته (سوپرفسفات)',
            'آفت‌کش‌های حشره‌کش و قارچ‌کش'
          ],
          applications: [
            'کشاورزی و زراعت',
            'باغداری و نگهداری فضای سبز',
            'گلخانه‌های تولیدی'
          ],
          specifications: {
            'استانداردهای کیفی': 'FAO, EU Regulations',
            'بسته‌بندی': 'کیسه 25-50 کیلوگرمی',
            'مدت ماندگاری': '12-36 ماه'
          }
        },
        software: {
          title: 'نرم افزارهای مرتبط با صنعت',
          subtitle: 'راهکارهای نرم افزاری تخصصی',
          heroImage: 'https://images.unsplash.com/photo-1763568258533-d0597f86ce62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwaW5kdXN0cmlhbCUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTE4NDk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          description: 'نانومهر با ارائه نرم افزارهای تخصصی، به بهبود فرآیندهای تولید و مدیریت در صنایع شیمیایی کمک می‌کند.',
          features: [
            'نرم افزار مدییت تولید (ERP)',
            'سیستم کنترل کیفیت (LIMS)',
            'سیستم‌های اتوماسیون صنعتی (SCADA)'
          ],
          applications: [
            'کارخانجات شیمیایی و پتروشیمی',
            'واحدهای تولید پلیمر و رزین',
            'آزمایشگاه‌های کنترل کیفیت'
          ],
          specifications: {
            'استانداردهای کیفی': 'ISO 27001',
            'پلتفرم': 'Web-Based, Desktop, Mobile',
            'پشتیبانی': '24/7'
          }
        }
      },
      'cms:about': {
        title: 'درباره نانومهر',
        subtitle: 'پیشرو در صنعت شیمی و فناوری',
        description: 'شرکت نانومهر از سال 1385 فعالیت خود را در زمینه تولید و توزیع مواد شیمیایی صنعتی آغاز کرده است. ما با تکیه بر دانش فنی روز و بهره‌گیری از تجربه کارشناسان مجرب، توانسته‌ایم جایگاه ویژه‌ای در صنعت کشور کسب کنیم.',
        mission: 'ماموریت ما ارائه محصولات با کیفیت، خدمات مشتری‌مدار و نووری مستمر در صنعت شیمی و فناوری است.',
        vision: 'چشم‌انداز ما تبدیل شدن به یکی از پیشروترین تولیدکنندگان و توزیع‌کنندگان مواد شیمیایی در خاورمیانه است.',
        values: [
          'کیفیت بالا در محصولات',
          'نوآوری و تحقیق و توسعه',
          'مسئولیت‌پذیری اجتماعی',
          'رضایت مشتریان'
        ]
      },
      'cms:customers': [
        {
          name: 'پتروشیمی تبریز',
          logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nbyUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzY5NjUxMzQyfDA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral',
          industry: 'پتروشیمی'
        },
        {
          name: 'ایران خودرو',
          logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzY5NjUxMzQzfDA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral',
          industry: 'خودروسازی'
        },
        {
          name: 'صنایع رنگ‌سازی',
          logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNvbXBhbnklMjBsb2dvfGVufDF8fHx8MTc2OTY1MTM0NHww&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral',
          industry: 'رنگ‌سازی'
        }
      ],
      'cms:contact': {
        phone: '021-12345678',
        email: 'info@nanomehr.com',
        address: 'تهران، خیابان ولیعصر، پلاک 123',
        workingHours: 'شنبه تا پنجشنبه، 8 صبح تا 6 عصر',
        socialMedia: {
          instagram: 'nanomehr',
          telegram: 'nanomehr',
          linkedin: 'nanomehr'
        }
      },
      'cms:footer': {
        description: 'شرکت نانومهر، پیشرو در تولید و توزیع مواد شیمیایی صنعتی و راهکارهای نرم افزاری',
        copyright: '© 1403 شرکت نانومهر. تمامی حقوق محفوظ است.',
        links: {
          aboutUs: 'درباره ما',
          services: 'خدمات',
          products: 'محصولات',
          contact: 'تماس با ما'
        }
      },
      'cms:settings': {
        siteName: 'نانومهر',
        siteUrl: 'https://nanomehr.com',
        language: 'fa',
        direction: 'rtl'
      }
    };

    // Initialize all content
    for (const [key, value] of Object.entries(defaultContent)) {
      await kv.set(key, value);
    }

    return c.json({ 
      success: true, 
      message: 'Default content initialized successfully' 
    });
  } catch (error) {
    console.log('Error initializing content:', error);
    return c.json({ error: 'Failed to initialize content' }, 500);
  }
});

// ============= BLOG/NEWS ROUTES =============

// Get all blog posts
app.get("/make-server-008a3150/cms/blog", async (c) => {
  try {
    const posts = await kv.getByPrefix('blog:');
    return c.json({ posts });
  } catch (error) {
    console.log('Error fetching blog posts:', error);
    return c.json({ error: 'Failed to fetch blog posts' }, 500);
  }
});

// Get single blog post
app.get("/make-server-008a3150/cms/blog/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const post = await kv.get(`blog:${id}`);
    
    if (!post) {
      return c.json({ error: 'Blog post not found' }, 404);
    }

    return c.json({ post });
  } catch (error) {
    console.log('Error fetching blog post:', error);
    return c.json({ error: 'Failed to fetch blog post' }, 500);
  }
});

// Create blog post (protected)
app.post("/make-server-008a3150/cms/blog", async (c) => {
  const authHeader = c.req.header('Authorization');
  console.log('Create blog post - Auth header:', authHeader ? 'Present' : 'Missing');
  
  const { authorized } = await authenticateUser(authHeader);

  if (!authorized) {
    console.log('Create blog post - Unauthorized');
    return c.json({ error: 'Unauthorized - لطفاً دوباره وارد شوید' }, 401);
  }

  try {
    const body = await c.req.json();
    console.log('Create blog post - Body:', JSON.stringify(body));
    
    const postId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    const post = {
      id: postId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`blog:${postId}`, post);
    console.log('Create blog post - Success:', postId);

    return c.json({ success: true, post });
  } catch (error) {
    console.log('Error creating blog post:', error);
    return c.json({ error: `Failed to create blog post: ${error.message}` }, 500);
  }
});

// Update blog post (protected)
app.put("/make-server-008a3150/cms/blog/:id", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingPost = await kv.get(`blog:${id}`);
    if (!existingPost) {
      return c.json({ error: 'Blog post not found' }, 404);
    }

    const updatedPost = {
      ...existingPost,
      ...body,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`blog:${id}`, updatedPost);

    return c.json({ success: true, post: updatedPost });
  } catch (error) {
    console.log('Error updating blog post:', error);
    return c.json({ error: 'Failed to update blog post' }, 500);
  }
});

// Delete blog post (protected)
app.delete("/make-server-008a3150/cms/blog/:id", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const id = c.req.param('id');
    await kv.del(`blog:${id}`);

    return c.json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    console.log('Error deleting blog post:', error);
    return c.json({ error: 'Failed to delete blog post' }, 500);
  }
});

// ============= FILE UPLOAD ROUTES =============

// Initialize storage bucket
async function initializeStorageBucket() {
  const bucketName = 'make-008a3150-blog-images';
  
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
      });
      
      if (error) {
        console.log('Error creating bucket:', error);
      } else {
        console.log('Storage bucket created successfully');
      }
    }
  } catch (error) {
    console.log('Error initializing storage:', error);
  }
}

// Initialize bucket on startup
initializeStorageBucket();

// Upload image
app.post("/make-server-008a3150/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: 'File must be an image' }, 400);
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: 'File size must be less than 5MB' }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const bucketName = 'make-008a3150-blog-images';

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.log('Upload error:', error);
      return c.json({ error: 'Failed to upload file' }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return c.json({ success: true, url: publicUrl });
  } catch (error) {
    console.log('Error in upload endpoint:', error);
    return c.json({ error: 'Failed to upload file' }, 500);
  }
});

// ============= USER MANAGEMENT ROUTES (Admin Only) =============

// Get all users (Admin only)
app.get("/make-server-008a3150/users", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userRole } = await authenticateUser(authHeader);

  if (!authorized || !isAdmin(userRole)) {
    return c.json({ error: 'Unauthorized: Admin access required' }, 403);
  }

  try {
    // Get list of all users
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.log('Error listing users:', error);
      return c.json({ error: 'Failed to list users' }, 500);
    }

    // Map users to simplified format
    const users = data.users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name,
      role: user.user_metadata?.role || 'author',
      createdAt: user.created_at
    }));

    return c.json({ users });
  } catch (error) {
    console.log('Exception listing users:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create user (Admin only)
app.post("/make-server-008a3150/users", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userRole } = await authenticateUser(authHeader);

  if (!authorized || !isAdmin(userRole)) {
    return c.json({ error: 'Unauthorized: Admin access required' }, 403);
  }

  try {
    const body = await c.req.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name || !role) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    if (role !== 'admin' && role !== 'author') {
      return c.json({ error: 'Invalid role. Must be admin or author' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        role
      },
      email_confirm: true
    });

    if (error) {
      console.log('Error creating user:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true,
      message: 'User created successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role
      }
    });
  } catch (error) {
    console.log('Exception creating user:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update user (Admin only)
app.put("/make-server-008a3150/users/:userId", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userRole } = await authenticateUser(authHeader);

  if (!authorized || !isAdmin(userRole)) {
    return c.json({ error: 'Unauthorized: Admin access required' }, 403);
  }

  try {
    const userId = c.req.param('userId');
    const body = await c.req.json();
    const { name, role, email, password } = body;

    const updateData: any = {};
    
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    
    const metadata: any = {};
    if (name) metadata.name = name;
    if (role && (role === 'admin' || role === 'author')) {
      metadata.role = role;
    }
    
    if (Object.keys(metadata).length > 0) {
      updateData.user_metadata = metadata;
    }

    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      updateData
    );

    if (error) {
      console.log('Error updating user:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true,
      message: 'User updated successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role
      }
    });
  } catch (error) {
    console.log('Exception updating user:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete user (Admin only)
app.delete("/make-server-008a3150/users/:userId", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userRole } = await authenticateUser(authHeader);

  if (!authorized || !isAdmin(userRole)) {
    return c.json({ error: 'Unauthorized: Admin access required' }, 403);
  }

  try {
    const userId = c.req.param('userId');

    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.log('Error deleting user:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.log('Exception deleting user:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============= ARTICLE WORKFLOW ROUTES =============

// Get all articles with status filter
app.get("/make-server-008a3150/articles", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userId, userRole } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const status = c.req.query('status'); // draft, pending, published, rejected
    const articles = await kv.getByPrefix('article:');
    
    let filteredArticles = articles;

    // Authors can only see their own articles
    if (!isAdmin(userRole)) {
      filteredArticles = articles.filter((article: any) => article.authorId === userId);
    }

    // Filter by status if provided
    if (status) {
      filteredArticles = filteredArticles.filter((article: any) => article.status === status);
    }

    return c.json({ articles: filteredArticles });
  } catch (error) {
    console.log('Error fetching articles:', error);
    return c.json({ error: 'Failed to fetch articles' }, 500);
  }
});

// Create article (Authors and Admins)
app.post("/make-server-008a3150/articles", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userId, userRole, userEmail } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const body = await c.req.json();
    const articleId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    const article = {
      id: articleId,
      ...body,
      authorId: userId,
      authorEmail: userEmail,
      status: isAdmin(userRole) ? 'published' : 'draft', // Admin can publish directly
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: isAdmin(userRole) ? new Date().toISOString() : null
    };

    await kv.set(`article:${articleId}`, article);

    return c.json({ success: true, article });
  } catch (error) {
    console.log('Error creating article:', error);
    return c.json({ error: 'Failed to create article' }, 500);
  }
});

// Update article
app.put("/make-server-008a3150/articles/:id", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userId, userRole } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingArticle = await kv.get(`article:${id}`);
    if (!existingArticle) {
      return c.json({ error: 'Article not found' }, 404);
    }

    // Authors can only edit their own articles
    if (!isAdmin(userRole) && existingArticle.authorId !== userId) {
      return c.json({ error: 'Unauthorized: You can only edit your own articles' }, 403);
    }

    const updatedArticle = {
      ...existingArticle,
      ...body,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`article:${id}`, updatedArticle);

    return c.json({ success: true, article: updatedArticle });
  } catch (error) {
    console.log('Error updating article:', error);
    return c.json({ error: 'Failed to update article' }, 500);
  }
});

// Submit article for review (Authors)
app.post("/make-server-008a3150/articles/:id/submit", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userId, userRole } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const id = c.req.param('id');
    
    const existingArticle = await kv.get(`article:${id}`);
    if (!existingArticle) {
      return c.json({ error: 'Article not found' }, 404);
    }

    // Authors can only submit their own articles
    if (!isAdmin(userRole) && existingArticle.authorId !== userId) {
      return c.json({ error: 'Unauthorized: You can only submit your own articles' }, 403);
    }

    // Update status to pending
    const updatedArticle = {
      ...existingArticle,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`article:${id}`, updatedArticle);

    return c.json({ 
      success: true, 
      message: 'Article submitted for review',
      article: updatedArticle 
    });
  } catch (error) {
    console.log('Error submitting article:', error);
    return c.json({ error: 'Failed to submit article' }, 500);
  }
});

// Approve/Reject article (Admin only)
app.post("/make-server-008a3150/articles/:id/review", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userRole } = await authenticateUser(authHeader);

  if (!authorized || !isAdmin(userRole)) {
    return c.json({ error: 'Unauthorized: Admin access required' }, 403);
  }

  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { action, feedback } = body; // action: 'approve' or 'reject'
    
    const existingArticle = await kv.get(`article:${id}`);
    if (!existingArticle) {
      return c.json({ error: 'Article not found' }, 404);
    }

    const updatedArticle = {
      ...existingArticle,
      status: action === 'approve' ? 'published' : 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewFeedback: feedback || null,
      publishedAt: action === 'approve' ? new Date().toISOString() : existingArticle.publishedAt,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`article:${id}`, updatedArticle);

    return c.json({ 
      success: true, 
      message: action === 'approve' ? 'Article approved and published' : 'Article rejected',
      article: updatedArticle 
    });
  } catch (error) {
    console.log('Error reviewing article:', error);
    return c.json({ error: 'Failed to review article' }, 500);
  }
});

// Delete article
app.delete("/make-server-008a3150/articles/:id", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { authorized, userId, userRole } = await authenticateUser(authHeader);

  if (!authorized) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const id = c.req.param('id');
    
    const existingArticle = await kv.get(`article:${id}`);
    if (!existingArticle) {
      return c.json({ error: 'Article not found' }, 404);
    }

    // Authors can only delete their own articles, Admins can delete any
    if (!isAdmin(userRole) && existingArticle.authorId !== userId) {
      return c.json({ error: 'Unauthorized: You can only delete your own articles' }, 403);
    }

    await kv.del(`article:${id}`);

    return c.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    console.log('Error deleting article:', error);
    return c.json({ error: 'Failed to delete article' }, 500);
  }
});

Deno.serve(app.fetch);