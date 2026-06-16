// Управління оверлеєм меню
const mainHeaderNav = document.getElementById("main-header__nav");
const menuBtn = document.getElementById("menu-btn");
const menuOverlay = document.getElementById("menu-overlay");
const menuBtnText = document.getElementById("menu-btn__text");
const menuBtnImg = document.getElementById("menu-btn__img");
const body = document.body;

menuBtn.addEventListener("click", () => {
    // Визначаємо поточний стан меню
    const isOpen = menuOverlay.classList.contains("menu-overlay--open");

    // Запускаємо анімацію зникнення кнопки для плавної підміни контенту
    menuBtn.classList.add("menu-btn--hidden");

    if (!isOpen) {
        // Відкриття меню
        menuOverlay.classList.add("menu-overlay--open");
        body.classList.add("no-scroll"); // Блокуємо прокрутку сторінки

        // Приховуємо основну навігацію в шапці
        mainHeaderNav.classList.add("nav--hidden");

        // Оновлюємо текст/іконку та повертаємо кнопку після завершення fade-out (200мс)
        setTimeout(() => {
            menuBtnText.textContent = "Close";
            menuBtnImg.src = "assets/images/icons/close.svg";
            menuBtn.classList.remove("menu-btn--hidden");
        }, 200);
    } else {
        // Закриття меню
        menuOverlay.classList.remove("menu-overlay--open");
        body.classList.remove("no-scroll");

        // Повертаємо основну навігацію в шапці
        mainHeaderNav.classList.remove("nav--hidden");

        // Відновлюємо початковий текст/іконку та повертаємо кнопку після затримки (200мс)
        setTimeout(() => {
            menuBtnText.textContent = "Menu";
            menuBtnImg.src = "assets/images/icons/burger-menu.svg";
            menuBtn.classList.remove("menu-btn--hidden");
        }, 200);
    }
});

// Слайдер "Other projects"
(function () {
    const swiperEl = document.querySelector('.slider__swiper');
    const wrapper = swiperEl?.querySelector('.swiper-wrapper');
    const indicatorsEl = document.getElementById('slider__indicators');

    if (!swiperEl || !wrapper || !indicatorsEl) return;
    
    const projectsData = [
        { src: "assets/images/projects/other-project-1.jpg", alt: "Investment app - mobile design", link: "#" },
        { src: "assets/images/projects/other-project-2.jpg", alt: "Investment app - desktop design", link: "#" },
        { src: "assets/images/projects/other-project-3.jpg", alt: "Corporate card landing page design", link: "#" },
        { src: "https://picsum.photos/seed/project4/928/696", alt: "Project 4", link: "#" },
        { src: "https://picsum.photos/seed/project5/928/696", alt: "Project 5", link: "#" },
        { src: "https://picsum.photos/seed/project6/928/696", alt: "Project 6", link: "#" },
        { src: "https://picsum.photos/seed/project7/928/696", alt: "Project 7", link: "#" },
        { src: "https://picsum.photos/seed/project8/928/696", alt: "Project 8", link: "#" }
    ];

    // Рендер слайдів
    wrapper.innerHTML = '';
    projectsData.forEach(item => {
        const li = document.createElement('li');
        li.className = 'swiper-slide slider__item';
        li.innerHTML = `
            <a href="${item.link}">
                <img src="${item.src}" alt="${item.alt}" class="slider__img">
            </a>
        `;
        wrapper.appendChild(li);
    });

    // Рендер індикаторів
    let swiperInstance;
    indicatorsEl.innerHTML = '';

    projectsData.forEach((_, index) => {
        const li = document.createElement('li');
        li.className = 'slider__indicator' + (index === 0 ? ' slider__indicator--active' : '');

        li.addEventListener('click', () => {
            if (swiperInstance) swiperInstance.slideToLoop(index);
        });
        indicatorsEl.appendChild(li);
    });

    // Оновлення активного індикатора
    const updateIndicators = (activeIndex) => {
        const items = indicatorsEl.querySelectorAll('.slider__indicator');
        items.forEach((item, i) => {
            item.classList.toggle('slider__indicator--active', i === activeIndex);
        });
    };

    // Ініціалізація Swiper
    swiperInstance = new Swiper('.slider__swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            prevEl: '#slider__btn--prev',
            nextEl: '#slider__btn--next',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.25,
                spaceBetween: 12
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 24
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 24
            }
        },
        on: {
            slideChange() {
                updateIndicators(this.realIndex);
            }
        }
    });
})();

// Зміна фону шапки при скролі
const header = document.querySelector('.main-header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('main-header--scrolled');
        } else {
            header.classList.remove('main-header--scrolled');
        }
    });
}

// Приховування блоку "scroll down", коли видно блок з логотипами
const scrollBlock = document.querySelector('.hero__scroll-block');
const logoStrip = document.querySelector('.logo-strip__inner');

