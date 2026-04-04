let currentSlide = 0;
let sliderInterval;

function getCurrentLanguage() {
  const englishElements = document.querySelectorAll('.lang-en');
  if (
    englishElements.length > 0 &&
    window.getComputedStyle(englishElements[0]).display !== 'none'
  ) {
    return 'en';
  }
  return 'es';
}

function getSlidesForCurrentLanguage() {
  const currentLang = getCurrentLanguage();
  return document.querySelectorAll(`.hero-slide.lang-${currentLang}`);
}

function showSlide(index) {
  const slides = getSlidesForCurrentLanguage();

  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  if (slides.length > 0) {
    slides[index].classList.add('active');
  }
}

function startSlider() {
  clearInterval(sliderInterval);

  const slides = getSlidesForCurrentLanguage();
  if (slides.length === 0) return;

  currentSlide = 0;
  showSlide(currentSlide);

  sliderInterval = setInterval(() => {
    const currentSlides = getSlidesForCurrentLanguage();
    if (currentSlides.length === 0) return;

    currentSlide = (currentSlide + 1) % currentSlides.length;
    showSlide(currentSlide);
  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  startSlider();

  const langButtons = document.querySelectorAll('[data-lang]');
  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      setTimeout(() => {
        startSlider();
      }, 100);
    });
  });
});
