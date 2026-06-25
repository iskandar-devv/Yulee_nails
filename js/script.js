// ==========================================
// ИНИЦИАЛИЗАЦИЯ
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Прелоадер
    initPreloader();
    
    // Липкая шапка
    initStickyHeader();
    
    // Мобильное меню
    initMobileMenu();
    
    // Плавная прокрутка
    initSmoothScroll();
    
    // Анимация при скролле
    initScrollAnimation();
    
    // Галерея
    initGallery();
    
    // Lightbox
    initLightbox();
    
    // Слайдер отзывов
    initReviewsSlider();
    
    // Слайдер мастеров (для мобильных)
    initMastersSlider();
    
    // Форма записи
    initBookingForm();
    
    // Счетчик статистики
    initStatsCounter();
    
    // Кнопка наверх
    initScrollTop();
    
    // Активный пункт меню
    initActiveMenu();
    
    // Маска для телефона
    initPhoneMask();
    
    // Блокировка прошедших дат
    initDatePicker();
    
    // Lazy loading для изображений
    initLazyLoading();
});

// ==========================================
// ПРЕЛОАДЕР
// ==========================================

function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });
}

// ==========================================
// ЛИПКАЯ ШАПКА
// ==========================================

function initStickyHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================
// МОБИЛЬНОЕ МЕНЮ
// ==========================================

function initMobileMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ==========================================
// ПЛАВНАЯ ПРОКРУТКА
// ==========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// АНИМАЦИЯ ПРИ СКРОЛЛЕ
// ==========================================

function initScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// ГАЛЕРЕЯ
// ==========================================

function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убрать активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Добавить активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================
// LIGHTBOX
// ==========================================

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    let visibleItems = [];
    
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none' && !item.classList.contains('hide')
        );
    }
    
    function openLightbox(index) {
        updateVisibleItems();
        currentIndex = index;
        const img = visibleItems[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        const img = visibleItems[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        const img = visibleItems[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
    }
    
    galleryItems.forEach((item, index) => {
        const btn = item.querySelector('.gallery-btn');
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            updateVisibleItems();
            const itemIndex = visibleItems.indexOf(item);
            openLightbox(itemIndex);
        });
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

// ==========================================
// СЛАЙДЕР ОТЗЫВОВ
// ==========================================

function initReviewsSlider() {
    const wrapper = document.querySelector('.reviews-wrapper');
    const prevBtn = document.querySelector('.reviews-prev');
    const nextBtn = document.querySelector('.reviews-next');
    const dotsContainer = document.querySelector('.reviews-dots');
    const cards = document.querySelectorAll('.review-card');
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    
    // Создать точки
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    function updateSlider() {
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Автопрокрутка
    let autoplay = setInterval(nextSlide, 5000);
    
    // Остановить автопрокрутку при наведении
    const reviewsSlider = document.querySelector('.reviews-slider');
    reviewsSlider.addEventListener('mouseenter', () => clearInterval(autoplay));
    reviewsSlider.addEventListener('mouseleave', () => {
        autoplay = setInterval(nextSlide, 5000);
    });
}

// ==========================================
// СЛАЙДЕР МАСТЕРОВ (для мобильных)
// ==========================================

function initMastersSlider() {
    if (window.innerWidth > 768) return;
    
    const wrapper = document.querySelector('.masters-wrapper');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const cards = document.querySelectorAll('.master-card');
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    
    // Преобразовать grid в flex для слайдера
    wrapper.style.display = 'flex';
    wrapper.style.transition = 'transform 0.5s ease';
    
    cards.forEach(card => {
        card.style.minWidth = '100%';
    });
    
    function updateSlider() {
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
}

// ==========================================
// ФОРМА ЗАПИСИ
// ==========================================

function initBookingForm() {
    const form = document.getElementById('bookingForm');
    const modal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalOk = document.getElementById('modalOk');
    
    // Кнопки открытия формы
    const bookingBtns = [
        document.getElementById('headerBookingBtn'),
        document.getElementById('heroBookingBtn'),
        ...document.querySelectorAll('.service-card .btn')
    ];
    
    bookingBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                document.getElementById('booking').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    });
    
    // Валидация формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Очистить предыдущие ошибки
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        // Проверить имя
        const name = document.getElementById('name');
        if (name.value.trim().length < 2) {
            showError(name, 'Введите корректное имя');
            isValid = false;
        }
        
        // Проверить телефон
        const phone = document.getElementById('phone');
        const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(phone.value)) {
            showError(phone, 'Введите корректный номер телефона');
            isValid = false;
        }
        
        // Проверить email (если заполнен)
        const email = document.getElementById('email');
        if (email.value && !isValidEmail(email.value)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }
        
        // Проверить услугу
        const service = document.getElementById('service');
        if (!service.value) {
            showError(service, 'Выберите услугу');
            isValid = false;
        }
        
        // Проверить дату
        const date = document.getElementById('date');
        if (!date.value) {
            showError(date, 'Выберите дату');
            isValid = false;
        }
        
        // Проверить время
        const time = document.getElementById('time');
        if (!time.value) {
            showError(time, 'Выберите время');
            isValid = false;
        }
        
        // Проверить согласие
        const privacy = document.getElementById('privacy');
        if (!privacy.checked) {
            showError(privacy, 'Необходимо согласие с политикой конфиденциальности');
            isValid = false;
        }
        
        if (isValid) {
            // Показать модальное окно
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Очистить форму
            form.reset();
        }
    });
    
    function showError(element, message) {
        const formGroup = element.closest('.form-group');
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Закрытие модального окна
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOk.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ==========================================
// СЧЕТЧИК СТАТИСТИКИ
// ==========================================

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                stats.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

// ==========================================
// КНОПКА НАВЕРХ
// ==========================================

function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// АКТИВНЫЙ ПУНКТ МЕНЮ
// ==========================================

function initActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ==========================================
// МАСКА ДЛЯ ТЕЛЕФОНА
// ==========================================

function initPhoneMask() {
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] !== '7') {
                value = '7' + value;
            }
            
            let formattedValue = '+7';
            
            if (value.length > 1) {
                formattedValue += ' (' + value.substring(1, 4);
            }
            if (value.length >= 5) {
                formattedValue += ') ' + value.substring(4, 7);
            }
            if (value.length >= 8) {
                formattedValue += '-' + value.substring(7, 9);
            }
            if (value.length >= 10) {
                formattedValue += '-' + value.substring(9, 11);
            }
            
            e.target.value = formattedValue;
        }
    });
    
    phoneInput.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && e.target.value === '+7') {
            e.preventDefault();
        }
    });
    
    phoneInput.addEventListener('focus', function(e) {
        if (!e.target.value) {
            e.target.value = '+7 ';
        }
    });
}

// ==========================================
// ВЫБОР ДАТЫ (блокировка прошедших дат)
// ==========================================

function initDatePicker() {
    const dateInput = document.getElementById('date');
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
    
    // Максимальная дата - через 3 месяца
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
}

// ==========================================
// LAZY LOADING ДЛЯ ИЗОБРАЖЕНИЙ
// ==========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает нативный lazy loading
        return;
    }
    
    // Fallback для старых браузеров
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// ОБРАБОТЧИКИ ИЗМЕНЕНИЯ РАЗМЕРА ОКНА
// ==========================================

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Переинициализация слайдера мастеров при изменении размера
        if (window.innerWidth <= 768) {
            initMastersSlider();
        }
    }, 250);
});