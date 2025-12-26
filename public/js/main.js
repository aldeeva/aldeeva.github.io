// ============================================
// الديفا - مدونة السفر والجمال
// ملف JavaScript الرئيسي
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل الروابط النشطة
    activateNavLinks();
    
    // معالج نموذج النشرة البريدية
    setupNewsletterForm();
    
    // معالج نموذج التواصل
    setupContactForm();
    
    // تأثيرات التمرير
    setupScrollEffects();
});

// ============================================
// تفعيل الروابط النشطة
// ============================================

function activateNavLinks() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = 'var(--primary-color)';
        }
    });
}

// ============================================
// معالج نموذج النشرة البريدية
// ============================================

function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // محاكاة إرسال البيانات
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = 'جاري الإرسال...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = 'تم الاشتراك بنجاح!';
                    button.style.backgroundColor = '#27ae60';
                    
                    this.reset();
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.backgroundColor = '';
                    }, 3000);
                }, 1000);
            } else {
                alert('الرجاء إدخال بريد إلكتروني صحيح');
            }
        });
    }
}

// ============================================
// معالج نموذج التواصل
// ============================================

function setupContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            if (name && validateEmail(email) && message) {
                // محاكاة إرسال البيانات
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = 'جاري الإرسال...';
                button.disabled = true;
                
                setTimeout(() => {
                    // هنا يمكن إضافة طلب AJAX فعلي
                    console.log('تم إرسال الرسالة:', { name, email, message });
                    
                    alert('شكراً لك! تم استقبال رسالتك بنجاح.');
                    this.reset();
                    
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1000);
            } else {
                alert('الرجاء ملء جميع الحقول بشكل صحيح');
            }
        });
    }
}

// ============================================
// التحقق من صحة البريد الإلكتروني
// ============================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// تأثيرات التمرير
// ============================================

function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // تطبيق التأثير على بطاقات المقالات
    document.querySelectorAll('.article-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ============================================
// دالة مساعدة لتسجيل الأخطاء
// ============================================

function logError(error) {
    console.error('خطأ:', error);
}

// ============================================
// معالج الأخطاء العام
// ============================================

window.addEventListener('error', function(event) {
    logError(event.error);
});