if (scrollBlock && logoStrip) {
    // IntersectionObserver відстежує, коли елемент (логотипи) потрапляє у видиму зону екрана
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // entry.boundingClientRect.top < 0 означає, що ми проскролили нижче блоку з логотипами
            // isIntersecting стає true, коли видно заданий відсоток блоку (threshold)
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
                scrollBlock.classList.add('hero__scroll-block--hidden'); // Ховаємо блок
            } else {
                scrollBlock.classList.remove('hero__scroll-block--hidden'); // Показуємо знову
            }
        });
    }, {
        // Спрацює, коли 80% блоку логотипів з'явиться у вікні браузера
        threshold: 0.8
    });

    // Вказуємо обзерверу, за яким саме елементом стежити
    observer.observe(logoStrip);
}

// Кнопка "Back to top"
const scrollTopBtn = document.querySelector('.main-footer__scroll-top');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        document.documentElement.style.scrollBehavior = 'auto';

        const startPosition = window.scrollY; // Поточна позиція
        const distance = -startPosition; // Відстань до нуля
        const duration = 1200; // Час анімації (мс)
        let start = null;

        function animation(currentTime) {
            if (start === null) {
                start = currentTime;
            }

            const timeElapsed = currentTime - start;

            // Розрахунок прогресу (від 0 до 1)
            const progress = Math.min(timeElapsed / duration, 1);

            // Формула плавності (ease-in-out)
            const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, startPosition + distance * ease);

            // Продовжуємо, поки не вийде час
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                document.documentElement.style.scrollBehavior = 'smooth';
            }
        }

        requestAnimationFrame(animation);
    });
}

// Паралакс-ефект для фотографій у секції About
const aboutSection = document.querySelector('.about');
const aboutPhotos = document.querySelectorAll('.about__photo');

if (aboutSection && aboutPhotos.length > 0) {
    window.addEventListener('scroll', () => {
        // Отримуємо координати секції відносно вікна перегляду
        const rect = aboutSection.getBoundingClientRect();

        // Виконуємо розрахунки лише тоді, коли секція перебуває у видимій зоні
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Відстань у пікселях від моменту появи секції на екрані
            const scrolled = window.innerHeight - rect.top;

            // Адаптивна швидкість для третього фото
            const thirdPhotoSpeed = window.innerWidth < 1200 ? -0.02 : -0.05;

            // Коефіцієнти швидкості: додатні значення — рух вниз, від'ємні — рух вгору
            const speeds = [
                0.20,  // Фото 1 (Верхнє ліве)
                0.10,  // Фото 2 (Праве)
                thirdPhotoSpeed  // Фото 3 (Нижнє)
            ];

            // Застосовуємо зміщення по осі Y для кожної фотографії
            aboutPhotos.forEach((photo, index) => {
                const speed = speeds[index];
                if (speed !== undefined) {
                    photo.style.transform = `translateY(${scrolled * speed}px)`;
                }
            });
        }
    });
}

// Перемикач вкладок у секції Services з послідовною анімацією
const tabItems = document.querySelectorAll('.services__item');
const tabPanels = document.querySelectorAll('.services__panel');

let isAnimating = false; // Блокування для запобігання накладанню анімацій при швидких кліках
const animationDuration = 350; // Тривалість анімації (має відповідати значенню transition в CSS)

if (tabItems.length > 0 && tabPanels.length > 0) {
    tabItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Перериваємо виконання, якщо анімація ще триває або обрана вже активна вкладка
            if (isAnimating || item.classList.contains('services__item--active')) return;

            isAnimating = true; // Вмикаємо стан анімації

            const currentActiveItem = document.querySelector('.services__item--active');
            const currentActivePanel = document.querySelector('.services__panel--visible');
            const newPanel = tabPanels[index];

            // Оновлюємо активний стан пунктів меню
            if (currentActiveItem) {
                currentActiveItem.classList.remove('services__item--active');
            }
            item.classList.add('services__item--active');

            // Запускаємо зникнення поточної панелі
            if (currentActivePanel) {
                currentActivePanel.classList.remove('services__panel--visible');

                // Очікуємо завершення анімації зникнення
                setTimeout(() => {
                    // Приховуємо стару панель (display: none)
                    currentActivePanel.classList.remove('services__panel--active');

                    // Додаємо нову панель у потік документа (display: flex, opacity: 0)
                    newPanel.classList.add('services__panel--active');

                    // Мікро-затримка (20мс) для коректного відпрацювання transition браузером
                    setTimeout(() => {
                        // Запускаємо появу нової панелі
                        newPanel.classList.add('services__panel--visible');

                        // Знімаємо блокування після повного завершення анімації
                        setTimeout(() => {
                            isAnimating = false;
                        }, animationDuration);

                    }, 20);
                }, animationDuration);
            }
        });
    });
}