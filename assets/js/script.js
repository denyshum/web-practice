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