// Mobile menu
const menuSwitcher = document.getElementById('menu-toggle');

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__link')) {
    menuSwitcher.checked = false;
  }
});

// Localization
const switchElements = document.querySelectorAll('[data-lang]');

function loadLanguage(lang) {
  fetch(`./assets/locales/${lang}.json`)
    .then((response) => response.json())
    .then((data) => {
      translatePage(data);
    })
    .catch((error) => console.error('Error loading language file:', error));
}

function handleLangSwitcherToggle(lang) {
  const langSwitcher = document.getElementById('lang-switcher');
  const langText = document.querySelector('.lang-switcher__btn-text');

  langText.textContent = lang.toUpperCase();
  langSwitcher.checked = false;
}

function translatePage(data) {
  for (const key in data) {
    if (Object.hasOwn(data, key)) {
      const elements = document.querySelectorAll(`[data-translate="${key}"]`);
      elements.forEach((element) => {
        element.textContent = data[key];
      });
    }
  }

  switchElements.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = el.getAttribute('data-lang');
      loadLanguage(lang);
      handleLangSwitcherToggle(lang);
    });
  });
}

// Top button
const toTopBtn = document.querySelector('.main__up');

function scrollToTop() {
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    }
    );
  });
}

function showButton() {
  window.addEventListener('scroll', function () {
    const coeff = window.scrollY / 1000;
    if (window.scrollY <= 1000) {
      toTopBtn.style.opacity = coeff;
    } else {
      toTopBtn.style.opacity = 1;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = 'en';
  loadLanguage(defaultLang);
  scrollToTop();
  showButton();
});