let heroIntervals = {};

function initHeroSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const slides = slider.querySelectorAll(".hero-slide");
  if (!slides.length) return;

  let current = 0;

  slides.forEach(slide => slide.classList.remove("active"));
  slides[0].classList.add("active");

  if (heroIntervals[sliderId]) {
    clearInterval(heroIntervals[sliderId]);
  }

  heroIntervals[sliderId] = setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 4000);
}

function startCurrentLanguageSlider() {
  const activeBtn = document.querySelector(".lang-btn.active");
  const lang = activeBtn ? activeBtn.dataset.lang : "es";

  if (lang === "es") {
    if (heroIntervals["hero-slider-en"]) clearInterval(heroIntervals["hero-slider-en"]);
    initHeroSlider("hero-slider-es");
  } else {
    if (heroIntervals["hero-slider-es"]) clearInterval(heroIntervals["hero-slider-es"]);
    initHeroSlider("hero-slider-en");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  startCurrentLanguageSlider();

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        startCurrentLanguageSlider();
      }, 100);
    });
  });
});
