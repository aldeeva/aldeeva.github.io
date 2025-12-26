# 🚀 دليل نشر موقع الديفا

## ✅ حالة المشروع

**الموقع جاهز 100% للنشر الدائم!**

### المميزات المكتملة:
- ✓ تصميم وردي احترافي
- ✓ 5 مقالات احترافية (السفر والجمال)
- ✓ لوحة تحكم كاملة لإدارة المقالات
- ✓ نظام تسجيل دخول آمن
- ✓ قاعدة بيانات SQLite3
- ✓ استجابة كاملة على جميع الأجهزة
- ✓ جاهز لربط Google AdSense

---

## 📋 بيانات الدخول الحالية

| البيان | القيمة |
|-------|--------|
| **رابط الموقع (محلي)** | http://localhost:3000 |
| **لوحة التحكم** | http://localhost:3000/admin/login |
| **اسم المستخدم** | admin |
| **كلمة المرور** | admin123 |

---

## 🌐 خطوات النشر على Railway

### الخطوة 1: إنشاء حساب Railway
1. انتقلي إلى https://railway.app
2. اضغطي على "Login"
3. اختاري "Continue with GitHub" أو "Continue with Email"

### الخطوة 2: إنشاء مشروع جديد
1. اضغطي على "New Project"
2. اختاري "Deploy from GitHub"
3. ربطي حسابك على GitHub

### الخطوة 3: رفع الملفات إلى GitHub
```bash
cd /home/ubuntu/al_diva_blog
git init
git config user.email "saranidal19@gmail.com"
git config user.name "Sara"
git add .
git commit -m "Initial commit - Al Diva Blog"
git remote add origin https://github.com/YOUR_USERNAME/al_diva_blog.git
git branch -M main
git push -u origin main
```

### الخطوة 4: نشر على Railway
1. في Railway، اختاري المستودع `al_diva_blog`
2. اضغطي على "Deploy"
3. انتظري 2-5 دقائق للنشر

### الخطوة 5: الحصول على رابط دائم
بعد النشر، ستحصلين على رابط دائم مثل:
```
https://al-diva-blog.railway.app
```

---

## 🔐 تغيير كلمة المرور (مهم!)

بعد النشر، غيّري كلمة المرور الافتراضية:

1. ادخلي لوحة التحكم: `/admin/login`
2. استخدمي: `admin` / `admin123`
3. غيّري كلمة المرور من إعدادات الحساب

---

## 📱 الصفحات المتاحة

| الصفحة | الرابط |
|--------|--------|
| الرئيسية | `/` |
| المدونة | `/blog` |
| المقالة | `/blog/:id` |
| من نحن | `/about` |
| اتصل بنا | `/contact` |
| لوحة التحكم | `/admin/login` |

---

## 🎨 إضافة مقالات جديدة

1. ادخلي لوحة التحكم
2. اضغطي على "إضافة مقالة جديدة"
3. أدخلي:
   - العنوان
   - الفئة (السفر / الجمال)
   - المحتوى
   - الملخص
4. اضغطي "حفظ"

---

## 💰 ربط Google AdSense

### المتطلبات:
- الموقع يجب أن يكون منشور بالفعل
- محتوى أصلي وعالي الجودة (✓ متوفر)
- سياسة الخصوصية واضحة
- الموقع يجب أن يكون نشط

### الخطوات:
1. انتقلي إلى https://www.google.com/adsense/start/
2. اضغطي "Sign Up Now"
3. أدخلي بيانات موقعك:
   - **اسم الموقع:** الديفا
   - **رابط الموقع:** https://al-diva-blog.railway.app
   - **الفئة:** السفر والجمال
   - **اللغة:** العربية
4. وافقي على الشروط
5. انتظري الموافقة (24-48 ساعة)

### بعد الموافقة:
1. احصلي على معرف AdSense: `ca-pub-xxxxxxxxxxxxxxxx`
2. استبدلي `ca-pub-xxxxxxxxxxxxxxxx` بمعرفك في:
   - `views/layout.ejs`
   - `views/index.ejs`
   - `views/blog.ejs`
   - `views/article.ejs`
3. رفعي التحديثات إلى GitHub
4. Railway سيقوم بـ Deploy تلقائياً

---

## 📊 الملفات المهمة

```
al_diva_blog/
├── server.js              # الخادم الرئيسي
├── package.json           # المكتبات
├── Dockerfile             # إعدادات Docker
├── Procfile              # إعدادات Railway
├── blog.db               # قاعدة البيانات
├── views/
│   ├── layout.ejs        # التخطيط الرئيسي
│   ├── index.ejs         # الصفحة الرئيسية
│   ├── blog.ejs          # صفحة المدونة
│   ├── article.ejs       # صفحة المقالة
│   └── admin/
│       ├── login.ejs     # تسجيل الدخول
│       └── dashboard.ejs # لوحة التحكم
└── public/
    ├── css/style.css     # الأنماط
    └── js/main.js        # السكريبتات
```

---

## 🆘 استكشاف الأخطاء

### الموقع لا يعمل:
- تحققي من أن الخادم يعمل: `ps aux | grep node`
- تحققي من السجل: `cat server.log`

### قاعدة البيانات لا تعمل:
- احذفي `blog.db`
- شغّلي `node seed-db.js`

### المقالات لا تظهر:
- تحققي من قاعدة البيانات: `sqlite3 blog.db "SELECT * FROM articles;"`

---

## 📞 الدعم والمساعدة

للمساعدة والدعم:
- Railway Support: https://railway.app/support
- Google AdSense Help: https://support.google.com/adsense

---

**تم إعداد الموقع بنجاح! 🎉**
