document.addEventListener('DOMContentLoaded', function() {
    // Default language
    let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    
    // Apply the saved language on page load
    applyLanguage(currentLanguage);
    
    // Set up event listeners for language switching
    const languageItems = document.querySelectorAll('[data-language]');
    languageItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-language');
            
            // Save the language preference
            localStorage.setItem('preferredLanguage', lang);
            
            // Apply the selected language
            applyLanguage(lang);
            
            // Update active state in dropdown
            updateActiveLanguage(lang);
        });
    });
    
    // Update active language in dropdown on page load
    updateActiveLanguage(currentLanguage);
    
    // Function to apply the selected language
    function applyLanguage(lang) {
        // Set the HTML dir attribute for RTL languages
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
            loadTranslations(lang);
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = 'en';
            loadTranslations(lang);
        }
    }
    
    // Function to update active state in dropdown
    function updateActiveLanguage(lang) {
        const languageItems = document.querySelectorAll('[data-language]');
        languageItems.forEach(item => {
            if (item.getAttribute('data-language') === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Function to load translations
    function loadTranslations(lang) {
        if (lang === 'ar') {
            translateToArabic();
        } else {
            // If it's English, we can just reload the page to get the default content
            if (document.documentElement.lang !== 'en') {
                location.reload();
            }
        }
    }
    
    // Function with Arabic translations
    function translateToArabic() {
        const translations = {
            // Navigation
            'Home': 'الرئيسية',
            'About': 'من نحن',
            'Services': 'خدماتنا',
            'Contact': 'اتصل بنا',
            'Language': 'اللغة',
            'Sign In': 'تسجيل الدخول',
            
            // Home page
            'Streamline Your Shipping Operations with Circle Code': 'تبسيط عمليات الشحن مع Circle Code',
            'Join thousands of sellers who have revolutionized their delivery experience. Fast, reliable, and cost-effective shipping solutions designed for businesses like yours.': 'انضم إلى آلاف البائعين الذين غيروا تجربة التوصيل الخاصة بهم. حلول شحن سريعة وموثوقة وفعالة من حيث التكلفة مصممة للشركات مثل شركتك.',
            'Get Started': 'ابدأ الآن',
            'Contact Sales': 'اتصل بالمبيعات',
            'Why Choose Circle Code Shipping?': 'لماذا تختار فالكون للشحن؟',
            'We offer comprehensive shipping solutions to help your business thrive': 'نقدم حلول شحن شاملة لمساعدة عملك على الازدهار',
            'Fast Delivery': 'توصيل سريع',
            'Same-day and next-day delivery options to keep your customers satisfied': 'خيارات التوصيل في نفس اليوم واليوم التالي للحفاظ على رضا عملائك',
            'Real-time Tracking': 'تتبع في الوقت الحقيقي',
            'Monitor your shipments at every step with our advanced tracking system': 'راقب شحناتك في كل خطوة مع نظام التتبع المتقدم لدينا',
            'Competitive Pricing': 'أسعار تنافسية',
            'Affordable shipping rates with special discounts for regular sellers': 'أسعار شحن معقولة مع خصومات خاصة للبائعين المنتظمين',
            
            // Common sections
            'What Our Sellers Say': 'ماذا يقول بائعونا',
            'Join thousands of satisfied clients who trust Circle Code with their shipping needs': 'انضم إلى آلاف العملاء الراضين الذين يثقون بفالكون لتلبية احتياجات الشحن الخاصة بهم',
            'Ready to revolutionize your shipping operations?': 'هل أنت مستعد لإحداث ثورة في عمليات الشحن الخاصة بك؟',
            'Join Circle Code today and experience streamlined logistics and satisfied customers.': 'انضم إلى فالكون اليوم واختبر الخدمات اللوجستية المبسطة والعملاء الراضين.',
            'Sign Up Now': 'سجل الآن',
            
            // Footer
            'The most reliable shipping solution for online sellers. Fast, secure, and cost-effective.': 'الحل الأكثر موثوقية للشحن للبائعين عبر الإنترنت. سريع وآمن وفعال من حيث التكلفة.',
            'Quick Links': 'روابط سريعة',
            'Services': 'الخدمات',
            'Domestic Shipping': 'الشحن المحلي',
            'International Shipping': 'الشحن الدولي',
            'Express Delivery': 'التوصيل السريع',
            'Warehousing': 'التخزين',
            'Contact Info': 'معلومات الاتصال',
            'Mon-Fri: 9AM - 5PM': 'الاثنين-الجمعة: 9 صباحًا - 5 مساءً',
            'All rights reserved.': 'جميع الحقوق محفوظة.',
            'Privacy Policy': 'سياسة الخصوصية',
            'Terms of Service': 'شروط الخدمة',
            
            // About page
            'About Us': 'من نحن',
            'Learn about our journey, mission, and the team behind Circle Code Shipping': 'تعرف على رحلتنا ومهمتنا والفريق وراء فالكون للشحن',
            'Our Story': 'قصتنا',
            'Our Mission': 'مهمتنا',
            'Our Vision': 'رؤيتنا',
            'Our Values': 'قيمنا',
            'Meet Our Team': 'تعرف على فريقنا',
            'The passionate professionals behind Circle Code Shipping': 'المحترفون المتحمسون وراء فالكون للشحن',
            
            // Services page
            'Our Services': 'خدماتنا',
            'Discover how Circle Code Shipping can transform your logistics operations': 'اكتشف كيف يمكن لفالكون للشحن تحويل عملياتك اللوجستية',
            'Comprehensive Shipping Solutions': 'حلول شحن شاملة',
            'Tailored to meet the diverse needs of modern e-commerce businesses': 'مصممة لتلبية الاحتياجات المتنوعة للشركات التجارية الإلكترونية الحديثة',
            
            // Contact page
            'Contact Us': 'اتصل بنا',
            'We\'re here to answer your questions and help you get started': 'نحن هنا للإجابة على أسئلتك ومساعدتك على البدء',
            'Visit Our Office': 'زيارة مكتبنا',
            'Call Us': 'اتصل بنا',
            'Email Us': 'راسلنا عبر البريد الإلكتروني',
            'Get In Touch': 'تواصل معنا',
            'Submit Message': 'إرسال الرسالة'
        };
        
        // Translate all elements with text content
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, span, label, li, option').forEach(el => {
            const originalText = el.textContent.trim();
            if (translations[originalText]) {
                el.textContent = translations[originalText];
            }
        });
        
        // Translate placeholders
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
            const originalPlaceholder = el.getAttribute('placeholder');
            if (translations[originalPlaceholder]) {
                el.setAttribute('placeholder', translations[originalPlaceholder]);
            }
        });
        
        // Add RTL-specific CSS
        addRtlStyles();
    }
    
    // Function to add RTL-specific styles
    function addRtlStyles() {
        const rtlStyles = `
            .navbar-nav {
                padding-right: 10px;
            }
            .dropdown-menu {
                text-align: right;
            }
            .footer-links, .footer-contact {
                padding-right: 0;
            }
            .testimonial-author, .contact-info-item {
                flex-direction: row-reverse;
            }
            .testimonial-avatar {
                margin-right: 0;
                margin-left: 1rem;
            }
            .service-icon {
                margin-right: 0;
                margin-left: 2rem;
            }
            .contact-info-icon {
                margin-right: 0;
                margin-left: 1.5rem;
            }
        `;
        
        // Check if RTL style element already exists
        let rtlStyleElement = document.getElementById('rtl-styles');
        if (!rtlStyleElement) {
            rtlStyleElement = document.createElement('style');
            rtlStyleElement.id = 'rtl-styles';
            document.head.appendChild(rtlStyleElement);
        }
        
        rtlStyleElement.textContent = rtlStyles;
    }
}); 
