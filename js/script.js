document.addEventListener('DOMContentLoaded', () => {


    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            if (heroSection) {
                navbar.classList.remove('sticky');
            }
        }
    });

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }


    const testimonialSlider = id => {
        const slider = document.getElementById(id);
        if (!slider) return;

        const items = slider.querySelectorAll('.testimonial-item');
        const dots = slider.querySelectorAll('.dot');
        let currentIndex = 0;

        const showSlide = (index) => {
            items.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            items[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });


        setInterval(() => {
            let nextIndex = (currentIndex + 1) % items.length;
            showSlide(nextIndex);
        }, 5000);
    };

    testimonialSlider('testimonialSlider');


    const revealItems = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });

        revealItems.forEach(item => {
            observer.observe(item);
        });
    };

    revealOnScroll();


    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark' && icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (newTheme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }


    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    const translations = {
        'en': {
            'home': 'Home',
            'services': 'Services',
            'contact': 'Contact',
            'book_now': 'Book Now',
            'lang': 'العربية',
            'team_subtitle': 'Our Experts',
            'team_title': 'Meet Our Experts',
            'expert_1_role': 'Skin Care Specialist',
            'expert_2_role': 'Hair Stylist',
            'expert_3_role': 'Makeup Artist',
            'faq_subtitle': 'Common Questions',
            'faq_title': 'Frequently Asked Questions',
            'faq_q1': 'Do I need to book an appointment?',
            'faq_a1': 'Yes, we recommend booking in advance to ensure availability, especially on weekends.',
            'faq_q2': 'What are your opening hours?',
            'faq_a2': 'We are open Monday to Friday from 9 AM to 8 PM, and Saturdays from 10 AM to 6 PM.',
            'faq_q3': 'Do you offer home services?',
            'faq_a3': 'Currently, we only provide services at our beauty center in Gaza.'
        },
        'ar': {
            'home': 'الرئيسية',
            'services': 'خدماتنا',
            'contact': 'اتصل بنا',
            'book_now': 'احجز الآن',
            'lang': 'English',
            'team_subtitle': 'خبراؤنا',
            'team_title': 'تعرف على خبيراتنا',
            'expert_1_role': 'أخصائية عناية بالبشرة',
            'expert_2_role': 'مصففة شعر',
            'expert_3_role': 'خبيرة مكياج',
            'faq_subtitle': 'أسئلة شائعة',
            'faq_title': 'الأسئلة الأكثر تداولاً',
            'faq_q1': 'هل أحتاج إلى حجز موعد مسبق؟',
            'faq_a1': 'نعم، ننصح بالحجز المسبق لضمان التوفر، خاصة في عطلات نهاية الأسبوع.',
            'faq_q2': 'ما هي ساعات العمل لديكم؟',
            'faq_a2': 'نحن نفتح من الاثنين إلى الجمعة من 9 صباحاً حتى 8 مساءً، والسبت من 10 صباحاً حتى 6 مساءً.',
            'faq_q3': 'هل تقدمون خدمات منزلية؟',
            'faq_a3': 'حالياً، نقدم خدماتنا فقط داخل مركز التجميل الخاص بنا في غزة.'
        }
    };

    const langSwitch = document.getElementById('langSwitch');
    let currentLang = localStorage.getItem('lang') || 'en';

    const updateLanguage = (lang) => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';


        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        const navLinks = document.querySelectorAll('.nav-links li a:not(.btn)');
        if (lang === 'ar') {
            if (navLinks[0]) navLinks[0].innerText = 'الرئيسية';
            if (navLinks[1]) navLinks[1].innerText = 'خدماتنا';
            if (navLinks[2]) navLinks[2].innerText = 'اتصل بنا';
            document.querySelector('.btn').innerText = 'احجز الآن';
            langSwitch.innerText = 'English';
        } else {
            if (navLinks[0]) navLinks[0].innerText = 'Home';
            if (navLinks[1]) navLinks[1].innerText = 'Services';
            if (navLinks[2]) navLinks[2].innerText = 'Contact';
            document.querySelector('.btn').innerText = 'Book Now';
            langSwitch.innerText = 'العربية';
        }

        localStorage.setItem('lang', lang);
    };


    updateLanguage(currentLang);

    if (langSwitch) {
        langSwitch.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            updateLanguage(currentLang);
        });
    }


    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {

                const submitBtn = contactForm.querySelector('button');
                const originalText = submitBtn.innerText;

                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';

                setTimeout(() => {
                    formStatus.style.color = '#c5a059';
                    formStatus.innerText = 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;


                    setTimeout(() => {
                        formStatus.innerText = '';
                    }, 5000);
                }, 1500);
            } else {
                formStatus.style.color = 'red';
                formStatus.innerText = 'Please fill out all fields.';
            }
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });


                if (navLinks.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
            }
        });
    });

    // Replace broken images with a local SVG placeholder
    const localPlaceholder = 'images/placeholder.svg';

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function handleImgError() {
            this.removeEventListener('error', handleImgError);
            this.src = localPlaceholder;
        });
    });
});
