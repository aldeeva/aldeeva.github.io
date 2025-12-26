const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();

// إعدادات التطبيق
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// إعدادات الجلسات
app.use(session({
    secret: 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// إعداد قاعدة البيانات
const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.error('خطأ في الاتصال بقاعدة البيانات:', err);
    } else {
        console.log('✓ تم الاتصال بقاعدة البيانات بنجاح');
        initializeDatabase();
    }
});

// تهيئة قاعدة البيانات
function initializeDatabase() {
    // جدول المستخدمين
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // جدول المقالات
    db.run(`
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            excerpt TEXT NOT NULL,
            content TEXT NOT NULL,
            image TEXT,
            author TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // إضافة مستخدم افتراضي إذا لم يكن موجوداً
    const defaultPassword = bcrypt.hashSync('admin123', 10);
    db.run(`
        INSERT OR IGNORE INTO users (username, password, email) 
        VALUES ('admin', ?, 'admin@aldiva.com')
    `, [defaultPassword]);

        // إضافة مقالات افتراضية
        db.run(`
            INSERT OR IGNORE INTO articles (title, category, excerpt, content, image, author) 
            VALUES 
            (
                'أفضل وجهات السفر في الشرق الأوسط',
                'السفر',
                'اكتشفي أجمل الوجهات السياحية في منطقة الشرق الأوسط...',
                'محتوى المقالة الكاملة هنا...',
                '/images/travel-1.jpg',
                'الديفا'
            ),
            (
                'نصائح العناية بالبشرة في الصيف',
                'الجمال',
                'تعرفي على أفضل الطرق للعناية بالبشرة خلال فصل الصيف...',
                'محتوى المقالة الكاملة هنا...',
                '/images/beauty-1.jpg',
                'الديفا'
            ),
            (
                'دليل السفر إلى دبي',
                'السفر',
                'كل ما تحتاجين معرفته قبل السفر إلى دبي...',
                'محتوى المقالة الكاملة هنا...',
                '/images/travel-2.jpg',
                'الديفا'
            )
        `);
    });
}

// دالة التحقق من تسجيل الدخول
function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

// ============================================
// الصفحات العامة
// ============================================

// الصفحة الرئيسية
app.get('/', (req, res) => {
    db.all('SELECT * FROM articles ORDER BY created_at DESC LIMIT 3', (err, articles) => {
        if (err) {
            console.error(err);
            articles = [];
        }
        res.render('index', { articles: articles || [] });
    });
});

// صفحة المدونة
app.get('/blog', (req, res) => {
    const category = req.query.category;
    let query = 'SELECT * FROM articles ORDER BY created_at DESC';
    let params = [];

    if (category) {
        query = 'SELECT * FROM articles WHERE category = ? ORDER BY created_at DESC';
        params = [category];
    }

    db.all(query, params, (err, articles) => {
        if (err) {
            console.error(err);
            articles = [];
        }
        res.render('blog', { articles: articles || [], selectedCategory: category });
    });
});

// صفحة المقالة الواحدة
app.get('/blog/:id', (req, res) => {
    db.get('SELECT * FROM articles WHERE id = ?', [req.params.id], (err, article) => {
        if (err || !article) {
            return res.status(404).render('404');
        }
        res.render('article', { article });
    });
});

// صفحة من نحن
app.get('/about', (req, res) => {
    res.render('about');
});

// صفحة اتصل بنا
app.get('/contact', (req, res) => {
    res.render('contact');
});

// معالج النموذج
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('رسالة جديدة:', { name, email, message });
    res.render('contact-success');
});

// ============================================
// صفحات الإدارة
// ============================================

// صفحة تسجيل الدخول
app.get('/admin/login', (req, res) => {
    res.render('admin/login');
});

// معالج تسجيل الدخول
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err || !user) {
            return res.render('admin/login', { error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
        }

        if (bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;
            req.session.username = user.username;
            res.redirect('/admin/dashboard');
        } else {
            res.render('admin/login', { error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
        }
    });
});

// تسجيل الخروج
app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// لوحة التحكم
app.get('/admin/dashboard', isLoggedIn, (req, res) => {
    db.all('SELECT * FROM articles ORDER BY created_at DESC', (err, articles) => {
        if (err) {
            console.error(err);
            articles = [];
        }
        res.render('admin/dashboard', { 
            articles: articles || [],
            username: req.session.username 
        });
    });
});

// صفحة إضافة مقالة
app.get('/admin/articles/new', isLoggedIn, (req, res) => {
    res.render('admin/article-form', { article: null, username: req.session.username });
});

// معالج إضافة مقالة
app.post('/admin/articles', isLoggedIn, (req, res) => {
    const { title, category, excerpt, content, image } = req.body;

    db.run(
        'INSERT INTO articles (title, category, excerpt, content, image, author) VALUES (?, ?, ?, ?, ?, ?)',
        [title, category, excerpt, content, image || '/images/default.jpg', req.session.username],
        function(err) {
            if (err) {
                console.error(err);
                return res.render('admin/article-form', { 
                    article: null, 
                    error: 'حدث خطأ أثناء إضافة المقالة',
                    username: req.session.username 
                });
            }
            res.redirect('/admin/dashboard');
        }
    );
});

// صفحة تعديل مقالة
app.get('/admin/articles/:id/edit', isLoggedIn, (req, res) => {
    db.get('SELECT * FROM articles WHERE id = ?', [req.params.id], (err, article) => {
        if (err || !article) {
            return res.status(404).render('404');
        }
        res.render('admin/article-form', { article, username: req.session.username });
    });
});

// معالج تعديل مقالة
app.post('/admin/articles/:id', isLoggedIn, (req, res) => {
    const { title, category, excerpt, content, image } = req.body;

    db.run(
        'UPDATE articles SET title = ?, category = ?, excerpt = ?, content = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title, category, excerpt, content, image || '/images/default.jpg', req.params.id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'حدث خطأ' });
            }
            res.redirect('/admin/dashboard');
        }
    );
});

// حذف مقالة
app.post('/admin/articles/:id/delete', isLoggedIn, (req, res) => {
    db.run('DELETE FROM articles WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'حدث خطأ' });
        }
        res.redirect('/admin/dashboard');
    });
});

// بدء الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✓ الخادم يعمل على http://localhost:${PORT}`);
    console.log(`✓ لوحة التحكم: http://localhost:${PORT}/admin/login`);
    console.log(`✓ اسم المستخدم: admin`);
    console.log(`✓ كلمة المرور: admin123`);
});

// معالج الأخطاء 404
app.use((req, res) => {
    res.status(404).render('404');
});
