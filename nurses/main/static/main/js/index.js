// header menu

const burgerBtn = document.querySelector("[data-burger-button]");
const closeBurgerBtn = document.querySelector("[data-close-button]");
const headerNavigation = document.querySelector(".header__navigation");
const body = document.querySelector("body");
const currentLanguageButton = document.querySelector(".current__language");
const languageMenuList = document.querySelector(
  ".header__internationalization"
);

burgerBtn.addEventListener("click", openMenu);
closeBurgerBtn.addEventListener("click", closeMenu);
currentLanguageButton.addEventListener("click", showLanguageMenu);

function switchMenu() {
  const expanded = burgerBtn.getAttribute("aria-expanded") === "true" || false;
  headerNavigation.classList.toggle("is-open");
  burgerBtn.setAttribute("aria-expanded", !expanded);
  //   body.classList.toggle('scroll-disabled');
}

function openMenu(e) {
  document.addEventListener("keydown", closeByEscape);
  e.stopImmediatePropagation();
  switchMenu();
  document.addEventListener("click", closeByClickOutMenu);

  if (languageMenuList.classList.contains("is-open")) {
    closeLanguageMenu();
    toggleLanguageMenu();
  }
}

function closeMenu() {
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("click", closeByClickOutMenu);
  switchMenu();
}

function closeByEscape(e) {
  if (e.code === "Escape") {
    closeMenu();
  }
}

function closeByClickOutMenu(e) {
  const menu = document.querySelector(".header__navigation");

  if (!menu.contains(e.target)) {
    closeMenu();
  }
}

function showLanguageMenu(e) {
  const menu = document.querySelector(".header__internationalization");

  if (!menu.classList.contains("is-open")) {
    openLanguageMenu();
  } else {
    closeLanguageMenu();
  }
  toggleLanguageMenu();
}

function closeByClickOutLanguageMenu(e) {
  const menu = document.querySelector(".header__internationalization");

  if (!menu.contains(e.target)) {
    toggleLanguageMenu();
    closeLanguageMenu();
  }
}

function toggleLanguageMenu() {
  languageMenuList.classList.toggle("is-open");
}

function openLanguageMenu() {
  document.addEventListener("click", closeByClickOutLanguageMenu);
}

function closeLanguageMenu() {
  document.removeEventListener("click", closeByClickOutLanguageMenu);
}

// up button

const upButton = document.querySelector(".up-button");

window.addEventListener("scroll", trackScroll);

function trackScroll() {
  const scrolled = window.pageYOffset;
  //   const coords = document.documentElement.clientHeight;

  if (scrolled > 100) {
    upButton.classList.add("is-shown");
  } else {
    upButton.classList.remove("is-shown");
  }
}

// smooth scroll

$("a.scrollto").click(function (e) {
  const elementClick = $(this).attr("href");
  const destination = $(elementClick).offset().top;

  // const headerNavigation = document.querySelector('.header__navigation')
  if (headerNavigation.classList.contains("is-open")) {
    closeMenu();
  }
  jQuery("html:not(:animated),body:not(:animated)").animate(
    {
      scrollTop: destination,
    },
    500
  );

  return false;
});

// animations do not work at first loading page

window.addEventListener("load", (event) => {
  document.querySelector("body").classList.remove("preload");
});
