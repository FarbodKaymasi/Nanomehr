import { Article } from '../components/ArticleDetail';

const imgArticleSolvent = "https://images.unsplash.com/photo-1684853807644-428f89ce35fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMGxhYm9yYXRvcnklMjBzb2x2ZW50JTIwYm90dGxlc3xlbnwxfHx8fDE3Njk2Mzc4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgArticleFertilizer = "https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmZXJ0aWxpemVyJTIwZmllbGQlMjBncmVlbnxlbnwxfHx8fDE3Njk2Mzc4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgArticlePaint = "https://images.unsplash.com/photo-1768796369926-2e25a1e4fc9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFpbnQlMjBjb2F0aW5ncyUyMGZhY3Rvcnl8ZW58MXx8fHwxNzY5NjI5MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgArticlePolymer = "https://images.unsplash.com/photo-1608163483020-537b04aed43b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBvbHltZXIlMjBwbGFzdGljJTIwcGVsbGV0c3xlbnwxfHx8fDE3Njk2Mzc4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgPolymer = "https://images.unsplash.com/photo-1722440814333-51292da1c59f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2x5bWVyJTIwcGxhc3RpYyUyMG1hdGVyaWFscyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY5NjI5MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export const ALL_ARTICLES: Article[] = [
  {
    id: 1,
    title: "حلال‌های صنعتی و کاربردهای آن",
    category: "مواد پایه",
    description: "خلوص بالای ۹۹٪ برای صنایع",
    image: imgArticleSolvent,
    date: "۱۵ دی ۱۴۰۴",
    author: "دکتر محسن یعقوبیان",
    authorTitle: "مدیرعامل و عضو هیئت مدیره",
    authorImage: "https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwZ2xhc3Nlc3xlbnwxfHx8fDE3NzExMDg4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `حلال‌های صنعتی یکی از مهم‌ترین مواد اولیه در صنایع شیمیایی هستند که نقش اساسی در فرآیندهای مختلف تولید دارند. این مواد به دلیل خواص منحصر به فردشان در انحلال، رقیق‌سازی و پاکسازی کاربردهای گسترده‌ای یافته‌اند.

## انواع حلال‌های صنعتی

حلال‌های صنعتی به دو دسته اصلی آلی و معدنی تقسیم می‌شوند. حلال‌های آلی شامل الکل‌ها، استون، تولوئن و زایلن هستند که در صنایع رنگ، چسب و دارو کاربرد دارند.

### کاربردها

1. صنعت رنگ و رزین: حلال‌ها در تولید رنگ‌های صنعتی برای کنترل ویسکوزیته و خشک شدن استفاده می‌شوند
2. صنعت چاپ: در تولید جوهرهای چاپ و رنگ‌های صنعتی
3. صنایع دارویی: در فرآیند استخراج و خالص‌سازی مواد دارویی
4. صنایع نفت و گاز: در پالایش و فرآوری محصولات نفتی

## استانداردهای کیفیت

حلال‌های صنعتی باید دارای خلوص بالای ۹۹٪ باشند و از استانداردهای بین‌المللی مانند ISO و ASTM پیروی کنند. کنترل کیفیت دقیق این مواد برای اطمینان از عملکرد مناسب در فرآیندهای صنعتی ضروری است.

### نکات ایمنی

استفاده از حلال‌های صنعتی نیازمند رعایت نکات ایمنی خاص است. این مواد معمولاً قابل اشتعال و در برخی موارد سمی هستند، بنابراین باید در محیط‌های با تهویه مناسب و با استفاده از تجهیزات حفاظت فردی مورد استفاده قرار گیرند.`
  },
  {
    id: 2,
    title: "کود NPK مرکب و نقش آن در کشاورزی",
    category: "کشاورزی",
    description: "افزایش بهره‌وری محصولات",
    image: imgArticleFertilizer,
    date: "۱۲ دی ۱۴۰۴",
    author: "مهندس امینی",
    authorTitle: "نائب رئیس هیئت مدیره",
    authorImage: "https://images.unsplash.com/photo-1747811853766-7a6612797dc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTE1MjM0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `کودهای NPK شامل عناصر ضروری نیتروژن، فسفر و پتاسیم هستند که برای رشد و نمو گیاهان الزامی می‌باشند. این کودهای مرکب یکی از پرکاربردترین کودهای شیمیایی در کشاورزی مدرن هستند.

## اجزای کود NPK

### نیتروژن (N)

نیتروژن برای رشد رویشی گیاه و تولید کلروفیل ضروری است. کمبود نیتروژن باعث زرد شدن برگ‌ها و کاهش رشد می‌شود.

### فسفر (P)

فسفر در فرآیندهای فتوسنتز، تولید انرژی و رشد ریشه نقش دارد. این عنصر برای گلدهی و میوه‌دهی گیاهان بسیار مهم است.

### پتاسیم (K)

پتاسیم در تنظیم فشار اسمزی سلول‌ها و مقاومت گیاه در برابر بیماری‌ها نقش دارد.

## مزایای استفاده از کود NPK

1. افزایش عملکرد محصول تا ۴۰٪
2. بهبود کیفیت محصولات کشاورزی
3. تقویت سیستم ریشه‌ای گیاه
4. افزایش مقاومت به بیماری‌ها و تنش‌های محیطی

## نحوه استفاده صحیح

میزان و زمان مصرف کود NPK باید بر اساس نوع خاک، محصول و شرایط آب و هوایی تعیین شود. آزمایش خاک قبل از کوددهی توصیه می‌شود.

### نکات کاربردی

استفاده بیش از حد از کود NPK می‌تواند به خاک و محیط زیست آسیب برساند. بنابراین رعایت دوز توصیه شده و زمان‌بندی مناسب کوددهی بسیار مهم است.`
  },
  {
    id: 3,
    title: "رنگ‌های اپوکسی صنعتی",
    category: "رنگ و پوشش",
    description: "مقاومت بالا در برابر خوردگی",
    image: imgArticlePaint,
    date: "۸ دی ۱۴۰۴",
    author: "دکتر مسعود خواجه‌نوری",
    authorTitle: "رئیس هیئت مدیره",
    authorImage: "https://images.unsplash.com/photo-1722938203650-99afb12419f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwYnVzaW5lc3NtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxMTU3NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `رنگ‌های اپوکسی به دلیل مقاومت عالی در برابر عوامل محیطی، شیمیایی و مکانیکی، کاربرد گسترده‌ای در صنایع مختلف دارند. این رنگ‌ها از واکنش رزین اپوکسی با سخت‌کننده تولید می‌شوند.

## ویژگی‌های رنگ‌های اپوکسی

### مقاومت شیمیایی

رنگ‌های اپوکسی در برابر اسیدها، بازها، حلال‌ها و مواد شیمیایی مختلف مقاومت بالایی دارند.

### مقاومت مکانیکی

چسبندگی عالی به سطوح فلزی و بتنی، مقاومت در برابر سایش و ضربه از ویژگی‌های بارز این رنگ‌هاست.

### مقاومت در برابر خوردگی

رنگ‌های اپوکسی یک لایه محافظ قوی در برابر خوردگی و زنگ‌زدگی ایجاد می‌کنند.

## کاربردها

1. صنایع نفت و گاز: پوشش مخازن، لوله‌ها و تجهیزات
2. صنایع دریایی: محا��ظت سازه‌های دریایی و کشتی‌ها
3. صنایع خودرو: رنگ‌آمیزی قطعات و بدنه خودرو
4. کف‌سازی صنعتی: پوشش کف کارخانه‌ها و انبارها

## انواع رنگ اپوکسی

اپوکسی دو جزئی معمولی، اپوکسی بدون حلال، اپوکسی پودری و اپوکسی ضد آب از انواع مختلف این رنگ‌ها هستند.

استفاده از رنگ‌های اپوکسی باکیفیت و اجرای صحیح آن، طول عمر پوشش را تا ۲۰ سال افزایش می‌دهد.`
  },
  {
    id: 4,
    title: "پلی اتیلن سنگین (HDPE)",
    category: "پلیمرها",
    description: "مناسب برای تولید لوله و پروفیل",
    image: imgArticlePolymer,
    date: "۵ دی ۱۴۰۴",
    author: "خانم دکتر شیما شعبانی",
    authorTitle: "دبیر",
    authorImage: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvمانJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxMTY3Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `پلی اتیلن سنگین (HDPE) یکی از پرکاربردترین پلیمرهای ترموپلاستیک در صنعت است که به دلیل نسبت قیمت به عملکرد عالی، در تولید محصولات مختلف استفاده می‌شود.

## ویژگی‌های HDPE

### مقاومت مکانیکی

پلی اتیلن سنگین دارای استحکام کششی و ضربه‌ای بالایی است که آن را برای کاربردهای سنگین مناسب می‌کند.

### مقاومت شیمیایی

HDPE در برابر اکثر اسیدها، بازها و حلال‌ها مقاوم است و در محیط‌های خورنده عملکرد خوبی دارد.

### ویژگی‌های الکتریکی

عایق الکتریکی عالی برای کاربردهای صنعت برق

## کاربردهای صنعتی

1. تولید لوله و اتصالات: لوله‌های آب، گاز و فاضلاب
2. صنعت بسته‌بندی: بطری، گالن و ظروف مواد شیمیایی
3. صنعت خودرو: قطعات داخلی و مخازن سوخت
4. ژئوممبرین: پوشش استخرها و مخازن ذخیره

## مزایای استفاده از HDPE

وزن سبک و حمل و نقل آسان، قابلیت بازیافت بالا، هزینه نسبتاً پایین، عمر طولانی تا ۵۰ سال و نصب آسان و سریع از مزایای این پلیمر است.

پلی اتیلن سنگین با دانسیته ۰.۹۴۱ تا ۰.۹۶۵ گرم بر سانتی‌متر مکعب تولید می‌شود.`
  },
  {
    id: 5,
    title: "کاربرد حلال‌ها در صنعت رنگ",
    category: "مواد پایه",
    description: "نقش کلیدی در تولید رنگ‌های صنعتی",
    image: imgArticleSolvent,
    date: "۳ دی ۱۴۰۴",
    author: "دکتر محسن یعقوبیان",
    authorTitle: "مدیرعامل و عضو هیئت مدیره",
    authorImage: "https://images.unsplash.com/photo-1758599543154-76ec1c4257df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwZ2xhc3Nlc3xlbnwxfHx8fDE3NzExMDg4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `حلال‌ها در صنعت رنگ نقش بسیار مهمی در کیفیت نهایی محصول دارند. این مواد در فرمولاسیون رنگ‌های مختلف برای کنترل ویسکوزیته، زمان خشک شدن و کیفیت پوشش استفاده می‌شوند.

## نقش حلال‌ها در فرمولاسیون رنگ

حلال‌ها به عنوان حامل رزین و رنگدانه‌ها عمل می‌کنند و خواص کاربردی رنگ را تعیین می‌کنند.

## انواع حلال‌های مورد استفاده

### حلال‌های آروماتیک

تولوئن و زایلن برای رنگ‌های صنعتی با خشک شدن سریع

### حلال‌های الیفاتیک

هگزان و هپتان برای رنگ‌های معمولی

### حلال‌های اکسیژن‌دار

استون و متیل اتیل کتون برای رنگ‌های خاص

## تأثیر حلال بر کیفیت رنگ

1. کنترل ویسکوزیته و قابلیت اجرا
2. تعیین سرعت خشک شدن
3. تأثیر بر براقیت و صافی سطح
4. کنترل میزان ترک‌خوردگی

## معیارهای انتخاب حلال مناسب

سازگاری با رزین، سرعت تبخیر مطلوب، قیمت مناسب و ملاحظات زیست‌محیطی از معیارهای مهم انتخاب حلال هستند.

استفاده از حلال‌های باکیفیت، کیفیت نهایی رنگ را تا ۳۰٪ بهبود می‌بخشد.`
  },
  {
    id: 6,
    title: "تکنولوژی تولید پلیمرها",
    category: "پلیمرها",
    description: "روش‌های نوین در تولید رزین‌های پلیمری",
    image: imgPolymer,
    date: "۲۸ آذر ۱۴۰۴",
    author: "مهندس امینی",
    authorTitle: "نائب رئیس هیئت مدیره",
    authorImage: "https://images.unsplash.com/photo-1747811853766-7a6612797dc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNزاW9uYWwlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTE1MjM0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `تکنولوژی‌های جدید در تولید پلیمرها باعث بهبود کیفیت، کاهش هزینه‌ها و کاهش اثرات زیست‌محیطی شده است. در این مقاله به بررسی روش‌های نوین تولید پلیمرها می‌پردازیم.

## روش‌های پلیمریزاسیون

### پلیمریزاسیون زنجیره‌ای

این روش برای تولید پلی‌اتیلن، پلی‌پروپیلن و پلی‌استایرن استفاده می‌شود.

### پلیمریزاسیون پلی‌کندانس

برای تولید پلی‌استرها، پلی‌آمیدها و رزین‌های اپوکسی

## کاتالیزورهای نوین

استفاده از کاتالیزورهای زیگلر-ناتا و متالوسن‌ها امکان کنترل دقیق ساختار پلیمر را فراهم کرده است.

## مزایای تکنولوژی‌های جدید

1. افزایش راندمان تولید تا ۵۰٪
2. کاهش مصرف انرژی
3. بهبود کیفیت محصول نهایی
4. کاهش ضایعات و آلودگی محیط زیست

## چالش‌ها و فرصت‌ها

صنعت پلیمر در ایران با چالش‌هایی مانند کمبود مواد اولیه و تکنولوژی روبروست، اما فرصت‌های رشد زیادی نیز دارد.

## آینده صنعت پلیمر

توسعه پلیمرهای زیست‌تخریب‌پذیر و پلیمرهای هوشمند از جمله روندهای آینده این صنعت است که می‌تواند تحولی بزرگ در صنعت ایجاد کند.`
  }
];