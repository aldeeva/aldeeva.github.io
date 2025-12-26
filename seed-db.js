const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'blog.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  console.log('Connected to database');
});

db.serialize(() => {
  // Create articles table
  db.run(`DROP TABLE IF EXISTS articles`);
  db.run(`
    CREATE TABLE articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      author TEXT DEFAULT 'الديفا',
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert sample articles
  const articles = [
    {
      title: 'أفضل الوجهات السياحية في دبي',
      category: 'السفر',
      excerpt: 'اكتشفي أفضل الأماكن السياحية في دبي والتي يجب عليك زيارتها',
      content: `<h2>أفضل الوجهات السياحية في دبي</h2><p>دبي تعتبر من أجمل المدن السياحية في العالم، وتتمتع بمزيج فريد من الحداثة والتراث.</p><h3>برج خليفة</h3><p>أطول برج في العالم يوفر إطلالات خيالية على المدينة بأكملها. يمكنك الصعود إلى أعلى البرج والاستمتاع بمنظر بانورامي رائع.</p><h3>نخلة جميرا</h3><p>جزيرة صناعية فريدة من نوعها تشتهر بفنادقها الفاخرة والشواطئ الرملية البيضاء.</p><h3>سوق دبي القديم</h3><p>مكان رائع للتسوق واستكشاف الثقافة الإماراتية التقليدية مع الاستمتاع بالعطور والتوابل.</p>`
    },
    {
      title: 'نصائح العناية بالبشرة الحساسة',
      category: 'الجمال',
      excerpt: 'تعلمي كيفية العناية الصحيحة ببشرتك الحساسة والحفاظ على صحتها',
      content: `<h2>نصائح العناية بالبشرة الحساسة</h2><p>البشرة الحساسة تحتاج إلى عناية خاصة واهتمام دقيق لتجنب التهيج والالتهابات.</p><h3>استخدمي منتجات لطيفة</h3><p>اختاري منتجات العناية التي تحتوي على مكونات طبيعية وخالية من المواد الكيميائية القاسية.</p><h3>تجنبي الماء الساخن</h3><p>استخدمي ماء فاتر أو بارد عند غسل وجهك، لأن الماء الساخن يزيد من جفاف البشرة.</p>`
    },
    {
      title: 'رحلة إلى باريس - مدينة الحب والفن',
      category: 'السفر',
      excerpt: 'دليل شامل لرحلة لا تنسى إلى باريس الجميلة',
      content: `<h2>رحلة إلى باريس - مدينة الحب والفن</h2><p>باريس تعتبر من أجمل العواصم الأوروبية وتجذب ملايين السياح سنوياً.</p><h3>برج إيفل</h3><p>الرمز الأيقوني لباريس، يمكنك الصعود إلى أعلاه للاستمتاع بإطلالة رائعة على المدينة.</p><h3>متحف اللوفر</h3><p>أكبر متحف فني في العالم يحتوي على آلاف الأعمال الفنية الشهيرة.</p>`
    },
    {
      title: 'أفضل منتجات العناية بالشعر الجاف',
      category: 'الجمال',
      excerpt: 'اكتشفي أفضل المنتجات للعناية بالشعر الجاف والتالف',
      content: `<h2>أفضل منتجات العناية بالشعر الجاف</h2><p>الشعر الجاف يحتاج إلى ترطيب مكثف وعناية خاصة للحفاظ على صحته وجماله.</p><h3>الزيوت الطبيعية</h3><p>زيت الأرجان وزيت جوز الهند من أفضل الزيوت الطبيعية للشعر الجاف.</p>`
    },
    {
      title: 'استكشاف جزر المالديف - الجنة على الأرض',
      category: 'السفر',
      excerpt: 'دليل سفر شامل لاستكشاف جمال جزر المالديف',
      content: `<h2>استكشاف جزر المالديف - الجنة على الأرض</h2><p>جزر المالديف تعتبر من أجمل الوجهات السياحية في العالم بشواطئها البيضاء والمياه الزرقاء الصافية.</p><h3>الأنشطة المائية</h3><p>الغوص والسباحة وركوب الزوارق من أشهر الأنشطة المائية في المالديف.</p>`
    }
  ];

  articles.forEach(article => {
    db.run(
      `INSERT INTO articles (title, category, content, excerpt, author) VALUES (?, ?, ?, ?, ?)`,
      [article.title, article.category, article.content, article.excerpt, 'الديفا'],
      function(err) {
        if (err) {
          console.error('Error inserting article:', err);
        } else {
          console.log(`✓ تم إضافة: ${article.title}`);
        }
      }
    );
  });

  // Create users table
  db.run(`DROP TABLE IF EXISTS users`);
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  setTimeout(() => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('\n✓ تم إعداد قاعدة البيانات بنجاح!');
      }
    });
  }, 1500);
});
