// Управління оверлеєм меню
const mainHeaderNav = document.getElementById("main-header__nav");
const menuBtn = document.getElementById("menu-btn");
const menuOverlay = document.getElementById("menu-overlay");
const menuBtnText = document.getElementById("menu-btn__text");
const menuBtnImg = document.getElementById("menu-btn__img");
const body = document.body;

menuBtn.addEventListener("click", () => {
    const isOpen = menuOverlay.classList.toggle("menu-overlay--open");
    body.classList.toggle("no-scroll");

    if (isOpen) {
        mainHeaderNav.style.display = "none";
        menuBtnText.textContent = "Close";
        menuBtnImg.src = "assets/images/icons/close.svg"
    } else {
        mainHeaderNav.style.display = "";
        menuBtnText.textContent = "Menu";
        menuBtnImg.src = "assets/images/icons/burger-menu.svg"
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