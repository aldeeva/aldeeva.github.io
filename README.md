# 🎀 الديفا - مدونة السفر والجمال

موقع احترافي متخصص في السفر والجمال مع لوحة تحكم كاملة وربط Google AdSense.

## ✨ المميزات

- 🎨 تصميم وردي احترافي جميل
- 📱 موقع متجاوب على جميع الأجهزة
- 📝 لوحة تحكم كاملة لإدارة المقالات
- 🔐 نظام تسجيل دخول آمن
- 📊 إعلانات Google AdSense
- 💾 قاعدة بيانات SQLite

## 🚀 البدء السريع

### المتطلبات
- Node.js 22+
- npm أو yarn

### التثبيت
```bash
npm install
```

### تشغيل الخادم
```bash
npm start
```

الموقع سيكون متاحاً على: `http://localhost:3000`

## 📋 بيانات الدخول

**لوحة التحكم:**
- الرابط: `http://localhost:3000/admin/login`
- اسم المستخدم: `admin`
- كلمة المرور: `admin123`

## 📄 الصفحات

- `/` - الصفحة الرئيسية
- `/blog` - المدونة
- `/blog/:id` - المقالة الواحدة
- `/about` - من نحن
- `/contact` - اتصل بنا
- `/admin/login` - تسجيل دخول لوحة التحكم
- `/admin/dashboard` - لوحة التحكم

## 🔧 التكوين

### إضافة معرف Google AdSense

استبدلي `ca-pub-1234567890123456` بمعرفك الفعلي في جميع الملفات:

```bash
grep -r "ca-pub-1234567890123456" . --include="*.ejs"
```

ثم استبدلي بـ:
```bash
sed -i 's/ca-pub-1234567890123456/ca-pub-YOUR_ID/g' views/*.ejs
```

## 📦 النشر على Railway

1. انتقلي إلى https://railway.app
2. اختاري "Deploy from GitHub"
3. اختاري المستودع
4. Railway ستقوم بـ Deploy تلقائياً

## 📝 الملفات المهمة

- `server.js` - الخادم الرئيسي
- `views/` - ملفات HTML
- `public/css/style.css` - الأنماط
- `public/js/main.js` - JavaScript
- `Dockerfile` - للنشر على Docker
- `railway.json` - إعدادات Railway

## 📧 Google AdSense

البريد: `saranidal19@gmail.com`
الدولة: الأردن
الموقع: `manus-asia.computer`

## 📞 الدعم

للمزيد من المعلومات، تفضلي بزيارة:
- Google AdSense Help: https://support.google.com/adsense
- Railway Docs: https://docs.railway.app

---

**تم إنشاء الموقع بـ ❤️**
